const crypto = require("crypto");
const { Pool } = require("pg");

const { guardarParticipante, buscarPorCorreo } = require("../services/accentureCaminoSheetsService");

const LABELS = {
  aspiracion:["liderar","innovar","crecer","emprender","especialista"],
  trabajo:["software","datos","consultoria","operaciones","corporativo","otra"],
  estudios:["secundario","cursando","incompleta","terciario","universitario"],
  interes:["tecnologia","negocios","personas","marketing","derecho","indefinido"],
};
const valido = (value,length=150)=>typeof value==="string" && value.trim().length>0 && value.trim().length<=length;
const emailValido = value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const normalizarTelefono = value=>value.replace(/\D/g,"");
async function registrarCaminoAccenture(req,res) {
  try {
    const data=req.body||{};
    const { nombre, apellido, telefono, email, respuestas, aceptaPrivacidad, permisoContacto }=data;
    if(!valido(nombre,80)||!valido(apellido,80)||!valido(telefono,24)||!valido(email,180)||!emailValido(email.trim())){
      return res.status(400).json({error:"Revisá nombre, apellido, email y teléfono."});
    }
    const tel=normalizarTelefono(telefono);
    if(tel.length<10||tel.length>15)return res.status(400).json({error:"Ingresá un teléfono válido."});
    if(aceptaPrivacidad!==true)return res.status(400).json({error:"Necesitamos tu aceptación del aviso de privacidad para registrar la actividad."});
    if(typeof permisoContacto!=="boolean")return res.status(400).json({error:"Falta indicar tu preferencia de contacto."});
    if(!respuestas||typeof respuestas!=="object"||Object.keys(LABELS).some(k=>!LABELS[k].includes(respuestas[k]))){
      return res.status(400).json({error:"Completá las cuatro decisiones del camino."});
    }
    const code="S21-ACC-"+crypto.randomBytes(4).toString("hex").toUpperCase();
    const emailNormalizado=email.trim().toLowerCase();
    if(await buscarPorCorreo(emailNormalizado)){
      return res.status(409).json({error:"Este email ya tiene una participación registrada. Consultá en el stand para recuperar tu código."});
    }
    const participanteId=crypto.randomUUID();
    await guardarParticipante({
      id:participanteId,nombre:nombre.trim(),apellido:apellido.trim(),
      email:emailNormalizado,telefono:tel,
      respuestas:{
        aspiracion:respuestas.aspiracion,trabajo:respuestas.trabajo,
        estudios:respuestas.estudios,interes:respuestas.interes
      },
      aceptaPrivacidad:true,permisoContacto,codigoRetiro:code,origen:"feria-accenture-2026"
    });
    return res.status(201).json({ok:true,participanteId,codigoRetiro:code});
  }catch(err){
    console.error("Error registro Accenture Camino:",err);
    return res.status(503).json({error:"No pudimos guardar tu participación. Intentá de nuevo o consultá en el stand."});
  }
}
module.exports={registrarCaminoAccenture};
