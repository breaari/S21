const crypto = require("crypto");

const { guardarParticipante, buscarPorCorreo, actualizarRespuestas } = require("../services/accentureCaminoSheetsService");

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
    const { nombre, apellido, telefono, email, aceptaPrivacidad, permisoContacto }=data;
    if(!valido(nombre,80)||!valido(apellido,80)||!valido(telefono,24)||!valido(email,180)||!emailValido(email.trim())){
      return res.status(400).json({error:"Revisá nombre, apellido, email y teléfono."});
    }
    const tel=normalizarTelefono(telefono);
    if(tel.length<10||tel.length>15)return res.status(400).json({error:"Ingresá un teléfono válido."});
    if(aceptaPrivacidad!==true)return res.status(400).json({error:"Necesitamos tu aceptación del aviso de privacidad para registrar la actividad."});
    if(typeof permisoContacto!=="boolean")return res.status(400).json({error:"Falta indicar tu preferencia de contacto."});
    const emailNormalizado=email.trim().toLowerCase();
    if(await buscarPorCorreo(emailNormalizado)){
      return res.status(409).json({error:"Este email ya tiene una participación registrada. Consultá en el stand con tu nombre y apellido."});
    }
    const participanteId=crypto.randomUUID();
    await guardarParticipante({
      id:participanteId,nombre:nombre.trim(),apellido:apellido.trim(),
      email:emailNormalizado,telefono:tel,
      respuestas:{},
      aceptaPrivacidad:true,permisoContacto,origen:"feria-accenture-2026"
    });
    return res.status(201).json({ok:true,participanteId});
  }catch(err){
    console.error("Error registro Accenture Camino:",err);
    return res.status(503).json({error:"No pudimos guardar tu participación. Intentá de nuevo o consultá en el stand."});
  }
}
async function finalizarCaminoAccenture(req,res) {
  try {
    const { id }=req.params;
    const { respuestas }=req.body||{};
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)){
      return res.status(400).json({error:"Participación inválida."});
    }
    if(!respuestas||typeof respuestas!=="object"||Object.keys(LABELS).some(k=>!LABELS[k].includes(respuestas[k]))){
      return res.status(400).json({error:"Completá las cuatro decisiones del camino."});
    }
    const actualizada=await actualizarRespuestas(id,respuestas);
    if(!actualizada)return res.status(404).json({error:"No encontramos tu participación."});
    return res.status(200).json({ok:true});
  }catch(err){
    console.error("Error al guardar respuestas de Accenture Camino:",err);
    return res.status(503).json({error:"No pudimos guardar tus respuestas. Volvé a intentar."});
  }
}
module.exports={registrarCaminoAccenture,finalizarCaminoAccenture};
