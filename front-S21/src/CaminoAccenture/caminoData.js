// Cuatro preguntas: formación → trabajo actual → intereses → aspiración.
// Mantenemos los identificadores de respuesta para respetar el contrato con el backend.
export const CAMINO_STEPS = [
  { id:"estudios", eyebrow:"TU PUNTO DE PARTIDA", question:"¿Desde dónde partís?", help:"Pensá en tus estudios hasta hoy.", choices:[
    {id:"secundario",label:"Terminé el secundario",short:"Secundario"},
    {id:"cursando",label:"Estoy cursando una carrera",short:"Cursando"},
    {id:"incompleta",label:"Empecé una carrera, pero no la terminé",short:"Incompleta"},
    {id:"terciario",label:"Tengo un título terciario",short:"Terciario"},
    {id:"universitario",label:"Tengo un título universitario",short:"Universitario"}
  ]},
  { id:"trabajo", eyebrow:"TU PRESENTE", question:"¿En qué área trabajás actualmente?", help:"Seleccioná la opción más cercana a tu trabajo.", choices:[
    {id:"software",label:"Desarrollo de software y tecnología",short:"Software"},
    {id:"datos",label:"Datos, inteligencia artificial y automatización",short:"Datos e IA"},
    {id:"consultoria",label:"Consultoría y estrategia de negocios",short:"Consultoría"},
    {id:"operaciones",label:"Operaciones, soporte y servicios",short:"Operaciones"},
    {id:"corporativo",label:"Gestión de proyectos y equipos",short:"Proyectos"},
    {id:"otra",label:"Recursos humanos, administración u otra área",short:"Otras áreas"}
  ]},
  { id:"interes", eyebrow:"TUS INTERESES", question:"¿Qué área te gustaría explorar?", help:"Puede ser algo relacionado con tu trabajo o algo nuevo.", choices:[
    {id:"tecnologia",label:"Tecnología, datos e inteligencia artificial",short:"Tecnología"},
    {id:"negocios",label:"Negocios, administración y finanzas",short:"Negocios"},
    {id:"personas",label:"Personas, liderazgo y recursos humanos",short:"Personas"},
    {id:"marketing",label:"Marketing, comunicación y creatividad",short:"Marketing"},
    {id:"derecho",label:"Derecho y ciencias sociales",short:"Derecho"},
    {id:"indefinido",label:"Todavía estoy explorando mis intereses",short:"Por descubrir"}
  ]},
  { id:"aspiracion", eyebrow:"TU PRÓXIMA META", question:"¿Qué te gustaría potenciar en tu futuro?", choices:[
    {id:"liderar",label:"Liderar nuevos desafíos",short:"Liderar",color:"#bc9fea"},
    {id:"innovar",label:"Innovar y crear soluciones",short:"Innovar",color:"#80cce5"},
    {id:"crecer",label:"Crecer profesionalmente",short:"Crecer",color:"#91d3a2"},
    {id:"emprender",label:"Emprender mis propios proyectos",short:"Emprender",color:"#f0c281"},
    {id:"especialista",label:"Convertirme en especialista",short:"Especializarme",color:"#88a9ed"}
  ]}
];

export const PROGRAMAS_POR_AREA = {
  tecnologia: ["Formación en sistemas y desarrollo de software","Formación en datos e inteligencia artificial"],
  negocios: ["Formación en administración y gestión","Formación en finanzas y negocios"],
  personas: ["Formación en recursos humanos","Formación en liderazgo y gestión de equipos"],
  marketing: ["Formación en marketing","Formación en comunicación y creatividad"],
  derecho: ["Formación en derecho","Formación en ciencias sociales"],
  indefinido: ["Orientación para elegir una carrera","Exploración de carreras de grado y pregrado"]
};

export function recomendarFormaciones(respuestas) {
  const area = respuestas.interes || "indefinido";
  const tipo = respuestas.estudios === "universitario" ? "Explorá actualización profesional o posgrados según sus requisitos" :
    respuestas.estudios === "terciario" ? "Podés explorar carreras y ciclos de complementación según tu título" :
    respuestas.estudios === "incompleta" || respuestas.estudios === "cursando" ? "Podés consultar equivalencias y continuidad de estudios" :
    "Podés explorar carreras de grado y pregrado";
  return { opciones: PROGRAMAS_POR_AREA[area], orientacion:tipo,
    nota:"Opciones orientativas por área. No constituyen una oferta académica, admisión ni cotización; verificar oferta 2027 con un asesor." };
}
