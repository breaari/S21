const { google } = require("googleapis");
const path = require("path");

// Usa el mismo documento y la misma cuenta de servicio que la ruleta/memotest.
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../google-sheets-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.ACCENTURE_SHEET_ID || process.env.RULETA_SHEET_ID;
const SHEET_NAME = process.env.ACCENTURE_SHEET_NAME || "Accenture 2026";
const HEADERS = [
  "Fecha", "Hora", "ID", "Nombre", "Apellido", "Email", "Telefono",
  "Aspiracion", "Area de trabajo", "Nivel de estudios", "Area de interes",
  "Consentimiento datos", "Autoriza contacto comercial", "Origen",
  "Codigo retiro", "Merch entregado", "Interes en inscripcion", "Estado comercial"
];
const quoteSheet = name => "'" + name.replace(/'/g, "''") + "'";
async function asegurarPestana(){
  if(!SPREADSHEET_ID) throw new Error("Falta configurar ACCENTURE_SHEET_ID o RULETA_SHEET_ID");
  const meta=await sheets.spreadsheets.get({spreadsheetId:SPREADSHEET_ID,fields:"sheets.properties.title"});
  const existe=(meta.data.sheets||[]).some(s=>s.properties.title===SHEET_NAME);
  if(!existe){
    try {
      await sheets.spreadsheets.batchUpdate({spreadsheetId:SPREADSHEET_ID,requestBody:{requests:[{addSheet:{properties:{title:SHEET_NAME}}}]}});
    }catch(e){
      // Dos registros simultáneos pueden intentar crear la pestaña a la vez.
      const again=await sheets.spreadsheets.get({spreadsheetId:SPREADSHEET_ID,fields:"sheets.properties.title"});
      if(!(again.data.sheets||[]).some(s=>s.properties.title===SHEET_NAME))throw e;
    }
  }
  const title=quoteSheet(SHEET_NAME);
  const header=await sheets.spreadsheets.values.get({spreadsheetId:SPREADSHEET_ID,range:`${title}!A1:R1`});
  if(!(header.data.values||[])[0]?.length){
    await sheets.spreadsheets.values.update({
      spreadsheetId:SPREADSHEET_ID,range:`${title}!A1:R1`,valueInputOption:"RAW",
      requestBody:{values:[HEADERS]}
    });
  } else {
    const actual=header.data.values[0];
    if(HEADERS.some((v,i)=>actual[i]!==v))throw new Error("La pestaña Accenture tiene encabezados distintos a los esperados");
  }
}
async function buscarPorCorreo(email){
  await asegurarPestana();
  const result=await sheets.spreadsheets.values.get({
    spreadsheetId:SPREADSHEET_ID,range:`${quoteSheet(SHEET_NAME)}!F2:F`
  });
  return (result.data.values||[]).some(r=>(r[0]||"").trim().toLowerCase()===email.trim().toLowerCase());
}
async function guardarParticipante(participante){
  await asegurarPestana();
  const ahora=new Date();
  const fecha=ahora.toLocaleDateString("es-AR",{timeZone:"America/Argentina/Buenos_Aires"});
  const hora=ahora.toLocaleTimeString("es-AR",{timeZone:"America/Argentina/Buenos_Aires",hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const r=participante.respuestas;
  // RAW: nunca interpretar datos del usuario como fórmulas en Sheets.
  await sheets.spreadsheets.values.append({
    spreadsheetId:SPREADSHEET_ID,
    range:`${quoteSheet(SHEET_NAME)}!A:R`,
    valueInputOption:"RAW",insertDataOption:"INSERT_ROWS",
    requestBody:{values:[[
      fecha,hora,participante.id,participante.nombre,participante.apellido,
      participante.email,participante.telefono,r.aspiracion,r.trabajo,r.estudios,r.interes,
      "SI",participante.permisoContacto?"SI":"NO",participante.origen,
      participante.codigoRetiro,"NO","NO","SIN CONTACTAR"
    ]]}
  });
}
module.exports={guardarParticipante,buscarPorCorreo};
