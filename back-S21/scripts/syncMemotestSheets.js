// One-shot, restartable Google Sheets projection worker.
// Run periodically from a single scheduler, not inside HTTP requests.
// Example: node -r dotenv/config scripts/syncMemotestSheets.js
const { google } = require("googleapis");
const path = require("path");
const { getPool } = require("../src/services/memotestDb");

const spreadsheetId = process.env.RULETA_SHEET_ID;
const name = (process.env.MEMOTEST_SHEET_NAME || "Memotest Maraton").replace(/'/g, "''");
if (!spreadsheetId) throw new Error("Falta RULETA_SHEET_ID");

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(__dirname, "../google-sheets-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });
const sheetRange = (range) => `'${name}'!${range}`;
const encode = (v) => v == null ? "" : String(v);
const bool = (v) => v ? "SI" : "NO";
const fechaHora = (value) => {
  const date = new Date(value);
  const dt = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).formatToParts(date);
  const part = (type) => dt.find((p) => p.type === type).value;
  return [`${part("day")}/${part("month")}/${part("year")}`,
    `${part("hour")}:${part("minute")}:${part("second")}`];
};
const ISO = (d) => d ? new Date(d).toISOString() : "";
const recordValues = (r) => {
  const [fecha, hora] = fechaHora(r.fecha_registro);
  return [
    fecha, hora, r.id, r.nombre, r.apellido, r.email, r.telefono,
    r.estudios_universitarios, r.interes_formacion, r.areas_interes,
    r.tipo_formacion, r.origen, r.estado, ISO(r.inicio_juego),
    ISO(r.fin_juego), r.tiempo_ms, r.tiempo_segundos,
    r.movimientos, bool(r.completado), encode(r.codigo_premio),
    bool(r.participa_sorteo), bool(r.canjeado)
  ].map(encode);
};

const worker = async () => {
  const client = await getPool().connect();
  const lockId = 210821;
  let locked = false;
  let done = 0;
  try {
    const lock = await client.query("SELECT pg_try_advisory_lock($1) AS locked", [lockId]);
    if (!lock.rows[0].locked) {
      console.log("Ya existe una sincronización en curso");
      return;
    }
    locked = true;
    const pending = await client.query(`
      SELECT s.id AS sync_id, s.tipo, p.*, g.estado, g.inicio_juego, g.fin_juego, g.tiempo_ms, g.tiempo_segundos, g.movimientos, g.completado, g.codigo_premio, g.participa_sorteo, g.canjeado
      FROM memotest_sync s
      JOIN memotest_participantes p ON p.id=s.participante_id
      JOIN memotest_partidas g ON g.participante_id=p.id
      WHERE s.estado IN ('PENDIENTE','ERROR') AND s.intentos < 12
      ORDER BY s.id ASC LIMIT 50
    `);
    if (!pending.rows.length) { console.log("No hay sincronizaciones pendientes"); return; }
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId, range: sheetRange("A1:AL"), valueRenderOption: "FORMATTED_VALUE"
    });
    const rows = res.data.values || [];
    const lookup = new Map();
    rows.forEach((row, i) => {
      const canonical = row[2];
      const shifted = row[18];
      if (canonical) {
        if (!lookup.has(canonical)) lookup.set(canonical, { row: i + 1, shifted: false });
      } else if (shifted) {
        if (!lookup.has(shifted)) lookup.set(shifted, { row: i + 1, shifted: true });
      }
    });
    let nextRow = rows.length + 1;
    for (const item of pending.rows) {
      try {
        const found = lookup.get(item.participante_id);
        if (found?.shifted) {
          throw new Error("UUID desplazado en Sheets: requiere revisión manual, no se sobrescribe");
        }
        // Explicit A:V range (not values.append) avoids table autodetection shifting columns.
        // Always project full current state to make duplicated event delivery idempotent.
        const rowNum = found?.row || nextRow;
        if (!found) nextRow++;
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: sheetRange(`A${rowNum}:V${rowNum}`),
          valueInputOption: "RAW",
          requestBody: { values: [recordValues(item)] }
        });
        const verify = await sheets.spreadsheets.values.get({
          spreadsheetId, range: sheetRange(`C${rowNum}`)
        });
        if (verify.data.values?.[0]?.[0] !== item.participante_id) {
          throw new Error("Verificación fallida: UUID no aparece en la columna C");
        }
        lookup.set(item.participante_id, { row: rowNum, shifted: false });
        await client.query(
          `UPDATE memotest_sync SET estado='COMPLETADO', sincronizado_en=NOW(),
           intentos=intentos+1, ultimo_error=NULL WHERE id=$1`, [item.sync_id]
        );
        done++;
      } catch (error) {
        console.error("Sincronización fallida", item.sync_id, error.message);
        await client.query(
          `UPDATE memotest_sync SET estado='ERROR', intentos=intentos+1,
           ultimo_error=LEFT($2,1000) WHERE id=$1`,
          [item.sync_id, error.message]
        );
      }
    }
    console.log(`Sincronizados ${done}/${pending.rows.length}`);
  } finally {
    if (locked) await client.query("SELECT pg_advisory_unlock($1)", [lockId]);
    client.release();
    await getPool().end();
  }
};
worker().catch((error) => { console.error(error); process.exitCode = 1; });
