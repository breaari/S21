const { google }=require("googleapis");
const path=require("path");
const { pool }=require("./accentureCaminoPgService");
const auth=new google.auth.GoogleAuth({
  keyFile:path.join(__dirname,"../../google-sheets-credentials.json"),
  scopes:["https://www.googleapis.com/auth/spreadsheets"]
});
const sheets=google.sheets({version:"v4",auth});
const spreadsheetId=process.env.ACCENTURE_SHEET_ID || process.env.RULETA_SHEET_ID;
const sheetName=process.env.ACCENTURE_SHEET_NAME || "Accenture 2026";
const title="'"+sheetName.replace(/'/g,"''")+"'";
const headers=[
  "Fecha","Hora","ID","Nombre","Apellido","Email","Telefono",
  "Aspiracion","Area de trabajo","Nivel de estudios","Area de interes",
  "Consentimiento datos","Autoriza contacto comercial","Origen",
  "Codigo retiro","Merch entregado","Interes en inscripcion","Estado comercial"
];
const LOCK_KEY=2026111701;
let ready=false, readyPromise=null, running=false, timer=null;
const log=e=>console.error("[Accenture Sheets Sync]",e?.message||e);

async function ensureSheet(){
  if(ready)return;
  if(readyPromise)return readyPromise;
  readyPromise=(async()=>{
    if(!spreadsheetId)throw new Error("Falta ACCENTURE_SHEET_ID o RULETA_SHEET_ID");
    const meta=await sheets.spreadsheets.get({spreadsheetId,fields:"sheets.properties.title"});
    if(!(meta.data.sheets||[]).some(s=>s.properties.title===sheetName)){
      try {
        await sheets.spreadsheets.batchUpdate({spreadsheetId,requestBody:{requests:[{addSheet:{properties:{title:sheetName}}}]}});
      } catch(err){
        const check=await sheets.spreadsheets.get({spreadsheetId,fields:"sheets.properties.title"});
        if(!(check.data.sheets||[]).some(s=>s.properties.title===sheetName))throw err;
      }
    }
    const head=await sheets.spreadsheets.values.get({spreadsheetId,range:`${title}!A1:R1`});
    const current=(head.data.values||[])[0]||[];
    if(!current.length){
      await sheets.spreadsheets.values.update({
        spreadsheetId,range:`${title}!A1:R1`,valueInputOption:"RAW",
        requestBody:{values:[headers]}
      });
    } else if(headers.some((h,i)=>current[i]!==h)){
      throw new Error("Encabezados de Accenture 2026 distintos de los esperados: no se sincroniza");
    }
    ready=true;
  })().finally(()=>{readyPromise=null});
  return readyPromise;
}
function sheetRow(p){
  const date=new Date(p.creado_en);
  const fecha=date.toLocaleDateString("es-AR",{timeZone:"America/Argentina/Buenos_Aires"});
  const hora=date.toLocaleTimeString("es-AR",{timeZone:"America/Argentina/Buenos_Aires",hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const a=p.respuestas||{};
  return [fecha,hora,p.id,p.nombre,p.apellido,p.email,p.telefono,
    a.aspiracion||"",a.trabajo||"",a.estudios||"",a.interes||"",
    p.acepta_privacidad?"SI":"NO",p.permiso_contacto?"SI":"NO",p.origen,
    "","NO","NO","SIN CONTACTAR"];
}
async function markSynced(rows){
  if(!rows.length)return;
  await pool.query(`
    UPDATE accenture_participantes AS p
    SET synced_version=GREATEST(p.synced_version,v.version),
        sync_attempts=0,sync_error=NULL,sync_retry_after=NOW()
    FROM unnest($1::uuid[],$2::integer[]) AS v(id,version)
    WHERE p.id=v.id
  `,[rows.map(p=>p.id),rows.map(p=>p.version)]);
}
async function markRetry(rows,error){
  if(!rows.length)return;
  await pool.query(`
    UPDATE accenture_participantes
    SET sync_attempts=sync_attempts+1,
        sync_retry_after=NOW()+(LEAST(300,5*POWER(2,LEAST(sync_attempts,6))) * INTERVAL '1 second'),
        sync_error=LEFT($2,500)
    WHERE id=ANY($1::uuid[])
  `,[rows.map(p=>p.id),String(error?.message||error)]);
}
async function syncOnce(){
  if(running)return;
  running=true;
  let client,locked=false,rows=[];
  try{
    client=await pool.connect();
    const lock=await client.query("SELECT pg_try_advisory_lock($1) AS ok",[LOCK_KEY]);
    if(!lock.rows[0].ok)return; // Otra instancia del backend está sincronizando.
    locked=true;
    const pending=await client.query(`
      SELECT * FROM accenture_participantes
      WHERE synced_version < version AND sync_retry_after <= NOW()
      ORDER BY creado_en,id LIMIT 100
    `);
    rows=pending.rows;
    if(!rows.length)return;
    await ensureSheet();
    // Una sola lectura de IDs por lote: permite retomar sin duplicar tras fallos parciales.
    const ids=await sheets.spreadsheets.values.get({spreadsheetId,range:`${title}!C2:C`});
    const positions=new Map();
    (ids.data.values||[]).forEach((r,i)=>{if(r[0]&&!positions.has(r[0]))positions.set(r[0],i+2)});
    const missing=rows.filter(p=>!positions.has(p.id));
    const existing=rows.filter(p=>positions.has(p.id));
    if(missing.length){
      // Append atómico de filas. No tocamos las columnas manuales O:R posteriormente.
      await sheets.spreadsheets.values.append({
        spreadsheetId,range:`${title}!A:R`,valueInputOption:"RAW",
        insertDataOption:"INSERT_ROWS",requestBody:{values:missing.map(sheetRow)}
      });
      await markSynced(missing);
    }
    if(existing.length){
      // Solo respuestas H:K; nunca pisar las marcas manuales del stand en O:R.
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,requestBody:{
          valueInputOption:"RAW",
          data:existing.map(p=>({
            range:`${title}!H${positions.get(p.id)}:K${positions.get(p.id)}`,
            values:[[p.respuestas?.aspiracion||"",p.respuestas?.trabajo||"",
              p.respuestas?.estudios||"",p.respuestas?.interes||""]]
          }))
        }
      });
      await markSynced(existing);
    }
  }catch(err){
    log(err);
    try{await markRetry(rows,err)}catch(e){log(e)}
    // Revalidar estructura cuando el error pueda haberse debido a una edición de Sheets.
    ready=false;
  }finally{
    if(client){
      if(locked)try{await client.query("SELECT pg_advisory_unlock($1)",[LOCK_KEY])}catch(e){log(e)}
      client.release();
    }
    running=false;
  }
}
function startAccentureSyncWorker(){
  if(timer)return;
  timer=setInterval(()=>syncOnce().catch(log),Number(process.env.ACCENTURE_SYNC_INTERVAL_MS)||5000);
  timer.unref?.();
  syncOnce().catch(log);
  console.log("[Accenture Sheets Sync] worker iniciado");
}
module.exports={startAccentureSyncWorker,syncOnce};
