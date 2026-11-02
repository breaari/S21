// Read-only audit before importing historical Memotest records.
// Does not print personal data or UUID values.
const { google } = require("googleapis");
const path = require("path");
const id = process.env.RULETA_SHEET_ID;
if (!id) throw new Error("Falta RULETA_SHEET_ID");
const sheet = (process.env.MEMOTEST_SHEET_NAME || "Memotest Maraton").replace(/'/g, "''");
const googleAuth = new google.auth.GoogleAuth({
  keyFile: path.resolve(__dirname, "../google-sheets-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const api = google.sheets({ version: "v4", auth: googleAuth });
const uuid = (v) => /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(String(v || ""));

async function run() {
  const { data } = await api.spreadsheets.values.get({
    spreadsheetId: id, range: `'${sheet}'!A2:AL`,
    valueRenderOption: "FORMATTED_VALUE"
  });
  const seen = new Set();
  const totals = {
    filasAnalizadas: 0, registrosNormales: 0, registrosDesplazados: 0,
    registrosSinUuid: 0, uuidDuplicados: 0, finalizados: 0,
    finalizadosSinResultados: 0, codigoPremioDuplicado: 0
  };
  const codes = new Set();
  for (const row of data.values || []) {
    totals.filasAnalizadas++;
    const shift = uuid(row[2]) ? 0 : uuid(row[18]) ? 16 : -1;
    if (shift < 0) { totals.registrosSinUuid++; continue; }
    if (shift) totals.registrosDesplazados++; else totals.registrosNormales++;
    const value = (index) => row[index + shift] || "";
    if (seen.has(value(2))) totals.uuidDuplicados++;
    seen.add(value(2));
    if (value(12) === "FINALIZADO") {
      totals.finalizados++;
      if (!value(13) || !value(14) || value(15) === "" || value(17) === "")
        totals.finalizadosSinResultados++;
    }
    const code = value(19);
    if (code) {
      if (codes.has(code)) totals.codigoPremioDuplicado++;
      codes.add(code);
    }
  }
  console.log(JSON.stringify(totals, null, 2));
  if (totals.uuidDuplicados || totals.codigoPremioDuplicado || totals.finalizadosSinResultados) {
    process.exitCode = 2;
  }
}
run().catch((err) => {
  console.error("Error de auditoría:", err.message);
  process.exitCode = 1;
});
