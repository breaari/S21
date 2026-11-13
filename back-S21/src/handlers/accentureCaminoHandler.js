const crypto = require("crypto");
const { Pool } = require("pg");

// El endpoint necesita PostgreSQL y la migración documentada en sql/accenture_camino.sql.
// Configurable mediante DATABASE_URL o variables PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE.
const pool = new Pool(process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || "s21_memotest",
});
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
    const result=await pool.query(`
      INSERT INTO accenture_camino_participantes
       (id,nombre,apellido,email,telefono,respuestas,permiso_contacto,acepta_privacidad,codigo_retiro,origen)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id,codigo_retiro`,[
        crypto.randomUUID(),nombre.trim(),apellido.trim(),
        email.trim().toLowerCase(),tel,JSON.stringify({
          aspiracion:respuestas.aspiracion,trabajo:respuestas.trabajo,
          estudios:respuestas.estudios,interes:respuestas.interes
        }),permisoContacto,true,code,"feria-accenture-2026"
      ]);
    return res.status(201).json({ok:true,participanteId:result.rows[0].id,codigoRetiro:result.rows[0].codigo_retiro});
  }catch(err){
    if(err.code==="23505")return res.status(409).json({error:"Este email ya tiene una participación registrada. Consultá en el stand para recuperar tu código."});
    console.error("Error registro Accenture Camino:",err);
    return res.status(503).json({error:"No pudimos guardar tu participación. Intentá de nuevo o consultá en el stand."});
  }
}
module.exports={registrarCaminoAccenture};
