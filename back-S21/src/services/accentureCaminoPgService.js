const { Pool } = require("pg");

// Misma instancia PostgreSQL del VPS; conexión independiente y configurable.
const connectionString=process.env.ACCENTURE_DATABASE_URL || process.env.DATABASE_URL;
const config=connectionString ? {connectionString} : {database:process.env.ACCENTURE_PG_DATABASE || process.env.PGDATABASE || "s21_memotest"};
const pool=new Pool({...config,max:10,connectionTimeoutMillis:5000,idleTimeoutMillis:30000});

async function guardarParticipante(participante){
  const {rows}=await pool.query(`
    INSERT INTO accenture_participantes
      (id,nombre,apellido,email,telefono,acepta_privacidad,permiso_contacto,origen)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `,[participante.id,participante.nombre,participante.apellido,participante.email,
    participante.telefono,true,participante.permisoContacto,participante.origen]);
  return rows[0] || null;
}
async function actualizarRespuestas(id,respuestas){
  const {rows}=await pool.query(`
    UPDATE accenture_participantes
    SET respuestas=$2::jsonb,
        finalizado_en=COALESCE(finalizado_en,NOW()),
        version=version+CASE WHEN respuestas IS DISTINCT FROM $2::jsonb THEN 1 ELSE 0 END,
        sync_retry_after=NOW()
    WHERE id=$1
    RETURNING id
  `,[id,JSON.stringify(respuestas)]);
  return Boolean(rows[0]);
}
async function resumenSync(){
  const {rows}=await pool.query(`
    SELECT COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE synced_version < version)::int AS pendientes,
      COUNT(*) FILTER (WHERE finalizado_en IS NOT NULL)::int AS finalizados
    FROM accenture_participantes
  `);
  return rows[0];
}
module.exports={pool,guardarParticipante,actualizarRespuestas,resumenSync};
