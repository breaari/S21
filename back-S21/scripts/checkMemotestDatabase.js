// Read-only preflight, safe to run against the intended Memotest database.
// Usage: node -r dotenv/config scripts/checkMemotestDatabase.js
const { getPool } = require("../src/services/memotestDb");

async function main() {
  const db = getPool();
  try {
    const { rows: identity } = await db.query(
      "SELECT current_database() AS db, current_user AS username"
    );
    if (identity[0].db !== "s21_memotest") {
      throw new Error("Base inesperada: se esperaba s21_memotest");
    }
    const { rows: tables } = await db.query(
      `SELECT table_name FROM information_schema.tables
       WHERE table_schema='public' AND table_name IN
       ('memotest_participantes','memotest_partidas','memotest_sync')`
    );
    if (tables.length !== 3) throw new Error("Faltan tablas del Memotest");
    const { rows: totals } = await db.query(`
      SELECT
        (SELECT COUNT(*) FROM memotest_participantes)::integer AS participantes,
        (SELECT COUNT(*) FROM memotest_partidas)::integer AS partidas,
        (SELECT COUNT(*) FROM memotest_partidas WHERE estado='FINALIZADO')::integer AS finalizados,
        (SELECT COUNT(*) FROM memotest_sync WHERE estado IN ('PENDIENTE','ERROR'))::integer AS sync_pendientes
    `);
    console.log({ conexion: "OK", ...identity[0], ...totals[0] });
  } finally {
    await db.end();
  }
}

main().catch((err) => { console.error("Preflight:", err.message); process.exitCode = 1; });
