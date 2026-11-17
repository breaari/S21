const { Pool } = require("pg");

// Accenture usa la misma base que el memotest, con un pool independiente.
// Prioriza variables propias; si no existen, reutiliza las variables MEMOTEST_DB_*
// ya configuradas en el VPS (no necesita duplicar contraseñas).
const connectionString=process.env.ACCENTURE_DATABASE_URL;
const config=connectionString ? {connectionString} : {
  host:process.env.ACCENTURE_PG_HOST || process.env.MEMOTEST_DB_HOST || "127.0.0.1",
  port:Number(process.env.ACCENTURE_PG_PORT || process.env.MEMOTEST_DB_PORT || 5432),
  database:process.env.ACCENTURE_PG_DATABASE || process.env.MEMOTEST_DB_NAME,
  user:process.env.ACCENTURE_PG_USER || process.env.MEMOTEST_DB_USER,
  password:process.env.ACCENTURE_PG_PASSWORD || process.env.MEMOTEST_DB_PASSWORD
};
if(!connectionString&&(!config.database||!config.user||!config.password)){
  throw new Error("Falta configurar PostgreSQL para Accenture (ACCENTURE_PG_* o MEMOTEST_DB_*)");
}
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
