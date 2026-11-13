const { google } = require("googleapis");
const path = require("path");
const { getPool } = require("./memotestDb");

const SHEET_NAME = process.env.MEMOTEST_HIGHSCHOOL_SHEET_NAME || "Memotest Intercolegial";
const HEADERS = [
  "Fecha registro", "Hora registro", "ID", "Nombre", "Apellido", "Email",
  "Teléfono", "Colegio", "Curso", "División", "Etapa", "Después del secundario",
  "Decisión de carrera", "Áreas de interés", "Origen", "Estado", "Inicio juego",
  "Fin juego", "Tiempo ms", "Tiempo segundos", "Movimientos", "Completado"
];
const tz = "America/Argentina/Buenos_Aires";
const dateFmt = new Intl.DateTimeFormat("es-AR", {timeZone: tz, day:"2-digit",month:"2-digit",year:"numeric"});
const timeFmt = new Intl.DateTimeFormat("es-AR", {timeZone: tz,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});
const when = (value, type) => value ? (type === "fecha" ? dateFmt : timeFmt).format(new Date(value)) : "";
const iso = value => value ? new Date(value).toISOString() : "";
const num = value => value == null ? "" : Number(value);
const arrayAreas = value => Array.isArray(value) ? value : [];
const fila = p => [
  when(p.creado_en,"fecha"), when(p.creado_en,"hora"), p.id, p.nombre, p.apellido,
  p.email, p.telefono, p.colegio, p.curso, p.division, p.anio, p.proximo_paso,
  p.decision_carrera, arrayAreas(p.areas_interes).join(", "), p.origen,
  p.estado, iso(p.inicio_juego), iso(p.fin_juego), num(p.tiempo_ms),
  p.tiempo_ms == null ? "" : Math.round(Number(p.tiempo_ms)/100)/10,
  num(p.movimientos), p.completado ? "SI" : "NO"
];
let sheets;
let sheetVerified = false;
let pending = true; // sincroniza también lo anterior al primer arranque
let running = false;
let scheduled;
function service() {
 if (!sheets) {
  const auth = new google.auth.GoogleAuth({
    keyFile:path.join(__dirname,"../../google-sheets-credentials.json"),
    scopes:["https://www.googleapis.com/auth/spreadsheets"]
  });
  sheets = google.sheets({version:"v4",auth});
 }
 return sheets;
}
async function ensureSheet(id) {
 if(sheetVerified) return;
 const api=service();
 const result=await api.spreadsheets.get({spreadsheetId:id,fields:"sheets.properties.title"});
 if(!result.data.sheets?.some(s=>s.properties?.title===SHEET_NAME)) {
   await api.spreadsheets.batchUpdate({spreadsheetId:id,requestBody:{
     requests:[{addSheet:{properties:{title:SHEET_NAME}}}]
   }});
 }
 sheetVerified=true;
}
async function sincronizarHighschool() {
 if(running || !pending) return;
 const id=process.env.RULETA_SHEET_ID;
 if(!id) {console.error("Sync highschool: falta RULETA_SHEET_ID");return;}
 running=true;
 pending=false;
 try {
   await ensureSheet(id);
   const { rows } = await getPool().query("SELECT * FROM memotest_highschool ORDER BY creado_en ASC, id ASC");
   // Espejo completo: PostgreSQL sigue siendo la fuente de verdad.
   // Solo se escribe en la pestaña intercolegial, nunca en la del evento NB 21K.
   const values=[HEADERS,...rows.map(fila)];
   await service().spreadsheets.values.update({
     spreadsheetId:id,range:`'${SHEET_NAME.replace(/'/g,"''")}'!A1:V${values.length}`,
     valueInputOption:"RAW",requestBody:{values}
   });
   console.log(`Sync highschool: ${rows.length} participantes actualizados en Google Sheets`);
 } catch(e) {
   pending=true;
   console.error("Sync highschool: error (se reintentará):",e.message);
 } finally {
   running=false;
   if(pending) programar(15000);
 }
}
function programar(ms=3000) {
 if(scheduled) return;
 scheduled=setTimeout(()=>{scheduled=null;void sincronizarHighschool();},ms);
 scheduled.unref?.();
}
function solicitarSyncHighschool(){
 pending=true;
 programar();
}
// Una consulta inicial permite reflejar los registros existentes incluso tras un reinicio.
// El intervalo reintenta cuando Google Sheets estuvo caído.
programar(5000);
const retry=setInterval(()=>{if(pending) void sincronizarHighschool();},60000);
retry.unref?.();

module.exports={solicitarSyncHighschool,sincronizarHighschool};
