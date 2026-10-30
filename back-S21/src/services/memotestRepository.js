const crypto = require("crypto");
const { getPool } = require("./memotestDb");

const fields = `
  p.id, p.nombre, p.apellido, p.email, p.telefono,
  p.estudios_universitarios, p.interes_formacion, p.areas_interes,
  p.tipo_formacion, p.origen, p.fecha_registro,
  g.estado, g.inicio_juego, g.fin_juego, g.tiempo_ms,
  g.tiempo_segundos, g.movimientos, g.completado,
  g.codigo_premio, g.participa_sorteo, g.canjeado
`;

const mapParticipante = (row) => row && ({
  id: row.id,
  nombre: row.nombre,
  apellido: row.apellido,
  email: row.email,
  telefono: row.telefono,
  estudiosUniversitarios: row.estudios_universitarios,
  interesFormacion: row.interes_formacion,
  areasInteres: row.areas_interes ? row.areas_interes.split(", ").filter(Boolean) : [],
  tipoFormacion: row.tipo_formacion,
  origen: row.origen,
  fechaRegistro: row.fecha_registro,
  estado: row.estado,
  inicioJuego: row.inicio_juego,
  finJuego: row.fin_juego,
  tiempoMs: row.tiempo_ms,
  tiempoSegundos: row.tiempo_segundos == null ? null : Number(row.tiempo_segundos),
  movimientos: row.movimientos,
  ganador: row.completado,
  codigoPremio: row.codigo_premio,
  participaSorteo: row.participa_sorteo,
  canjeado: row.canjeado,
});

const buscarPorId = async (id) => {
  const { rows } = await getPool().query(
    `SELECT ${fields} FROM memotest_participantes p
     JOIN memotest_partidas g ON g.participante_id = p.id
     WHERE p.id = $1`,
    [id]
  );
  return mapParticipante(rows[0]);
};

const buscarExistente = async ({ email, telefono }) => {
  const correo = String(email || "").trim().toLowerCase();
  const numero = String(telefono || "").replace(/\D/g, "").replace(/^549/, "").replace(/^54/, "");
  if (!correo && !numero) return null;
  const { rows } = await getPool().query(
    `SELECT ${fields} FROM memotest_participantes p
     JOIN memotest_partidas g ON g.participante_id = p.id
     WHERE ($1 <> '' AND LOWER(p.email) = $1)
        OR ($2 <> '' AND regexp_replace(regexp_replace(regexp_replace(p.telefono, '[^0-9]', '', 'g'), '^549', ''), '^54', '') = $2)
     ORDER BY p.fecha_registro ASC LIMIT 1`,
    [correo, numero]
  );
  return mapParticipante(rows[0]);
};

// Transactions prevent an orphan participant if creating its game row fails.
const registrar = async (datos) => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const id = datos.id || crypto.randomUUID();
    await client.query(
      `INSERT INTO memotest_participantes
       (id, nombre, apellido, email, telefono, estudios_universitarios,
        interes_formacion, areas_interes, tipo_formacion, origen)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [id, datos.nombre, datos.apellido, datos.email, datos.telefono,
       datos.estudiosUniversitarios, datos.interesFormacion,
       (datos.areasInteres || []).join(", "), datos.tipoFormacion, datos.origen || "directo"]
    );
    await client.query(
      "INSERT INTO memotest_partidas (participante_id) VALUES ($1)",
      [id]
    );
    await client.query("COMMIT");
    return buscarPorId(id);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const withGameLock = async (id, operation) => {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `SELECT g.*, p.nombre, p.apellido
       FROM memotest_partidas g JOIN memotest_participantes p ON p.id=g.participante_id
       WHERE g.participante_id=$1 FOR UPDATE OF g`, [id]
    );
    if (!rows.length) throw new Error("Participante no encontrado.");
    const value = await operation(client, rows[0]);
    await client.query("COMMIT");
    return value;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const iniciar = (id) => withGameLock(id, async (client, game) => {
  if (game.estado === "FINALIZADO") {
    return { yaFinalizado: true, participante: await buscarPorId(id) };
  }
  if (game.estado === "JUGANDO" && game.inicio_juego) {
    return { yaFinalizado: false, inicioJuego: game.inicio_juego };
  }
  const { rows } = await client.query(
    `UPDATE memotest_partidas SET estado='JUGANDO', inicio_juego=clock_timestamp()
     WHERE participante_id=$1 RETURNING inicio_juego`, [id]
  );
  return { yaFinalizado: false, inicioJuego: rows[0].inicio_juego };
});

const finalizar = (id, { movimientos, completado }) => {
  const mov = Number(movimientos);
  if (!Number.isInteger(mov) || mov < 0 || mov > 5000 || typeof completado !== "boolean") {
    throw new Error("Resultado inválido.");
  }
  return withGameLock(id, async (client, game) => {
    if (game.estado === "FINALIZADO") {
      return { nuevoFinalizado: false, resultado: { ...game, tiempo_segundos: game.tiempo_segundos } };
    }
    if (game.estado !== "JUGANDO" || !game.inicio_juego) {
      throw new Error("El juego todavía no fue iniciado.");
    }
    const { rows } = await client.query(
      `UPDATE memotest_partidas
       SET estado='FINALIZADO', fin_juego=clock_timestamp(),
           tiempo_ms=GREATEST(0, FLOOR(EXTRACT(EPOCH FROM (clock_timestamp()-inicio_juego))*1000)::integer),
           movimientos=$2, completado=$3
       WHERE participante_id=$1
       RETURNING *`,
      [id, mov, Boolean(completado) && mov >= 6]
    );
    // Keep the derived display duration consistent with the saved milliseconds.
    const duracion = Math.round(rows[0].tiempo_ms / 100) / 10;
    await client.query(
      "UPDATE memotest_partidas SET tiempo_segundos=$2 WHERE participante_id=$1",
      [id, duracion]
    );
    return { nuevoFinalizado: true, resultado: { ...rows[0], tiempo_segundos: duracion } };
  });
};

const obtenerRanking = async () => {
  const { rows } = await getPool().query(
    `SELECT p.id, CONCAT_WS(' ', p.nombre, p.apellido) AS nombre,
            g.tiempo_ms, g.tiempo_segundos, g.movimientos, g.completado,
            g.fin_juego
     FROM memotest_partidas g
     JOIN memotest_participantes p ON p.id=g.participante_id
     WHERE g.estado='FINALIZADO'
     ORDER BY g.completado DESC, FLOOR(g.tiempo_ms / 1000.0) ASC,
              g.movimientos ASC, g.tiempo_ms ASC, g.fin_juego ASC, p.id ASC`
  );
  return rows.map((r, index) => ({
    id: r.id,
    nombre: r.nombre,
    tiempoMs: r.tiempo_ms,
    tiempoSegundos: Number(r.tiempo_segundos),
    movimientos: r.movimientos,
    completado: r.completado,
    finJuego: r.fin_juego,
    puesto: index + 1,
  }));
};

module.exports = { buscarPorId, buscarExistente, registrar, iniciar, finalizar, obtenerRanking };
