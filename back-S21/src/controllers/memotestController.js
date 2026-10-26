const crypto = require("crypto");

const {
  buscarParticipanteExistente,
  buscarParticipantePorId,
  guardarParticipanteMemotest,
  actualizarJuego,
} = require("../services/memotestSheetsService");

/* =========================================================
   REGISTRAR
========================================================= */

const registrarParticipante = async (datos) => {
  const {
    nombre,
    apellido,
    email,
    telefono,
    estudiosUniversitarios,
    interesFormacion,
    areasInteres,
    tipoFormacion,
    origen = "directo",
  } = datos;

  if (
    !nombre?.trim() ||
    !apellido?.trim() ||
    !email?.trim() ||
    !telefono?.trim() ||
    !estudiosUniversitarios ||
    !interesFormacion ||
    !tipoFormacion
  ) {
    throw new Error("Completá todos los campos obligatorios.");
  }

  if (
    !Array.isArray(areasInteres) ||
    areasInteres.length === 0
  ) {
    throw new Error(
      "Seleccioná al menos un área de interés.",
    );
  }

  const existente =
    await buscarParticipanteExistente({
      email,
      telefono,
    });

  if (existente) {
    return {
      existente: true,
      ...existente,
    };
  }

  const participante = {
    id: crypto.randomUUID(),

    nombre: nombre.trim(),
    apellido: apellido.trim(),
    email: email.trim().toLowerCase(),
    telefono: telefono.trim(),

    estudiosUniversitarios,
    interesFormacion,
    areasInteres,
    tipoFormacion,

    origen,
  };

  await guardarParticipanteMemotest(participante);

  return {
    existente: false,
    participante,
  };
};

/* =========================================================
   INICIAR JUEGO
========================================================= */

const iniciarJuego = async (id) => {
  const resultado = await buscarParticipantePorId(id);

  if (!resultado) {
    throw new Error("Participante no encontrado.");
  }

  const { participante, rowNumber } = resultado;

  if (participante.estado === "FINALIZADO") {
    return {
      yaFinalizado: true,
      participante,
    };
  }

  /*
   * Si ya figuraba como JUGANDO, no reiniciamos el reloj.
   */
  if (
    participante.estado === "JUGANDO" &&
    participante.inicioJuego
  ) {
    return {
      yaFinalizado: false,
      participante,
      inicioJuego: participante.inicioJuego,
    };
  }

  const inicioJuego = new Date().toISOString();

  await actualizarJuego(rowNumber, {
    estado: "JUGANDO",
    inicioJuego,
  });

  return {
    yaFinalizado: false,
    participante,
    inicioJuego,
  };
};

/* =========================================================
   FINALIZAR
========================================================= */

const finalizarJuego = async (
  id,
  { movimientos, completado },
) => {
  const resultado = await buscarParticipantePorId(id);

  if (!resultado) {
    throw new Error("Participante no encontrado.");
  }

  const { participante, rowNumber } = resultado;

  /*
   * Idempotencia:
   * si ya finalizó, devolvemos el mismo resultado.
   */
  if (participante.estado === "FINALIZADO") {
    return participante;
  }

  if (!participante.inicioJuego) {
    throw new Error(
      "El juego todavía no fue iniciado.",
    );
  }

  const inicioMs = new Date(
    participante.inicioJuego,
  ).getTime();

  const finMs = Date.now();

  const tiempoMs = Math.max(
    0,
    finMs - inicioMs,
  );

  const tiempoSegundos =
    Math.round((tiempoMs / 1000) * 10) / 10;

  // Sin límite de tiempo: completar los seis pares define el éxito.
  const ganador = Boolean(completado) && Number(movimientos) >= 6;

  const finJuego = new Date().toISOString();

  await actualizarJuego(rowNumber, {
    estado: "FINALIZADO",
    inicioJuego: participante.inicioJuego,
    finJuego,
    tiempoMs,
    tiempoSegundos,
    movimientos: Number(movimientos) || 0,
    ganador,
  });

  return {
    ...participante,

    estado: "FINALIZADO",

    finJuego,
    tiempoMs,
    tiempoSegundos,
    movimientos: Number(movimientos) || 0,

    ganador,

    participaSorteo: true,
    nuevoFinalizado: true,
  };
};

module.exports = {
  registrarParticipante,
  iniciarJuego,
  finalizarJuego,
};