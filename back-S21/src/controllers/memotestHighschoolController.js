const crypto = require("crypto");
const { Pool } = require("pg");

// Preferir la misma conexión de PostgreSQL que ya usa el servidor.
// No registrar datos sensibles en logs ni publicar esta tabla en el ranking.
const pool = new Pool(process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : { host: process.env.PGHOST || "localhost", port: Number(process.env.PGPORT) || 5432,
      database: process.env.PGDATABASE || "s21_memotest",
      user: process.env.PGUSER || "s21_memotest_app",
      password: process.env.PGPASSWORD });

const limpio = (valor, max = 180) => typeof valor === "string" ? valor.trim().slice(0, max) : "";
const normalizarTel = (valor) => limpio(valor, 30).replace(/[^0-9]/g, "");
const publicParticipant = (p) => ({ id: p.id, nombre: p.nombre, apellido: p.apellido,
  colegio: p.colegio, curso: p.curso, division: p.division, estado: p.estado,
  tiempoSegundos: p.tiempo_ms == null ? null : Math.round(Number(p.tiempo_ms) / 100) / 10,
  movimientos: p.movimientos, completado: p.completado });

async function registrar(req, res) {
 try {
  const d = req.body || {};
  const nombre = limpio(d.nombre,100), apellido=limpio(d.apellido,100);
  const email=limpio(d.email,254).toLowerCase(), telefono=normalizarTel(d.telefono);
  const colegio=limpio(d.colegio), curso=limpio(d.curso,30), division=limpio(d.division,30);
  const anio=limpio(d.anio,30), proximo=limpio(d.proximoPaso,100), decision=limpio(d.decisionCarrera,100);
  const areas=d.areasInteres;
  if (!nombre || !apellido || !/^\S+@\S+\.\S+$/.test(email) || telefono.length < 8 ||
      !colegio || !curso || !anio || !proximo || !decision || !Array.isArray(areas) ||
      !areas.length || areas.length > 10 || !areas.every(a=>typeof a==="string" && a.length <= 90)) {
    return res.status(400).json({error:"Completá los datos y las preguntas obligatorias."});
  }
  if (anio !== "Último año") return res.status(400).json({error:"Este desafío es para estudiantes de último año."});
  const id=crypto.randomUUID();
  const q=await pool.query(`INSERT INTO memotest_highschool
   (id,nombre,apellido,email,telefono,colegio,curso,division,anio,proximo_paso,decision_carrera,areas_interes,origen)
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13) RETURNING *`,
   [id,nombre,apellido,email,telefono,colegio,curso,division,anio,proximo,decision,
    JSON.stringify(areas),limpio(d.origen,100)||"directo"]);
  return res.status(201).json({participante:publicParticipant(q.rows[0])});
 } catch(e) {
  if (e.code==="23505") return res.status(409).json({yaParticipo:true,error:"Este email o teléfono ya participa del desafío intercolegial."});
  console.error("Registro highschool:",e.message);
  return res.status(500).json({error:"No pudimos registrar tu participación."});
 }
}

async function iniciar(req,res) {
 try {
  const q=await pool.query(`UPDATE memotest_highschool
  SET estado='JUGANDO', inicio_juego=NOW()
  WHERE id=$1 AND estado='REGISTRADO' RETURNING *`,[req.params.id]);
  if (q.rowCount) return res.json({participante:publicParticipant(q.rows[0])});
  const p=await pool.query("SELECT * FROM memotest_highschool WHERE id=$1",[req.params.id]);
  if (!p.rowCount) return res.status(404).json({error:"Participante no encontrado."});
  return res.status(409).json({error:"Este intento ya fue iniciado o finalizado. No se puede reiniciar."});
 } catch(e) {console.error("Inicio highschool:",e.message);return res.status(500).json({error:"No se pudo iniciar el juego."});}
}

async function finalizar(req,res) {
 try {
  const movimientos=Number(req.body?.movimientos);
  const completado=req.body?.completado === true;
  if (!Number.isInteger(movimientos) || movimientos<0 || movimientos>100000 ||
      (completado && movimientos<6))
   return res.status(400).json({error:"Resultado inválido."});
  const q=await pool.query(`UPDATE memotest_highschool
    SET estado='FINALIZADO', fin_juego=NOW(),
    tiempo_ms=GREATEST(0,FLOOR(EXTRACT(EPOCH FROM (NOW()-inicio_juego))*1000))::bigint,
    movimientos=$2, completado=$3
    WHERE id=$1 AND estado='JUGANDO' AND inicio_juego IS NOT NULL RETURNING *`,
    [req.params.id,movimientos,completado]);
  if(q.rowCount) return res.json({participante:publicParticipant(q.rows[0])});
  const p=await pool.query("SELECT * FROM memotest_highschool WHERE id=$1",[req.params.id]);
  if (!p.rowCount) return res.status(404).json({error:"Participante no encontrado."});
  if(p.rows[0].estado==="FINALIZADO") return res.json({participante:publicParticipant(p.rows[0])});
  return res.status(409).json({error:"El juego todavía no fue iniciado."});
 } catch(e) {console.error("Final highschool:",e.message);return res.status(500).json({error:"No pudimos guardar el resultado."});}
}

async function ranking(req,res) {
 try {
  res.set("Cache-Control","no-store");
  const q=await pool.query(`SELECT id, nombre, apellido, colegio, curso, division,
     tiempo_ms, movimientos, completado FROM memotest_highschool
    WHERE estado='FINALIZADO' AND completado=TRUE
    ORDER BY tiempo_ms ASC, movimientos ASC, fin_juego ASC, id ASC LIMIT 2000`);
  return res.json({ranking:q.rows.map((p,i)=>({
    id:p.id, puesto:i+1, nombre:`${p.nombre} ${p.apellido}`,
    colegio:p.colegio, curso:p.curso, division:p.division,
    tiempoSegundos:Math.round(Number(p.tiempo_ms)/100)/10, movimientos:p.movimientos
  }))});
 }catch(e){console.error("Ranking highschool:",e.message);return res.status(500).json({error:"No se pudo obtener el ranking."});}
}
module.exports={registrar,iniciar,finalizar,ranking};
