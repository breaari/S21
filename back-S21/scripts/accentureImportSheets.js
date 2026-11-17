// Importación inicial de la pestaña existente ANTES de habilitar ACCENTURE_STORAGE_MODE=postgres.
// No escribe ni modifica Google Sheets. Repetible (ON CONFLICT DO NOTHING).
// Ejecución: node scripts/accentureImportSheets.js
require("dotenv").config();
const path=require("path");
const {google}=require("googleapis");
const {pool}=require("../src/services/accentureCaminoPgService");
const spreadsheetId=process.env.ACCENTURE_SHEET_ID||process.env.RULETA_SHEET_ID;
const sheetName=process.env.ACCENTURE_SHEET_NAME||"Accenture 2026";
const range="'"+sheetName.replace(/'/g,"''")+"'!A2:R";
const auth=new google.auth.GoogleAuth({keyFile:path.join(__dirname,"../google-sheets-credentials.json"),scopes:["https://www.googleapis.com/auth/spreadsheets.readonly"]});
const sheets=google.sheets({version:"v4",auth});
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function main(){
  if(!spreadsheetId)throw new Error("Falta ID de Google Sheets");
  const result=await sheets.spreadsheets.values.get({spreadsheetId,range});
  const rows=result.data.values||[];
  let added=0,skipped=0;
  for(const r of rows){
    const [fecha,hora,id,nombre,apellido,email,telefono,aspiracion,trabajo,estudios,interes,acepta,permiso,origen]=r;
    if(!uuid.test(id||"")||!email?.trim()||!nombre?.trim()||!apellido?.trim()){skipped++;continue}
    const respuestas={};
    if(aspiracion)respuestas.aspiracion=aspiracion;
    if(trabajo)respuestas.trabajo=trabajo;
    if(estudios)respuestas.estudios=estudios;
    if(interes)respuestas.interes=interes;
    const finished=Object.keys(respuestas).length===4;
    const x=await pool.query(`
      INSERT INTO accenture_participantes
        (id,nombre,apellido,email,telefono,acepta_privacidad,permiso_contacto,origen,
         respuestas,finalizado_en,version,synced_version)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,
        CASE WHEN $10::boolean THEN NOW() ELSE NULL END,1,1)
      ON CONFLICT DO NOTHING RETURNING id
    `,[id,nombre.trim(),apellido.trim(),email.trim().toLowerCase(),String(telefono||"").replace(/\D/g,""),
      acepta==="SI",permiso==="SI",origen||"feria-accenture-2026",JSON.stringify(respuestas),finished]);
    if(x.rowCount)added++;else skipped++;
  }
  console.log(JSON.stringify({filasSheets:rows.length,importadas:added,omitidas:skipped}));
}
main().catch(e=>{console.error("Falló importación:",e.message);process.exitCode=1}).finally(()=>pool.end());
