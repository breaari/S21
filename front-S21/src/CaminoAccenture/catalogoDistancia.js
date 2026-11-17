// Catálogo curado desde páginas oficiales 21.edu.ar (noviembre 2026).
// Verificar aperturas, requisitos específicos y disponibilidad 2027 antes de publicar.
// Todas las referencias incluidas son programas listados como virtuales/a distancia.
export const PERFILES={
 liderar:{titulo:"LIDERAR",lema:"Te inspira impulsar a otros.",descripcion:"Te entusiasma coordinar personas, asumir desafíos y hacer que las ideas avancen.",color:"#bc9fea"},
 innovar:{titulo:"INNOVAR",lema:"Te motiva crear nuevas soluciones.",descripcion:"Te atrae descubrir nuevas soluciones, explorar herramientas y cambiar lo establecido.",color:"#80cce5"},
 crecer:{titulo:"CRECER",lema:"Te entusiasma seguir creciendo.",descripcion:"Buscás ampliar tus capacidades y sumar oportunidades para tu desarrollo profesional.",color:"#91d3a2"},
 emprender:{titulo:"EMPRENDER",lema:"Te entusiasma transformar ideas en proyectos.",descripcion:"Te entusiasma impulsar iniciativas, detectar oportunidades y construir algo propio.",color:"#f0c281"},
 especialista:{titulo:"ESPECIALIZARME",lema:"Querés llevar tus conocimientos más lejos.",descripcion:"Te interesa dominar conocimientos y sumar herramientas de alto nivel en tu área.",color:"#88a9ed"}
};
const lista=[
 ["Ingeniería en Software","Grado","tecnologia",["innovar","especialista","crecer"],"ingenieria-en-software"],
 ["Licenciatura en Informática","Grado","tecnologia",["innovar","especialista","crecer"],"licenciatura-en-informatica"],
 ["Licenciatura en Ciencia de Datos","Grado","tecnologia",["innovar","especialista","crecer"],"licenciatura-en-ciencia-de-datos"],
 ["Licenciatura en Inteligencia Artificial y Robótica","Grado","tecnologia",["innovar","especialista"],"licenciatura-en-inteligencia-artificial-y-robotica"],
 ["Tecnicatura Universitaria en Estadística Aplicada y Análisis Avanzado","Pregrado","tecnologia",["especialista","crecer","innovar"],"tecnicatura-universitaria-en-estadistica-aplicada-y-analisis-avanzado"],
 ["Tecnicatura Universitaria en Redes Informáticas y Telecomunicaciones","Pregrado","tecnologia",["especialista","crecer"],"tecnicatura-universitaria-en-redes-informaticas-y-telecomunicaciones"],
 ["Especialización en Inteligencia Artificial","Especialización","tecnologia",["especialista","innovar"],"especializacion-en-inteligencia-artificial"],
 ["Certificado en Business Analytics","Certificado","tecnologia",["especialista","innovar","crecer"],"certificado-en-business-analytics"],
 ["Licenciatura en Administración","Grado","negocios",["liderar","crecer","emprender"],"licenciatura-en-administracion"],
 ["Licenciatura en Finanzas","Grado","negocios",["especialista","crecer","liderar"],"licenciatura-en-finanzas"],
 ["Licenciatura en Inteligencia de Negocios Digitales","Grado","negocios",["innovar","emprender","liderar"],"licenciatura-en-inteligencia-de-negocios-digitales"],
 ["Tecnicatura en Dirección de Equipos de Ventas","Pregrado","negocios",["liderar","emprender","crecer"],"tecnicatura-en-direccion-de-equipos-de-ventas"],
 ["Maestría en Administración de Empresas","Maestría","negocios",["liderar","emprender","crecer"],"maestria-en-administracion-de-empresas"],
 ["Especialización en Finanzas Corporativas y Mercado de Capitales","Especialización","negocios",["especialista","liderar"],"especializacion-en-finanzas-corporativas-y-mercado-de-capitales"],
 ["Certificado en Agile Management","Certificado","negocios",["liderar","innovar","crecer"],"certificado-en-agile-management"],
 ["Licenciatura en Gestión de Recursos Humanos","Grado","personas",["liderar","crecer","especialista"],"licenciatura-en-gestion-de-recursos-humanos"],
 ["Tecnicatura Universitaria en Gestión de Clima Laboral en la Organización","Pregrado","personas",["liderar","crecer"],"tecnicatura-universitaria-en-gestion-de-clima-laboral-en-la-organizacion"],
 ["Tecnicatura en Relaciones Laborales","Pregrado","personas",["liderar","crecer"],"tecnicatura-en-relaciones-laborales"],
 ["Curso Liderar en el Siglo XXI","Curso","personas",["liderar","crecer"],"curso-liderar-en-el-siglo-xxi"],
 ["Licenciatura en Comercialización","Grado","marketing",["emprender","liderar","crecer"],"licenciatura-en-comercializacion"],
 ["Tecnicatura Universitaria en Marketing y Publicidad Digital","Pregrado","marketing",["emprender","innovar","crecer"],"tecnicatura-universitaria-en-marketing-y-publicidad-digital"],
 ["Especialización en Marketing y Dirección Comercial","Especialización","marketing",["liderar","especialista","emprender"],"especializacion-en-marketing-y-direccion-comercial"],
 ["Abogacía","Grado","derecho",["especialista","crecer","liderar"],"abogacia"],
 ["Procurador","Pregrado","derecho",["crecer","especialista"],"procurador"],
 ["Especialización en Derecho de Familia, Niñez y Adolescencia","Especialización","derecho",["especialista","liderar"],"especializacion-en-derecho-de-familia-ninez-y-adolescencia"],
 ["Maestría en Derecho Internacional","Maestría","derecho",["especialista","liderar"],"maestria-en-derecho-internacional"],
 ["Diplomatura en Derecho Corporativo","Diplomatura","derecho",["especialista","emprender"],"diplomatura-en-derecho-corporativo"],
 ["Diplomatura en Comunicaciones, Marketing Digital y Social Media","Diplomatura","marketing",["emprender","innovar","crecer"],"diplomatura-en-comunicaciones-marketing-digital-y-social-media"],
 ["Diplomatura en Desarrollo de Habilidades Duraderas para el Trabajo Humano","Diplomatura","personas",["liderar","crecer","innovar"],"diplomatura-en-trabajo-humano-y-habilidades-duraderas"]
];
// Usamos enlaces directos solo cuando se verificó la URL oficial.
// El resto apunta al catálogo oficial de carreras a distancia, para no inventar rutas.
const URLS_VERIFICADAS={
 "Licenciatura en Informática":"https://21.edu.ar/carreras-y-programas/licenciatura-en-informatica",
 "Maestría en Administración de Empresas":"https://21.edu.ar/carreras-y-programas/maestria-en-administracion-de-empresas",
 "Especialización en Marketing y Dirección Comercial":"https://21.edu.ar/carreras-y-programas/especializacion-en-marketing-y-direccion-comercial",
 "Certificado en Agile Management":"https://21.edu.ar/carreras-y-programas/certificado-en-agile-management",
 "Certificado en Business Analytics":"https://21.edu.ar/carreras-y-programas/certificado-en-business-analytics",
 "Curso Liderar en el Siglo XXI":"https://21.edu.ar/carreras-y-programas/curso-liderar-en-el-siglo-xxi",
 "Diplomatura en Derecho Corporativo":"https://21.edu.ar/carreras-y-programas/diplomatura-en-derecho-corporativo",
 "Diplomatura en Comunicaciones, Marketing Digital y Social Media":"https://21.edu.ar/carreras-y-programas/diplomatura-en-comunicaciones-marketing-digital-y-social-media",
 "Diplomatura en Desarrollo de Habilidades Duraderas para el Trabajo Humano":"https://21.edu.ar/carreras-y-programas/diplomatura-en-trabajo-humano-y-habilidades-duraderas"
};
export const CATALOGO=lista.map(([nombre,tipo,area,perfiles])=>({
 nombre,tipo,area,perfiles,
 url:URLS_VERIFICADAS[nombre] || (["Curso","Certificado","Diplomatura"].includes(tipo)
  ? "https://21.edu.ar/cursos-y-certificaciones"
  : "https://21.edu.ar/carreras-y-programas/distancia"),
 enlaceDirecto:Boolean(URLS_VERIFICADAS[nombre]),
 modalidad:"A distancia",
 requiereTitulo:["Especialización","Maestría"].includes(tipo),
 // Se informa el requisito con prudencia; cada caso requiere validación académica.
}));
const interesPorTrabajo={software:"tecnologia",datos:"tecnologia",consultoria:"negocios",operaciones:"negocios",corporativo:"personas"};
export function recomendarFormaciones(respuestas){
 const area=respuestas.interes,asp=respuestas.aspiracion;
 const tieneTitulo=respuestas.estudios==="universitario";
 const orientacion=tieneTitulo?"Podés explorar también posgrados, sujetos a requisitos de admisión.":respuestas.estudios==="terciario"?"Consultá qué ciclos de complementación o equivalencias aplican a tu título.":respuestas.estudios==="cursando"||respuestas.estudios==="incompleta"?"Consultá reconocimiento de equivalencias para continuar o retomar tus estudios.":"Podés comenzar por propuestas cortas o por carreras de pregrado y grado.";
 const ranking=CATALOGO.filter(p=>tieneTitulo||!p.requiereTitulo).map((p,i)=>{
  let score=(area!=="indefinido"&&p.area===area?12:0)+(p.perfiles.includes(asp)?5:0)+(p.area===interesPorTrabajo[respuestas.trabajo]?2:0);
  if(area==="indefinido"&&p.area===interesPorTrabajo[respuestas.trabajo])score+=8;
  if(asp==="especialista"&&["Certificado","Especialización","Maestría"].includes(p.tipo))score+=3;
  if(asp==="emprender"&&p.area==="negocios")score+=3;
  if(asp==="liderar"&&p.area==="personas")score+=3;
  if(!tieneTitulo&&["Pregrado","Grado"].includes(p.tipo))score+=1;
  return {...p,score,i};
 }).sort((a,b)=>b.score-a.score||a.i-b.i);
 // Diversificar: una propuesta académica extensa, una corta y, si corresponde, un posgrado.
 const resultado=[],used=new Set();
 const segmentos=[["Grado","Pregrado"],["Certificado","Curso","Diplomatura"],["Maestría","Especialización"]];
 for(const seg of segmentos){const item=ranking.find(p=>seg.includes(p.tipo)&&!used.has(p.nombre));if(item){resultado.push(item);used.add(item.nombre);}}
 for(const p of ranking){if(resultado.length>=4)break;if(!used.has(p.nombre)){resultado.push(p);used.add(p.nombre);}}
 return {opciones:resultado.slice(0,4),orientacion,nota:"Sugerencias orientativas según tus elecciones. Verificá requisitos, apertura 2027, modalidad y condiciones con un asesor."};
}
