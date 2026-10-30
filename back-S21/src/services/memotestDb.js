const { Pool } = require("pg");

// Dedicated database for Memotest. Never commit connection credentials.
const required = ["MEMOTEST_DB_NAME", "MEMOTEST_DB_USER", "MEMOTEST_DB_PASSWORD"];

const createPool = () => {
  for (const name of required) {
    if (!process.env[name]) {
      throw new Error(`Falta configurar ${name} para PostgreSQL del Memotest`);
    }
  }

  const pool = new Pool({
    host: process.env.MEMOTEST_DB_HOST || "127.0.0.1",
    port: Number(process.env.MEMOTEST_DB_PORT || 5432),
    database: process.env.MEMOTEST_DB_NAME,
    user: process.env.MEMOTEST_DB_USER,
    password: process.env.MEMOTEST_DB_PASSWORD,
    max: 15,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on("error", (error) => {
    console.error("Error de conexión inactiva a PostgreSQL del Memotest:", error);
  });

  return pool;
};

// Lazy initialization: importing this module does not change the existing
// Google Sheets flow or open database connections during deployment.
let pool;
const getPool = () => {
  if (!pool) pool = createPool();
  return pool;
};

module.exports = { getPool };
