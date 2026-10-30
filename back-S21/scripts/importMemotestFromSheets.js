// One-off, idempotent importer for existing Memotest data.
// Usage: node -r dotenv/config scripts/importMemotestFromSheets.js --dry-run
//        node -r dotenv/config scripts/importMemotestFromSheets.js --apply
// Never deletes records or overwrites already completed games.
const { google } = require("googleapis");
const path = require("path");
const { getPool } = require("../src/services/memotestDb");

const apply = process.argv.includes("--apply");
if (apply === process.argv.includes("--dry-run")) {
  console.error("Elegí exactamente uno: --dry-run o --apply");
  process.exit(1);
}
const id = process.env.RULETA_SHEET_ID;
const sheetName = (process.env.MEMOTEST_SHEET_NAME || "Memotest Maraton").replace(/'/g, "''");
if (!id) throw new Error("Falta RULETA_SHEET_ID");

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(__dirname, "../google-sheets-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheets = google.sheets({ version: "v4", auth });
const isUuid = (v) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(v || ""));
const dateFromCells = (date, hour) => {
  const match = String(date || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const hm = String(hour || "").match(/(\d{1,2}):(\d\d)(?::(\d\d))?/);
  if (!hm) return null;
  let h = Number(hm[1]);
  if (/p\.?\s*m\.?/i.test(hour) && h < 12) h += 12;
  if (/a\.?\s*m\.?/i.test(hour) && h === 12) h = 0;
  const iso = `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}T${String(h).padStart(2, "0")}:${hm[2]}:${hm[3] || "00"}-03:00`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
};
const validISO = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

const run = async () => {
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: `'${sheetName}'!A2:AL`,
    valueRenderOption: "FORMATTED_VALUE",
  });
  const counts = { rows: 0, valid: 0, shifted: 0, invalid: 0, completed: 0, imported: 0, skipped: 0 };
  const client = apply ? await getPool().connect() : null;
  try {
    for (const row of data.values || []) {
      counts.rows++;
      // Recover records shifted exactly 16 columns (Q:AL) without changing Sheets.
      const offset = isUuid(row[2]) ? 0 : isUuid(row[18]) ? 16 : -1;
      if (offset < 0) { counts.invalid++; continue; }
      counts.valid++;
      if (offset) counts.shifted++;
      const r = (index) => row[index + offset] || "";
      const uuid = r(2);
      const estado = ["REGISTRADO","JUGANDO","FINALIZADO"].includes(r(12)) ? r(12) : "REGISTRADO";
      const comienzo = validISO(r(13));
      const fin = validISO(r(14));
      const ms = r(15) === "" ? null : Number(r(15));
      const moves = r(17) === "" ? null : Number(r(17));
      const completed = estado === "FINALIZADO" && Boolean(comienzo) && Boolean(fin) && Number.isFinite(ms) && ms >= 0
        && Number.isInteger(moves) && moves >= 0;
      if ((estado === "FINALIZADO" && !completed) || (estado === "JUGANDO" && !comienzo)) {
        console.warn("Registro finalizado incompleto, omitido:", uuid);
        counts.skipped++;
        continue;
      }
      if (completed) counts.completed++;
      if (!apply) continue;
      await client.query("BEGIN");
      try {
        await client.query(
          `INSERT INTO memotest_participantes
           (id,nombre,apellido,email,telefono,estudios_universitarios,interes_formacion,
            areas_interes,tipo_formacion,origen,fecha_registro)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,COALESCE($11,NOW()))
           ON CONFLICT(id) DO NOTHING`,
          [uuid,r(3),r(4),r(5),r(6),r(7),r(8),r(9),r(10),r(11),dateFromCells(r(0),r(1))]
        );
        const result = await client.query(
          `INSERT INTO memotest_partidas
           (participante_id,estado,inicio_juego,fin_juego,tiempo_ms,tiempo_segundos,
            movimientos,completado,codigo_premio,participa_sorteo,canjeado)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           ON CONFLICT(participante_id) DO NOTHING`,
          [uuid,completed?"FINALIZADO":estado,
           comienzo,completed?fin:null,completed?ms:null,
           completed?Math.round(ms / 100) / 10:null,completed?moves:null,
           completed && r(18)==="SI",r(19)||null,r(20)!=="NO",r(21)==="SI"]
        );
        await client.query("COMMIT");
        if (result.rowCount) counts.imported++; else counts.skipped++;
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    }
  } finally {
    client?.release();
    if (apply) await getPool().end();
  }
  console.log(JSON.stringify({ mode: apply?"apply":"dry-run", ...counts }, null, 2));
};
run().catch(e => { console.error(e.message); process.exitCode = 1; });
