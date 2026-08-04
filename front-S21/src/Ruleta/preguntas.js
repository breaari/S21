export const preguntasPorCategoria = {
  "Verdadero o falso": [
    {
      id: "vf-1",
      tipo: "verdadero-falso",
      pregunta:
        "Todas las materias se aprueban de la misma manera, independientemente de su modalidad y tipología.",
      respuestaCorrecta: false,
      explicacion:
       "Las materias pueden ser MEC, MIA, MIP o MAP, y cada tipología tiene una estructura de cursado, actividades y evaluaciones diferente. También influye la modalidad: en Educación Distribuida (ED) se exige un 75% de asistencia a las Open Class, mientras que en Educación Distribuida Home (EDH) no se requiere asistencia al CAU.",
    },
    {
      id: "vf-3",
      tipo: "verdadero-falso",
      pregunta:
        "Las materias de verano se cursan de manera intensiva y virtual.",
      respuestaCorrecta: true,
      explicacion:
        "El cursado de verano dura cinco semanas, se desarrolla de manera virtual y permite cursar únicamente materias bimestrales habilitadas, como MEC y MIA.",
    },
    {
      id: "vf-4",
      tipo: "verdadero-falso",
      pregunta:
        "Durante el cursado de verano se pueden adelantar materias de cursado cuatrimestral.",
      respuestaCorrecta: false,
      explicacion:
        "En el cursado de verano solo se habilitan materias de cursado bimestral.",
    },
    {
      id: "vf-5",
      tipo: "verdadero-falso",
      pregunta:
        "El EFIP es una instancia obligatoria para todas las carreras y modalidades.",
      respuestaCorrecta: false,
      explicacion:
        "El EFIP —Examen Final Integrador Presencial— es una instancia propia de las carreras de grado a distancia. Estas carreras contemplan EFIP I y EFIP II, que integran y evalúan conocimientos de diferentes etapas del plan de estudios.",
    },
    {
      id: "vf-6",
      tipo: "verdadero-falso",
      pregunta:
        "Promocionar una materia significa aprobarla sin necesidad de rendir un examen final.",
      respuestaCorrecta: true,
      explicacion:
         "La promoción puede ser directa, con ambos parciales aprobados con 7 o más y al menos 3 de los 4 trabajos prácticos con 7 o más, o indirecta, con parciales aprobados con 5 o 6 y los 4 trabajos prácticos con 7 o más. En ambos casos, la materia queda aprobada sin rendir examen final.",
    },
    {
      id: "vf-7",
      tipo: "verdadero-falso",
      pregunta:
        "Regularizar una materia significa que ya está completamente aprobada.",
      respuestaCorrecta: false,
      explicacion:
       "Una materia regular todavía no está aprobada: para completarla, se debe rendir y aprobar el examen final. La regularidad tiene una vigencia de 18 meses y otorga hasta 3 oportunidades; los aplazos y las ausencias también se computan. El final regular consta de 30 preguntas.",
    },
    {
      id: "vf-8",
      tipo: "verdadero-falso",
      pregunta:
        "Un examen recuperatorio permite reemplazar la nota del parcial que se está recuperando.",
      respuestaCorrecta: true,
      explicacion:
        "El recuperatorio brinda una nueva oportunidad sobre uno de los parciales y la calificación obtenida reemplaza la nota anterior, incluso si esta es menor.",
    },
    {
      id: "vf-9",
      tipo: "verdadero-falso",
      pregunta:
        "Un examen integrador evalúa solamente los contenidos del parcial desaprobado.",
      respuestaCorrecta: false,
      explicacion:
        "El examen integrador evalúa los contenidos de todos los módulos de la materia y reemplaza las notas de los dos parciales.",
    },
    {
      id: "vf-11",
      tipo: "verdadero-falso",
      pregunta:
        "Los trabajos prácticos pueden influir en la posibilidad de promocionar o regularizar una materia.",
      respuestaCorrecta: true,
      explicacion:
        "Los trabajos prácticos forman parte de los requisitos de aprobación del cursado. La cantidad aprobada y las notas obtenidas, junto con el resultado de los parciales, determinan si la materia queda regular, promocionada de forma directa o promocionada de forma indirecta.",
    },
    {
      id: "vf-12",
      tipo: "verdadero-falso",
      pregunta:
        "Todas las actividades que aparecen en Canvas tienen una nota que influye en la condición final de la materia.",
      respuestaCorrecta: false,
      explicacion:
        "No todas las actividades de Canvas tienen incidencia en la condición final. Las Actividades Prácticas son autoevaluativas y no llevan nota; las calificaciones que determinan si la materia queda regular o promocionada son las obtenidas en los trabajos prácticos y en los parciales.",
    },
    {
      id: "vf-13",
      tipo: "verdadero-falso",
      pregunta:
        "Cualquier estudiante puede cursar materias de verano.",
      respuestaCorrecta: false,
      explicacion:
        "Las materias de verano están habilitadas para estudiantes que ya se encuentran cursando materias de su segundo semestre en adelante.",
    },
    {
  id: "vf-14",
  tipo: "verdadero-falso",
  pregunta:
    "Las materias electivas son opcionales y pueden omitirse sin afectar la finalización de la carrera.",
  respuestaCorrecta: false,
  explicacion:
    "Aunque permiten elegir contenidos vinculados con distintos intereses y perfiles profesionales, los créditos de materias electivas son obligatorios en las carreras de grado. Para obtener el título, se debe completar la cantidad establecida en el plan de estudios.",
},
{
  id: "vf-15",
  tipo: "verdadero-falso",
  pregunta:
    "La Práctica Solidaria es una actividad voluntaria que cada estudiante puede decidir si realiza.",
  respuestaCorrecta: false,
  explicacion:
    "La Práctica Solidaria es una materia obligatoria incluida en todos los planes de estudio de las carreras de grado. Se cursa a partir del tercer cuatrimestre e implica participar activamente en una organización social, aplicando competencias en un contexto comunitario.",
},
  {
  id: "vf-16",
  tipo: "verdadero-falso",
  pregunta:
    "Si un estudiante ya trabaja en un área vinculada con su carrera, queda automáticamente exceptuado de realizar la Práctica Profesional.",
  respuestaCorrecta: false,
  explicacion:
    "La experiencia laboral previa no reemplaza automáticamente la Práctica Profesional. Aunque en algunos casos el estudiante pueda realizarla en su lugar de trabajo, debe cumplir el proceso académico, desarrollar tareas vinculadas con su carrera y presentar la documentación y las actividades requeridas por la Universidad.",
},
{
  id: "vf-17",
  tipo: "verdadero-falso",
  pregunta:
    "Quien estudió anteriormente en otra universidad debe comenzar una nueva carrera desde el primer año, aunque tenga materias aprobadas.",
  respuestaCorrecta: false,
  explicacion:
    "Puede solicitar equivalencias para que la Universidad evalúe las materias aprobadas anteriormente. Si existe correspondencia entre los contenidos y la carga horaria, algunas pueden ser reconocidas, lo que permite retomar los estudios sin empezar desde cero.",
},
  ],

  "Multiple choice": [
 {
  id: "mc-19",
  tipo: "multiple-choice",
  pregunta: "¿Con qué nota mínima se aprueba un examen final regular?",
  opciones: [
    {
      id: "a",
      texto: "4.",
    },
    {
      id: "b",
      texto: "5.",
    },
    {
      id: "c",
      texto: "7.",
    },
    {
      id: "d",
      texto: "8.",
    },
  ],
  respuestaCorrecta: "a",
  explicacion:
    "El examen final regular se aprueba con una nota mínima de 4, equivalente a 14 respuestas correctas de un total de 30. En cambio, el examen libre por nota contiene 50 preguntas y también se aprueba con 4, equivalente a 24 respuestas correctas.",
},
    {
  id: "mc-1",
  tipo: "multiple-choice",
  pregunta:
    "¿Hasta cuántas materias puede cursar un estudiante durante el período de verano?",
  opciones: [
    { id: "a", texto: "2 materias." },
    { id: "b", texto: "4 materias." },
    { id: "c", texto: "3 materias." },
    { id: "d", texto: "5 materias." },
  ],
  respuestaCorrecta: "c",
  explicacion:
    "Durante el período de verano se pueden cursar hasta 3 materias de la oferta habilitada. Esta posibilidad está disponible únicamente para estudiantes que se reinscriben, no para ingresantes.",
},
    {
      id: "mc-2",
      tipo: "multiple-choice",
      pregunta: "¿Qué significa que una materia esté regular?",
      opciones: [
        {
          id: "a",
          texto: "Que ya está completamente aprobada.",
        },
        {
          id: "b",
          texto:
            "Que se cumplieron los requisitos de cursado, pero todavía debe rendirse un examen final.",
        },
        {
          id: "c",
          texto: "Que debe recursarse obligatoriamente.",
        },
        {
          id: "d",
          texto: "Que fue aprobada por equivalencia.",
        },
      ],
      respuestaCorrecta: "b",
      explicacion:
        "La regularidad permite acceder al examen final. La materia queda aprobada cuando también se supera esa instancia.",
    },
    {
  id: "mc-3",
  tipo: "multiple-choice",
  pregunta:
    "¿Cuál de estas materias no puede utilizarse para completar los créditos electivos de una carrera?",
  opciones: [
    {
      id: "a",
      texto:
        "Una materia electiva habilitada para el plan de estudios.",
    },
    {
      id: "b",
      texto:
        "Una materia electiva relacionada con otro campo profesional.",
    },
    {
      id: "c",
      texto:
        "Práctica Solidaria.",
    },
    {
      id: "d",
      texto:
        "Una materia electiva que otorgue menos créditos de los requeridos.",
    },
  ],
  respuestaCorrecta: "c",
  explicacion:
    "Los créditos electivos se completan mediante materias incluidas en la oferta de electivas. La Práctica Solidaria forma parte de las instancias obligatorias del plan de estudios y no puede utilizarse para reemplazar esos créditos.",
},
  {
  id: "mc-4",
  tipo: "multiple-choice",
  pregunta:
    "Un estudiante cumplió durante el cursado las condiciones necesarias para aprobar una materia y no debe rendir su examen final. ¿Qué condición obtuvo?",
  opciones: [
    {
      id: "a",
      texto: "Regular.",
    },
    {
      id: "b",
      texto: "Promocionada.",
    },
    {
      id: "c",
      texto: "Libre.",
    },
    {
      id: "d",
      texto: "Inscripta para final.",
    },
  ],
  respuestaCorrecta: "b",
  explicacion:
    "La materia queda promocionada cuando se aprueba durante el cursado, ya sea mediante promoción directa o indirecta. A diferencia de la regularidad, no queda pendiente ningún examen final.",
},
    {
      id: "mc-5",
      tipo: "multiple-choice",
      pregunta: "¿Qué examen permite recuperar uno de los parciales?",
      opciones: [
        { id: "a", texto: "El examen final." },
        { id: "b", texto: "El examen integrador." },
        { id: "c", texto: "El examen recuperatorio." },
        { id: "d", texto: "La defensa oral." },
      ],
      respuestaCorrecta: "c",
      explicacion:
        "El recuperatorio permite volver a rendir uno de los parciales y reemplazar su calificación anterior.",
    },
    {
      id: "mc-6",
      tipo: "multiple-choice",
      pregunta: "¿Qué contenidos evalúa normalmente un examen integrador?",
      opciones: [
        {
          id: "a",
          texto: "Solamente el primer módulo.",
        },
        {
          id: "b",
          texto: "Solamente los contenidos del último parcial.",
        },
        {
          id: "c",
          texto: "Todos los módulos de la materia.",
        },
        {
          id: "d",
          texto: "Únicamente los trabajos prácticos.",
        },
      ],
      respuestaCorrecta: "c",
      explicacion:
        "El integrador abarca todos los módulos y reemplaza las calificaciones obtenidas en los dos parciales.",
    },
{
  id: "mc-7",
  tipo: "multiple-choice",
  pregunta:
    "¿Dónde debería consultar un estudiante las fechas de parciales y entregas de trabajos prácticos?",
  opciones: [
    {
      id: "a",
      texto:
        "En el calendario académico",
    },
    {
      id: "b",
      texto:
        "En Klarway, el mismo portal que se utiliza para rendir.",
    },
    {
      id: "c",
      texto:
        "En el foro de cada materia, esperando que el docente publique un aviso.",
    },
    {
      id: "d",
      texto:
        "En la página pública de la carrera.",
    },
  ],
  respuestaCorrecta: "a",
  explicacion:
    "El calendario académico informa las fechas de inicio y cierre de cada período habilitado para rendir parciales y entregar trabajos prácticos. Estas fechas se organizan según la tipología de la materia, por lo que es importante identificar si se trata de una MEC, MIA, MIP o MAP y en qué periodo del año queremos consultar",
},
    {
  id: "mc-8",
  tipo: "multiple-choice",
  pregunta:
    "¿Cuál de estas afirmaciones describe correctamente a las Actividades Prácticas?",
  opciones: [
    {
      id: "a",
      texto:
        "Son ejercicios autoevaluativos que permiten practicar los contenidos sin afectar la nota final.",
    },
    {
      id: "b",
      texto:
        "Son entregas obligatorias con calificación que determinan la promoción.",
    },
    {
      id: "c",
      texto:
        "Son evaluaciones que reemplazan los trabajos prácticos.",
    },
    {
      id: "d",
      texto:
        "Son actividades que deben presentarse al docente para recibir una devolución.",
    },
  ],
  respuestaCorrecta: "a",
  explicacion:
    "Las Actividades Prácticas son ejercicios autoevaluativos disponibles en Canvas. Sirven para repasar contenidos y comprobar la comprensión antes de avanzar, pero no llevan nota ni modifican la condición final de la materia. Las calificaciones que sí influyen son las de los trabajos prácticos y los parciales.",
},
    {
      id: "mc-10",
      tipo: "multiple-choice",
      pregunta: "¿Para qué sirven principalmente las materias electivas?",
      opciones: [
        {
          id: "a",
          texto: "Para reemplazar cualquier materia desaprobada.",
        },
        {
          id: "b",
          texto: "Para ampliar la formación según los intereses profesionales.",
        },
        {
          id: "c",
          texto: "Para evitar la Práctica Profesional.",
        },
        {
          id: "d",
          texto: "Para reemplazar el EFIP.",
        },
      ],
      respuestaCorrecta: "b",
      explicacion:
        "Las electivas permiten personalizar parte del recorrido académico y explorar áreas relacionadas con los intereses profesionales.",
    },
   {
  id: "mc-13",
  tipo: "multiple-choice",
  pregunta:
    "¿Qué hace que una materia sea considerada una materia extra?",
  opciones: [
    {
      id: "a",
      texto:
        "Que se curse además de las materias previstas en la carga habitual del semestre.",
    },
    {
      id: "b",
      texto:
        "Que se dicte fuera del calendario académico regular.",
    },
    {
      id: "c",
      texto:
        "Que no otorgue créditos para completar el plan de estudios.",
    },
    {
      id: "d",
      texto:
        "Que haya sido reconocida mediante un trámite de equivalencias.",
    },
  ],
  respuestaCorrecta: "a",
  explicacion:
    "Una materia se considera extra cuando se suma a la carga académica prevista para el semestre. Puede ser obligatoria, electiva o una materia que deba recursarse, y permite adelantar o reorganizar el recorrido académico.",
},
   {
  id: "mc-14",
  tipo: "multiple-choice",
  pregunta:
    "¿Qué distingue principalmente a la Práctica Solidaria de otras experiencias formativas?",
  opciones: [
    {
      id: "a",
      texto:
        "Se centra en adquirir experiencia laboral dentro de una empresa.",
    },
    {
      id: "b",
      texto:
        "Integra el aprendizaje universitario con la participación activa en una organización de la comunidad.",
    },
    {
      id: "c",
      texto:
        "Se limita a observar el funcionamiento de una organización sin participar en sus actividades.",
    },
    {
      id: "d",
      texto:
        "Permite reemplazar materias obligatorias por actividades comunitarias.",
    },
  ],
  respuestaCorrecta: "b",
  explicacion:
    "La Práctica Solidaria vincula la formación universitaria con una experiencia concreta de participación social. El estudiante se integra a una organización, colabora en sus actividades y reflexiona sobre la realidad abordada, convirtiendo esa participación en una instancia de aprendizaje.",
},
   {
  id: "mc-15",
  tipo: "multiple-choice",
  pregunta: "¿Cuál es el objetivo principal de la Práctica Profesional?",
  opciones: [
    {
      id: "a",
      texto:
        "Integrar conocimientos de la carrera en un contexto profesional.",
    },
    {
      id: "b",
      texto:
        "Reemplazar todas las materias electivas.",
    },
    {
      id: "c",
      texto:
        "Observar el funcionamiento de una organización sin participar en tareas profesionales.",
    },
    {
      id: "d",
      texto:
        "Asegurar la incorporación del estudiante como empleado al finalizar la práctica.",
    },
  ],
  respuestaCorrecta: "a",
  explicacion:
    "La Práctica Profesional permite trasladar los conocimientos adquiridos durante la carrera a situaciones propias del campo laboral. El estudiante participa en actividades vinculadas con su perfil profesional, desarrolla competencias y obtiene experiencia concreta antes de graduarse.",
},
    {
      id: "mc-16",
      tipo: "multiple-choice",
      pregunta: "¿Qué significa EFIP?",
      opciones: [
        {
          id: "a",
          texto: "Evaluación Final Individual Programada.",
        },
        {
          id: "b",
          texto: "Examen Final Integrador Presencial.",
        },
        {
          id: "c",
          texto: "Espacio de Formación e Inserción Profesional.",
        },
        {
          id: "d",
          texto: "Evaluación Formativa Institucional Permanente.",
        },
      ],
      respuestaCorrecta: "b",
      explicacion:
        "EFIP significa Examen Final Integrador Presencial y forma parte de las carreras de grado a distancia.",
    },
    {
      id: "mc-17",
      tipo: "multiple-choice",
      pregunta:
        "¿Qué puede obtener un estudiante mediante un trámite de equivalencias?",
      opciones: [
        {
          id: "a",
          texto: "El reconocimiento de materias aprobadas anteriormente.",
        },
        {
          id: "b",
          texto: "La eliminación de todos los exámenes finales.",
        },
        {
          id: "c",
          texto: "La inscripción automática a materias de verano.",
        },
        {
          id: "d",
          texto: "El título sin completar el plan de estudios.",
        },
      ],
      respuestaCorrecta: "a",
      explicacion:
        "Las equivalencias pueden reconocer asignaturas aprobadas previamente cuando cumplen con los criterios académicos correspondientes.",
    },
  {
  id: "mc-18",
  tipo: "multiple-choice",
  pregunta:
    "¿Dónde se realizan los parciales y finales?",
  opciones: [
    {
      id: "a",
      texto:
        "Únicamente de manera virtual, a través de SOE (Klarway).",
    },
    {
      id: "b",
      texto:
        "Únicamente de manera presencial en el CAU, sin utilizar una plataforma.",
    },
    {
      id: "c",
      texto:
        "De manera virtual o presencial en el CAU, utilizando SOE (Klarway) en ambos casos.",
    },
    {
      id: "d",
      texto:
        "Los parciales se realizan en Canvas y los finales presencialmente en el CAU.",
    },
  ],
  respuestaCorrecta: "c",
  explicacion:
    "Los parciales y finales pueden rendirse de manera virtual o presencial desde el CAU, pero en ambos casos se realizan mediante SOE (Klarway). La ventaja de rendir en el CAU es contar con acompañamiento en el momento y asistencia ante consultas o inconvenientes técnicos durante la evaluación.",
},

  ],
  "Aproximación": [
  {
  id: "ap-1",
  tipo: "aproximacion",
  pregunta:
    "¿Cuántos días tenés para aprobar una correlativa anterior y mantener la promoción?",
  respuestaCorrecta: 60,
  unidad: "días",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "Si alcanzaste la promoción en una materia, pero todavía debés aprobar una correlativa anterior, tenés 60 días desde la finalización del cursado para hacerlo. Si la aprobás dentro de ese plazo, conservás la promoción; de lo contrario, la materia queda regular y deberás rendir su examen final.",
},
   {
  id: "ap-2",
  tipo: "aproximacion",
  pregunta: "¿Cuántas horas comprende la Práctica Profesional?",
  respuestaCorrecta: 250,
  unidad: "horas",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "La Práctica Profesional comprende 250 horas de experiencia en una organización vinculada con el campo profesional de la carrera. Además, para aprobar la materia, también se debe obtener una evaluación de desempeño de 7 o más y cumplir con los trabajos prácticos requeridos.",
},
{
  id: "ap-3",
  tipo: "aproximacion",
  pregunta:
    "¿Cuántas semanas dura la instancia organizacional de Práctica Solidaria?",
  respuestaCorrecta: 12,
  unidad: "semanas",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "La instancia organizacional de Práctica Solidaria se desarrolla durante 12 semanas. En ese período, el estudiante participa de manera sostenida en una organización de la comunidad, colabora en las actividades acordadas y vincula esa experiencia con los contenidos y trabajos académicos de la materia.",
},
    {
  id: "ap-4",
  tipo: "aproximacion",
  pregunta:
    "¿Cuántas preguntas tiene un parcial de modalidad ED o EDH?",
  respuestaCorrecta: 20,
  unidad: "preguntas",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "Los parciales de las modalidades ED y EDH tienen 20 preguntas de opción múltiple y una duración máxima de 40 minutos. Se aprueban con una nota mínima de 5, equivalente a responder correctamente al menos 9 preguntas.",
},
   {
  id: "ap-5",
  tipo: "aproximacion",
  pregunta:
    "¿Cuántas preguntas tiene un examen integrador de modalidad ED o EDH?",
  respuestaCorrecta: 30,
  unidad: "preguntas",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "El examen integrador tiene 30 preguntas, abarca los contenidos evaluados en el primer y segundo parcial y dispone de hasta 60 minutos para completarse. Se aprueba con una nota mínima de 5, equivalente a entre 13 y 15 respuestas correctas, y la calificación obtenida reemplaza las notas de ambos parciales.",
},
   {
  id: "ap-6",
  tipo: "aproximacion",
  pregunta: "¿Cuántos módulos abarca un examen integrador?",
  respuestaCorrecta: 4,
  unidad: "módulos",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "El examen integrador evalúa los 4 módulos de la materia y la calificación obtenida reemplaza las notas de ambos parciales.",
},
    {
      id: "ap-7",
      tipo: "aproximacion",
      pregunta:
        "¿Cuántos trabajos prácticos suelen tener las materias programáticas?",
      respuestaCorrecta: 4,
      unidad: "trabajos prácticos",
      cantidadMinimaRespuestas: 2,
      
       explicacion:
  "Las materias programáticas incluyen 4 trabajos prácticos, uno por cada módulo. Sus notas influyen, junto con los parciales, en la condición final de la materia.",
    },
    
  {
  id: "ap-9",
  tipo: "aproximacion",
  pregunta: "¿Cuánto dura normalmente un parcial virtual?",
  respuestaCorrecta: 40,
  unidad: "minutos",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "Un parcial virtual dura hasta 40 minutos y consta de 20 preguntas. El tiempo comienza a correr al iniciar la evaluación en SOE (Klarway), por lo que conviene contar previamente con una conexión estable y un espacio adecuado para rendir.",
},
  {
  id: "ap-10",
  tipo: "aproximacion",
  pregunta: "¿Cuánto dura normalmente un examen integrador virtual?",
  respuestaCorrecta: 60,
  unidad: "minutos",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "Un examen integrador virtual dura hasta 60 minutos, consta de 30 preguntas y evalúa los contenidos de los cuatro módulos de la materia. La calificación obtenida reemplaza las notas de ambos parciales.",
},
    {
      id: "ap-11",
      tipo: "aproximacion",
      pregunta:
        "¿Cuántas oportunidades existen normalmente para rendir el final de una materia regular?",
      respuestaCorrecta: 3,
      unidad: "oportunidades",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "Una materia regular cuenta normalmente con hasta tres oportunidades para rendir su examen final en un plazo de 18 meses desde regularizada la materia.",
    },
    {
      id: "ap-12",
      tipo: "aproximacion",
      pregunta:
        "¿Durante cuántos meses suele mantenerse la regularidad de una materia?",
      respuestaCorrecta: 18,
      unidad: "meses",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "La regularidad de una materia tiene una vigencia de 18 meses. Durante ese período, el estudiante dispone de hasta 3 oportunidades para rendir y aprobar el examen final.",
    },
   {
  id: "ap-13",
  tipo: "aproximacion",
  pregunta:
    "¿Hasta cuántas materias extra pueden realizarse durante un año?",
  respuestaCorrecta: 7,
  unidad: "materias",
  cantidadMinimaRespuestas: 2,
  explicacion:
    "Durante el año se pueden cursar hasta 7 materias extra: 2 en cada semestre y hasta 3 durante el cursado de verano. Esto aplica tanto a carreras de grado como de pregrado.",
},
    {
      id: "ap-14",
      tipo: "aproximacion",
      pregunta:
        "¿Cuántos créditos electivos requieren normalmente las carreras de grado?",
      respuestaCorrecta: 8,
      unidad: "créditos",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "Las carreras de grado requieren  ocho créditos electivos, salvo la carrera de Abogacía que requiere 4 créditos electivos.",
    },
    {
      id: "ap-15",
      tipo: "aproximacion",
      pregunta:
        "¿Cuántos EFIP existen en las carreras que contemplan esta instancia?",
      respuestaCorrecta: 2,
      unidad: "EFIP",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "Las carreras que contemplan esta instancia incluyen EFIP I y EFIP II.",
    },
  ],

  "Pregunta abierta": [
    {
      id: "pa-1",
      tipo: "pregunta-abierta",
      pregunta: "¿Qué significa para vos comenzar una carrera universitaria?",
      reflexion:
        "Comenzar una carrera puede representar una decisión de crecimiento, la construcción de un proyecto personal y el inicio de nuevas oportunidades.",
    },
    {
      id: "pa-2",
      tipo: "pregunta-abierta",
      pregunta: "¿Qué esperás haber conseguido cuando termine este semestre?",
      reflexion:
        "Pensar una meta concreta ayuda a orientar el esfuerzo, reconocer los avances y darle sentido al recorrido del semestre.",
    },
    {
      id: "pa-3",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué habilidad personal creés que más vas a desarrollar durante la carrera?",
      reflexion:
        "La experiencia universitaria no solo aporta conocimientos: también permite desarrollar autonomía, organización, comunicación, constancia y capacidad para resolver problemas.",
    },
    {
      id: "pa-4",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué puede aportar una persona que estudia una carrera universitaria a su comunidad?",
      reflexion:
        "La formación profesional puede convertirse en ideas, proyectos y decisiones que contribuyan a resolver problemas y mejorar la realidad de otras personas.",
    },
    {
      id: "pa-5",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué diferencia creés que existe entre estudiar para aprobar y estudiar para aprender?",
      reflexion:
        "Estudiar para aprobar suele enfocarse en superar una evaluación. Estudiar para aprender implica comprender, relacionar ideas y poder aplicar lo aprendido en situaciones nuevas.",
    },
    {
      id: "pa-6",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué característica considerás indispensable en un buen profesional?",
      reflexion:
        "El conocimiento técnico es importante, pero se potencia cuando está acompañado por responsabilidad, ética, empatía y compromiso con los demás.",
    },
    {
      id: "pa-7",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué te gustaría que tus compañeros recuerden de vos al terminar la carrera?",
      reflexion:
        "La experiencia universitaria también se construye con vínculos. La manera de colaborar, escuchar y acompañar puede dejar una huella tan importante como los logros académicos.",
    },
    {
      id: "pa-8",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué puede enseñarnos trabajar con personas que piensan distinto?",
      reflexion:
        "La diversidad de perspectivas permite cuestionar ideas, ampliar la mirada y construir soluciones que una sola persona quizá no habría imaginado.",
    },
    {
      id: "pa-9",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Cómo imaginás que la tecnología va a transformar tu futura profesión?",
      reflexion:
        "La tecnología cambia herramientas y procesos, pero también crea nuevos desafíos. Adaptarse y continuar aprendiendo será parte fundamental de cualquier profesión.",
    },
    {
      id: "pa-10",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué desafío personal te gustaría superar durante tu etapa universitaria?",
      reflexion:
        "Identificar un desafío permite transformarlo en una meta. Los grandes cambios suelen construirse mediante pequeños avances sostenidos.",
    },
    {
      id: "pa-11",
      tipo: "pregunta-abierta",
      pregunta: "¿Qué significa para vos tener éxito en la Universidad?",
      reflexion:
        "El éxito universitario puede incluir aprobar materias, pero también aprender, crecer, construir vínculos y sostener un proyecto personal a lo largo del tiempo.",
    },
    {
      id: "pa-12",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué valor debería tener mayor presencia en cualquier profesión?",
      reflexion:
        "Los valores orientan la forma en que se aplican los conocimientos. La ética, la responsabilidad y el respeto influyen directamente en el impacto de una profesión.",
    },
    {
      id: "pa-13",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué responsabilidad tiene un profesional frente a los problemas de la sociedad?",
      reflexion:
        "Un profesional puede utilizar sus conocimientos para comprender problemas, proponer soluciones responsables y contribuir desde su ámbito de acción.",
    },
    {
      id: "pa-14",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Qué consejo le darías a una persona que tiene miedo de comenzar una carrera?",
      reflexion:
        "El miedo puede aparecer frente a cualquier cambio importante. Comenzar no exige tener todo resuelto, sino animarse a avanzar y pedir acompañamiento cuando sea necesario.",
    },
    {
      id: "pa-15",
      tipo: "pregunta-abierta",
      pregunta: "¿Qué aspecto de tu carrera te genera más curiosidad?",
      reflexion:
        "La curiosidad impulsa el aprendizaje. Reconocer qué temas despiertan interés puede ayudar a descubrir áreas de especialización y futuros proyectos.",
    },
    {
      id: "pa-16",
      tipo: "pregunta-abierta",
      pregunta:
        "¿Cómo te gustaría utilizar lo que aprendas cuando seas profesional?",
      reflexion:
        "Imaginar cómo aplicar los conocimientos permite conectar el esfuerzo actual con el impacto profesional que se desea generar en el futuro.",
    },
  ],

  "Carrera misteriosa": [
    {
      id: "cm-1",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Interpreto normas y leyes.",
        "Puedo asesorar y representar personas.",
        "La justicia es uno de mis principales campos de estudio.",
      ],
      respuestasAceptadas: [
        "abogacía",
        "abogacia",
        "carrera de abogacía",
        "carrera de abogacia",
      ],
      respuestaCorrecta: "Abogacía",
      explicacion:
        "Abogacía estudia el derecho, las normas jurídicas y su aplicación en distintos ámbitos.",
    },
    {
      id: "cm-2",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Trabajo con información económica.",
        "Puedo elaborar balances y analizar impuestos.",
        "Acompaño la toma de decisiones de las organizaciones.",
      ],
      respuestasAceptadas: [
        "contador público",
        "contador publico",
        "contabilidad",
      ],
      respuestaCorrecta: "Contador Público",
      explicacion:
        "Contador Público trabaja con información contable, económica, financiera e impositiva de personas y organizaciones.",
    },
    {
      id: "cm-3",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Estudio cómo funcionan las organizaciones.",
        "Trabajo con planificación, recursos y decisiones.",
        "Puedo participar en empresas de diferentes sectores.",
      ],
      respuestasAceptadas: [
        "licenciatura en administración",
        "licenciatura en administracion",
        "administración",
        "administracion",
      ],
      respuestaCorrecta: "Licenciatura en Administración",
      explicacion:
        "La Licenciatura en Administración forma profesionales capaces de gestionar recursos, procesos y decisiones organizacionales.",
    },
    {
      id: "cm-4",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Investigo qué necesitan los consumidores.",
        "Desarrollo estrategias para productos y marcas.",
        "El posicionamiento es parte de mi trabajo.",
      ],
      respuestasAceptadas: [
        "licenciatura en comercialización",
        "licenciatura en comercializacion",
        "marketing",
        "comercialización",
        "comercializacion",
      ],
      respuestaCorrecta: "Licenciatura en Comercialización — Marketing",
      explicacion:
        "Esta carrera estudia mercados, consumidores, marcas y estrategias para conectar productos y servicios con sus públicos.",
    },
    {
      id: "cm-5",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Trabajo con el talento de las organizaciones.",
        "Puedo participar en selección y capacitación.",
        "Me interesa mejorar la experiencia de los equipos.",
      ],
      respuestasAceptadas: [
        "licenciatura en gestión de recursos humanos",
        "licenciatura en gestion de recursos humanos",
        "recursos humanos",
        "gestión de recursos humanos",
        "gestion de recursos humanos",
      ],
      respuestaCorrecta: "Licenciatura en Gestión de Recursos Humanos",
      explicacion:
        "Esta carrera aborda la selección, el desarrollo, la capacitación y la gestión de las personas dentro de las organizaciones.",
    },
    {
      id: "cm-6",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Analizo inversiones y riesgos.",
        "Trabajo con dinero, mercados y planificación.",
        "Ayudo a tomar decisiones económicas a futuro.",
      ],
      respuestasAceptadas: ["licenciatura en finanzas", "finanzas"],
      respuestaCorrecta: "Licenciatura en Finanzas",
      explicacion:
        "La Licenciatura en Finanzas estudia inversiones, mercados, riesgos y decisiones económicas.",
    },
    {
      id: "cm-7",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Estudio las causas y características del delito.",
        "Analizo estrategias de prevención.",
        "Puedo participar en políticas y proyectos de seguridad.",
      ],
      respuestasAceptadas: [
        "licenciatura en criminología y seguridad",
        "licenciatura en criminologia y seguridad",
        "criminología y seguridad",
        "criminologia y seguridad",
        "criminología",
        "criminologia",
      ],
      respuestaCorrecta: "Licenciatura en Criminología y Seguridad",
      explicacion:
        "Esta carrera analiza el delito, sus causas, sus consecuencias y las estrategias de prevención y seguridad.",
    },
    {
      id: "cm-8",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Trabajo con indicios y evidencias.",
        "La observación y el procedimiento son fundamentales.",
        "Mi tarea puede comenzar en el lugar donde ocurrió un hecho.",
      ],
      respuestasAceptadas: [
        "tecnicatura en investigación de la escena del crimen",
        "tecnicatura en investigacion de la escena del crimen",
        "investigación de la escena del crimen",
        "investigacion de la escena del crimen",
        "escena del crimen",
      ],
      respuestaCorrecta: "Tecnicatura en Investigación de la Escena del Crimen",
      explicacion:
        "Esta tecnicatura se enfoca en la observación, preservación y análisis de indicios presentes en una escena.",
    },
   
    {
      id: "cm-10",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Trabajo con grandes cantidades de información.",
        "Busco patrones y preparo modelos.",
        "Combino matemática, programación y análisis.",
      ],
      respuestasAceptadas: [
        "licenciatura en ciencia de datos",
        "ciencia de datos",
        "data science",
      ],
      respuestaCorrecta: "Licenciatura en Ciencia de Datos",
      explicacion:
        "Ciencia de Datos combina programación, matemática y análisis para obtener conocimiento a partir de grandes volúmenes de información.",
    },
    {
      id: "cm-11",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Desarrollo sistemas capaces de aprender o automatizar tareas.",
        "Combino software, datos y dispositivos.",
        "Puedo trabajar con máquinas inteligentes.",
      ],
      respuestasAceptadas: [
        "licenciatura en inteligencia artificial y robótica",
        "licenciatura en inteligencia artificial y robotica",
        "inteligencia artificial y robótica",
        "inteligencia artificial y robotica",
        "inteligencia artificial",
        "robótica",
        "robotica",
      ],
      respuestaCorrecta: "Licenciatura en Inteligencia Artificial y Robótica",
      explicacion:
        "Esta carrera combina software, datos y dispositivos para crear sistemas inteligentes y soluciones automatizadas.",
    },
    {
      id: "cm-12",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Protejo sistemas e información digital.",
        "Analizo vulnerabilidades y posibles ataques.",
        "Mi trabajo ayuda a prevenir incidentes tecnológicos.",
      ],
      respuestasAceptadas: [
        "licenciatura en seguridad informática",
        "licenciatura en seguridad informatica",
        "seguridad informática",
        "seguridad informatica",
        "ciberseguridad",
      ],
      respuestaCorrecta: "Licenciatura en Seguridad Informática",
      explicacion:
        "Seguridad Informática se ocupa de proteger sistemas, redes y datos frente a vulnerabilidades y amenazas.",
    },
    {
      id: "cm-13",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Puedo intervenir en operaciones inmobiliarias.",
        "Trabajo con tasaciones, ventas y subastas.",
        "Vinculo personas interesadas en distintos bienes.",
      ],
      respuestasAceptadas: [
        "martillero corredor público y corredor inmobiliario",
        "martillero corredor publico y corredor inmobiliario",
        "martillero y corredor público",
        "martillero y corredor publico",
        "martillero",
        "corredor inmobiliario",
      ],
      respuestaCorrecta: "Martillero, Corredor Público y Corredor Inmobiliario",
      explicacion:
        "Esta carrera prepara para intervenir en operaciones, tasaciones, subastas y actividades vinculadas con bienes e inmuebles.",
    },
    {
      id: "cm-14",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Busco prevenir accidentes laborales.",
        "Analizo riesgos y condiciones de trabajo.",
        "Protejo la salud de las personas dentro de las organizaciones.",
      ],
      respuestasAceptadas: [
        "licenciatura en higiene seguridad y medio ambiente del trabajo",
        "higiene seguridad y medio ambiente del trabajo",
        "higiene y seguridad",
        "seguridad e higiene",
      ],
      respuestaCorrecta:
        "Licenciatura en Higiene, Seguridad y Medio Ambiente del Trabajo",
      explicacion:
        "Esta carrera se orienta a prevenir riesgos, accidentes y enfermedades vinculadas con el trabajo.",
    },
    {
      id: "cm-15",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Planifico encuentros y actividades.",
        "Cuido la imagen, el ceremonial y la experiencia de los invitados.",
        "Trabajo con organización y comunicación institucional.",
      ],
      respuestasAceptadas: [
        "tecnicatura en dirección de protocolo organización de eventos y relaciones públicas",
        "tecnicatura en direccion de protocolo organizacion de eventos y relaciones publicas",
        "protocolo organización de eventos y relaciones públicas",
        "protocolo organizacion de eventos y relaciones publicas",
        "organización de eventos",
        "organizacion de eventos",
        "protocolo y eventos",
      ],
      respuestaCorrecta:
        "Tecnicatura en Dirección de Protocolo, Organización de Eventos y Relaciones Públicas",
      explicacion:
        "Esta tecnicatura integra planificación de eventos, ceremonial, protocolo, relaciones públicas y comunicación institucional.",
    },
    {
  id: "cm-17",
  tipo: "carrera-misteriosa",
  pregunta: "¿De qué carrera se trata?",
  pistas: [
    "Diseño mecánicas, personajes y escenarios.",
    "Combino programación, animación y narrativa.",
    "Creo experiencias interactivas utilizando motores de videojuegos.",
  ],
  respuestasAceptadas: [
    "tecnicatura universitaria en diseño y desarrollo de videojuegos",
    "diseño y desarrollo de videojuegos",
    "desarrollo de videojuegos",
    "diseño de videojuegos",
    "videojuegos",
  ],
  respuestaCorrecta:
    "Tecnicatura Universitaria en Diseño y Desarrollo de Videojuegos",
  explicacion:
    "Esta tecnicatura integra diseño, programación, animación y narrativa para crear videojuegos, prototipos y experiencias interactivas.",
},
{
  id: "cm-18",
  tipo: "carrera-misteriosa",
  pregunta: "¿De qué carrera se trata?",
  pistas: [
    "Creo personajes, escenarios y contenidos visuales.",
    "Trabajo con animación, modelado y producción en 2D y 3D.",
    "Puedo participar en proyectos audiovisuales, publicitarios o de videojuegos.",
  ],
  respuestasAceptadas: [
    "tecnicatura universitaria en diseño y animacion digital",
    "diseño y animacion digital",
    "animacion digital",
    "diseño digital",
  ],
  respuestaCorrecta:
    "Tecnicatura Universitaria en Diseño y Animación Digital",
  explicacion:
    "Esta tecnicatura forma para desarrollar animaciones, piezas gráficas y producciones digitales mediante herramientas de diseño, modelado y postproducción.",
},
{
  id: "cm-19",
  tipo: "carrera-misteriosa",
  pregunta: "¿De qué carrera se trata?",
  pistas: [
    "Analizo el impacto ambiental de proyectos y actividades productivas.",
    "Promuevo el aprovechamiento sustentable de los recursos.",
    "Participo en proyectos vinculados con energía solar, eólica y otras fuentes renovables.",
  ],
  respuestasAceptadas: [
    "licenciatura en ambiente y energias renovables",
    "ambiente y energias renovables",
    "energias renovables",
    "ambiente y energia",
  ],
  respuestaCorrecta:
    "Licenciatura en Ambiente y Energías Renovables",
  explicacion:
    "Esta licenciatura combina gestión ambiental y energías renovables para diseñar soluciones sustentables, evaluar impactos y participar en proyectos energéticos.",
},
{
  id: "cm-20",
  tipo: "carrera-misteriosa",
  pregunta: "¿De qué carrera se trata?",
  pistas: [
    "Aplico tecnología y análisis de datos a la producción agropecuaria.",
    "Trabajo con sensores, sistemas y herramientas digitales.",
    "Busco que el campo produzca de manera más eficiente, segura y sustentable.",
  ],
  respuestasAceptadas: [
    "licenciatura en agroinformatica",
    "agroinformatica",
    "agro informatica",
  ],
  respuestaCorrecta:
    "Licenciatura en Agroinformática",
  explicacion:
    "Esta licenciatura integra tecnología, datos y producción agropecuaria para desarrollar soluciones digitales aplicadas al campo y a la agricultura de precisión.",
},
{
  id: "cm-21",
  tipo: "carrera-misteriosa",
  pregunta: "¿De qué carrera se trata?",
  pistas: [
    "Gestiono procesos y recursos dentro del Estado.",
    "Analizo necesidades sociales y diseño respuestas desde el sector público.",
    "Participo en la planificación, implementación y evaluación de políticas públicas.",
  ],
  respuestasAceptadas: [
    "licenciatura en administracion publica",
    "administracion publica",
    "administración pública",
  ],
  respuestaCorrecta:
    "Licenciatura en Administración Pública",
  explicacion:
    "Esta licenciatura forma profesionales capaces de gestionar organismos estatales, intervenir en procesos administrativos y participar en el diseño y evaluación de políticas públicas.",
},
    {
      id: "cm-16",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Creo campañas para medios digitales.",
        "Trabajo con redes, contenidos y audiencias.",
        "Analizo resultados para mejorar la comunicación de una marca.",
      ],
      respuestasAceptadas: [
        "tecnicatura universitaria en marketing y publicidad digital",
        "marketing y publicidad digital",
        "publicidad digital",
        "marketing digital",
        "marketing",
      ],
      respuestaCorrecta:
        "Tecnicatura Universitaria en Marketing y Publicidad Digital",
      explicacion:
        "Esta tecnicatura se orienta a la creación, gestión y análisis de campañas, contenidos y estrategias para medios digitales.",
    },
    
  ],

  "Desafío rápido": [
  {
    id: "dr-1",
    tipo: "desafio-rapido",
    pregunta:
      "Tenés 10 segundos: nombrá tres carreras relacionadas con la tecnología.",
    validacion: "manual",
    explicacion:
      "Algunas opciones son Ciencia de Datos, Inteligencia Artificial y Robótica, Seguridad Informática, Informática y Desarrollo de Videojuegos.",
  },
  {
    id: "dr-2",
    tipo: "desafio-rapido",
    pregunta:
      "En 15 segundos, nombrá una carrera en las que sea importante comunicarse bien y explicá tu elección",
    validacion: "manual",
    explicacion:
      "La comunicación es transversal a muchas profesiones. El desafío se supera al nombrar tres carreras y justificar correctamente al menos una.",
  },
  {
    id: "dr-3",
    tipo: "desafio-rapido",
    pregunta:
      "Tenés 10 segundos: nombrá tres profesionales que podrían trabajar dentro de una misma empresa.",
    validacion: "manual",
    explicacion:
      "Una empresa puede reunir profesionales de Administración, Contabilidad, Recursos Humanos, Marketing, Comunicación, Tecnología y muchas otras áreas.",
  },
  {
    id: "dr-4",
    tipo: "desafio-rapido",
    pregunta:
      "En menos de 10 segundos, nombrá tres carreras relacionadas con la justicia, la investigación o la seguridad.",
    validacion: "manual",
    explicacion:
      "Algunas opciones son Abogacía, Criminología y Seguridad, Investigación de la Escena del Crimen y Seguridad Informática.",
  },
  {
    id: "dr-5",
    tipo: "desafio-rapido",
    pregunta:
      "Tenés 10 segundos: nombrá tres carreras en las que se trabaje habitualmente con números o datos.",
    validacion: "manual",
    explicacion:
      "Algunas opciones son Contador Público, Finanzas, Ciencia de Datos, Administración, Economía y Actuario.",
  },
  {
    id: "dr-7",
    tipo: "desafio-rapido",
    pregunta:
      "En menos de 5 segundos, nombrá una carrera que comience con la letra A.",
    validacion: "manual",
    explicacion:
      "Algunas respuestas posibles son Abogacía, Administración, Administración Pública, Agronegocios o Agroinformática.",
  },
  {
    id: "dr-9",
    tipo: "desafio-rapido",
    pregunta:
      "Tenés 10 segundos: nombrá dos carreras de grado y una tecnicatura.",
    validacion: "manual",
    explicacion:
      "El desafío consiste en diferenciar correctamente los tipos de titulación y mencionar tres opciones válidas.",
  },
  {
    id: "dr-10",
    tipo: "desafio-rapido",
    pregunta:
      "En menos de 5 segundos, nombrá una carrera vinculada con el ambiente o la sustentabilidad.",
    validacion: "manual",
    explicacion:
      "Una respuesta posible es la Licenciatura en Ambiente y Energías Renovables.",
  },
  {
    id: "dr-12",
    tipo: "desafio-rapido",
    pregunta:
      "En 10 segundos, decí tres excusas típicas para postergar un trabajo práctico sin repetir ninguna palabra clave.",
    validacion: "manual",
    explicacion:
      "El desafío propone reconocer con humor algunas formas habituales de postergar tareas y responder con rapidez.",
  },
  {
    id: "dr-13",
    tipo: "desafio-rapido",
    pregunta:
      "En menos de 5 segundos, nombrá una carrera que pueda ejercerse tanto de manera independiente como dentro de una organización.",
    validacion: "manual",
    explicacion:
      "Existen numerosas respuestas posibles, como Abogacía, Contador Público, Marketing, Diseño Gráfico, Recursos Humanos o Informática.",
  },
  {
    id: "dr-15",
    tipo: "desafio-rapido",
    pregunta:
      "En 15 segundos, mencioná tres estrategias para atravesar una semana con muchas entregas y cuál aplicarías primero.",
    validacion: "manual",
    explicacion:
      "Algunas estrategias son priorizar tareas, organizar horarios, dividir trabajos grandes, evitar distracciones y pedir ayuda cuando sea necesario.",
  },
  {
    id: "dr-16",
    tipo: "desafio-rapido",
    pregunta:
      "Tenés 10 segundos para presentarte diciendo tu nombre, tu carrera y una habilidad inesperada que tengas.",
    validacion: "manual",
    explicacion:
      "El objetivo es presentarse de manera breve, respetar el límite de tiempo y compartir algo diferente con el grupo.",
  },
  {
    id: "dr-17",
    tipo: "desafio-rapido",
    pregunta:
      "En menos de 5 segundos, nombrá una carrera que comience con la misma letra que tu nombre.",
    validacion: "manual",
    explicacion:
      "La respuesta debe corresponder a una carrera real y comenzar con la misma letra que el nombre del participante.",
  },
  {
    id: "dr-19",
    tipo: "desafio-rapido",
    pregunta:
      "En menos de 5 segundos, nombrá una carrera que trabaje con datos.",
    validacion: "manual",
    explicacion:
      "Algunas respuestas posibles son Ciencia de Datos, Inteligencia Artificial y Robótica, Agroinformática, Finanzas o Contador Público.",
  },
 {
  id: "dr-32",
  tipo: "desafio-rapido",
  pregunta:
    "En menos de 5 segundos, nombrá una carrera de Siglo 21 que contenga la letra B.",
  validacion: "manual",
  explicacion:
    "Algunas respuestas posibles son Bioinformática, Abogacía o Escribanía.",
},
{
  id: "dr-8",
  tipo: "desafio-rapido",
  pregunta:
    "En menos de 5 segundos, nombrá una carrera de Siglo 21 que empiece con C.",
  validacion: "manual",
  explicacion:
    "Algunas opciones son Contador Público, Ciencia de Datos, Comercio Internacional o Criminología y Seguridad.",
},
{
  id: "dr-33",
  tipo: "desafio-rapido",
  pregunta:
    "En menos de 5 segundos, nombrá una carrera que empiece con D.",
  validacion: "manual",
  explicacion:
    "Algunas opciones son Diseño y Animación Digital y Diseño y Desarrollo de Videojuegos.",
},
{
  id: "dr-34",
  tipo: "desafio-rapido",
  pregunta:
    "En menos de 5 segundos, nombrá una carrera de Siglo 21 que empiece con M.",
  validacion: "manual",
  explicacion:
    "Algunas opciones son Marketing y Publicidad Digital o Martillero, Corredor Público y Corredor Inmobiliario.",
},
{
  id: "dr-11",
  tipo: "desafio-rapido",
  pregunta:
    "En menos de 5 segundos, nombrá una carrera que empiece con la última letra de tu nombre.",
  validacion: "manual",
  explicacion:
    "La respuesta debe ser una carrera real y comenzar con la última letra del nombre del participante. Si no existe una opción clara, puede utilizarse la primera letra.",
},
],
};
