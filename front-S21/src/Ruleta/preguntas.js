export const preguntasPorCategoria = {
  "Verdadero o falso": [
    {
      id: "vf-1",
      tipo: "verdadero-falso",
      pregunta:
        "Todas las materias se aprueban de la misma manera, independientemente de su modalidad y tipología.",
      respuestaCorrecta: false,
      explicacion:
        "Las materias pueden tener distintas modalidades y tipologías, por lo que sus condiciones de regularidad, promoción y aprobación pueden variar.",
    },
    {
      id: "vf-2",
      tipo: "verdadero-falso",
      pregunta:
        "En las carreras de grado, cursar materias electivas es completamente opcional.",
      respuestaCorrecta: false,
      explicacion:
        "Las carreras de grado incluyen una cantidad de créditos electivos que deben completarse. Lo que puede elegirse es qué materias cursar entre las opciones habilitadas.",
    },
    {
      id: "vf-3",
      tipo: "verdadero-falso",
      pregunta:
        "Las materias de verano se cursan de manera intensiva y virtual.",
      respuestaCorrecta: true,
      explicacion:
        "El cursado de verano tiene una duración intensiva de cinco semanas y se desarrolla en modalidad virtual.",
    },
    {
      id: "vf-4",
      tipo: "verdadero-falso",
      pregunta:
        "Durante el cursado de verano se pueden adelantar materias de cursado cuatrimestral.",
      respuestaCorrecta: false,
      explicacion:
        "La oferta de verano está compuesta por materias especialmente habilitadas para ese período intensivo. No cualquier materia cuatrimestral puede adelantarse.",
    },
    {
      id: "vf-5",
      tipo: "verdadero-falso",
      pregunta:
        "El EFIP es una instancia obligatoria para todas las carreras y modalidades.",
      respuestaCorrecta: false,
      explicacion:
        "El EFIP corresponde a las carreras de grado a distancia que contemplan esta instancia en su plan de estudios.",
    },
    {
      id: "vf-6",
      tipo: "verdadero-falso",
      pregunta:
        "Promocionar una materia significa aprobarla sin necesidad de rendir un examen final.",
      respuestaCorrecta: true,
      explicacion:
        "Cuando una materia se promociona, queda aprobada durante el cursado y no es necesario rendir su examen final.",
    },
    {
      id: "vf-7",
      tipo: "verdadero-falso",
      pregunta:
        "Regularizar una materia significa que ya está completamente aprobada.",
      respuestaCorrecta: false,
      explicacion:
        "La regularidad indica que se cumplieron los requisitos del cursado, pero todavía debe aprobarse el examen final.",
    },
    {
      id: "vf-8",
      tipo: "verdadero-falso",
      pregunta:
        "Un examen recuperatorio permite reemplazar la nota del parcial que se está recuperando.",
      respuestaCorrecta: true,
      explicacion:
        "El recuperatorio brinda una nueva oportunidad sobre uno de los parciales y la calificación obtenida reemplaza la nota anterior.",
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
      id: "vf-10",
      tipo: "verdadero-falso",
      pregunta:
        "La nota obtenida en un recuperatorio reemplaza la nota anterior, aunque sea más baja.",
      respuestaCorrecta: true,
      explicacion:
        "La nota del recuperatorio reemplaza la calificación anterior del parcial recuperado, por lo que conviene prepararlo cuidadosamente.",
    },
    {
      id: "vf-11",
      tipo: "verdadero-falso",
      pregunta:
        "Los trabajos prácticos pueden influir en la posibilidad de promocionar o regularizar una materia.",
      respuestaCorrecta: true,
      explicacion:
        "Los trabajos prácticos forman parte de las condiciones de cursado y pueden ser necesarios para alcanzar la promoción o la regularidad.",
    },
    {
      id: "vf-12",
      tipo: "verdadero-falso",
      pregunta:
        "Todas las actividades que aparecen en Canvas tienen una nota que influye en la condición final.",
      respuestaCorrecta: false,
      explicacion:
        "Las Actividades Prácticas son autoevaluativas y no llevan nota. No todo lo que aparece en Canvas impacta directamente en la condición final.",
    },
    {
      id: "vf-13",
      tipo: "verdadero-falso",
      pregunta:
        "Cualquier estudiante puede cursar materias de verano desde su primer semestre.",
      respuestaCorrecta: false,
      explicacion:
        "Las materias de verano están habilitadas para estudiantes que ya se encuentran cursando materias de su segundo semestre en adelante.",
    },
    {
      id: "vf-14",
      tipo: "verdadero-falso",
      pregunta:
        "Las materias electivas permiten orientar parte de la formación hacia intereses profesionales personales.",
      respuestaCorrecta: true,
      explicacion:
        "Las electivas permiten ampliar el recorrido académico y elegir contenidos vinculados con los intereses o el perfil profesional de cada estudiante.",
    },
    {
      id: "vf-15",
      tipo: "verdadero-falso",
      pregunta:
        "La Práctica Solidaria propone una experiencia de aprendizaje vinculada con una organización de la comunidad.",
      respuestaCorrecta: true,
      explicacion:
        "La Práctica Solidaria permite participar en una experiencia formativa junto con una organización y vincular el aprendizaje con necesidades de la comunidad.",
    },
    {
      id: "vf-16",
      tipo: "verdadero-falso",
      pregunta:
        "La Práctica Profesional permite aplicar conocimientos de la carrera en una experiencia relacionada con el campo profesional.",
      respuestaCorrecta: true,
      explicacion:
        "Su propósito es integrar y aplicar conocimientos de la carrera en un contexto vinculado con el futuro desempeño profesional.",
    },
    {
      id: "vf-17",
      tipo: "verdadero-falso",
      pregunta:
        "Las equivalencias pueden permitir el reconocimiento de materias aprobadas anteriormente en otra institución.",
      respuestaCorrecta: true,
      explicacion:
        "El trámite de equivalencias analiza estudios previos y puede reconocer materias cuyos contenidos y requisitos resulten equivalentes.",
    },
  ],

  "Multiple choice": [
    {
      id: "mc-19",
      tipo: "multiple-choice",
      pregunta: "¿Con qué nota se aprueba un examen final?",
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
      respuestaCorrecta: "b",
      explicacion:
        "Los exámenes finales se aprueban con una calificación mínima de 5.",
    },
    {
      id: "mc-1",
      tipo: "multiple-choice",
      pregunta:
        "¿Hasta cuántas materias se pueden adelantar mediante el cursado de verano?",
      opciones: [
        { id: "a", texto: "2 materias." },
        { id: "b", texto: "4 materias." },
        { id: "c", texto: "3 materias." },
        { id: "d", texto: "5 materias." },
      ],
      respuestaCorrecta: "a",
      explicacion:
        "Durante el período de verano se pueden adelantar hasta dos materias de la oferta habilitada.",
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
        "¿Cuál de estas opciones no puede cursarse como materia electiva?",
      opciones: [
        {
          id: "a",
          texto: "Una materia habilitada para la carrera.",
        },
        {
          id: "b",
          texto: "Una materia que otorgue créditos electivos.",
        },
        {
          id: "c",
          texto: "Práctica Solidaria.",
        },
        {
          id: "d",
          texto: "Una materia vinculada con el perfil profesional.",
        },
      ],
      respuestaCorrecta: "c",
      explicacion:
        "La Práctica Solidaria es una instancia formativa propia y no se utiliza para completar créditos de materias electivas.",
    },
    {
      id: "mc-4",
      tipo: "multiple-choice",
      pregunta: "¿Qué significa promocionar una materia?",
      opciones: [
        {
          id: "a",
          texto: "Terminar de cursarla y quedar libre.",
        },
        {
          id: "b",
          texto: "Aprobarla sin rendir un examen final.",
        },
        {
          id: "c",
          texto: "Poder recursarla sin costo.",
        },
        {
          id: "d",
          texto: "Aprobar únicamente los trabajos prácticos.",
        },
      ],
      respuestaCorrecta: "b",
      explicacion:
        "Promocionar significa completar y aprobar la materia durante el cursado, sin necesidad de rendir un examen final.",
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
        "¿Qué debería revisar un estudiante para conocer las fechas de parciales y trabajos prácticos?",
      opciones: [
        {
          id: "a",
          texto: "El calendario académico.",
        },
        {
          id: "b",
          texto: "La página pública de la carrera.",
        },
        {
          id: "c",
          texto: "El diploma.",
        },
        {
          id: "d",
          texto: "El certificado analítico.",
        },
      ],
      respuestaCorrecta: "a",
      explicacion:
        "El calendario académico reúne las fechas relevantes de cursado, evaluaciones y otras instancias académicas.",
    },
    {
      id: "mc-8",
      tipo: "multiple-choice",
      pregunta: "¿Qué característica tienen las Actividades Prácticas?",
      opciones: [
        {
          id: "a",
          texto: "Son exámenes finales.",
        },
        {
          id: "b",
          texto: "Son autoevaluativas y no llevan nota.",
        },
        {
          id: "c",
          texto: "Reemplazan los parciales.",
        },
        {
          id: "d",
          texto: "Solo pueden realizarse presencialmente.",
        },
      ],
      respuestaCorrecta: "b",
      explicacion:
        "Las Actividades Prácticas permiten ejercitar y verificar la comprensión de los contenidos, pero no llevan una calificación.",
    },
    {
      id: "mc-9",
      tipo: "multiple-choice",
      pregunta:
        "¿Qué sucede normalmente cuando una materia queda en condición regular?",
      opciones: [
        {
          id: "a",
          texto: "Debe rendirse un examen final.",
        },
        {
          id: "b",
          texto: "Se aprueba automáticamente.",
        },
        {
          id: "c",
          texto: "Se elimina del plan de estudios.",
        },
        {
          id: "d",
          texto: "Se transforma en materia electiva.",
        },
      ],
      respuestaCorrecta: "a",
      explicacion:
        "La condición regular habilita a rendir el examen final necesario para completar la aprobación de la materia.",
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
      id: "mc-11",
      tipo: "multiple-choice",
      pregunta:
        "¿Dónde aparecen las materias electivas habilitadas para cada estudiante?",
      opciones: [
        {
          id: "a",
          texto: "En Portal Estudiantes.",
        },
        {
          id: "b",
          texto: "En Klarway.",
        },
        {
          id: "c",
          texto: "En Google Classroom.",
        },
        {
          id: "d",
          texto: "En el correo personal.",
        },
      ],
      respuestaCorrecta: "a",
      explicacion:
        "Las opciones electivas habilitadas de acuerdo con la carrera y el plan de estudios pueden consultarse en Portal Estudiantes.",
    },
    {
      id: "mc-12",
      tipo: "multiple-choice",
      pregunta: "¿Qué característica tiene el cursado de verano?",
      opciones: [
        {
          id: "a",
          texto: "Es anual.",
        },
        {
          id: "b",
          texto: "Es exclusivamente presencial.",
        },
        {
          id: "c",
          texto: "Es intensivo y virtual.",
        },
        {
          id: "d",
          texto: "No incluye evaluaciones.",
        },
      ],
      respuestaCorrecta: "c",
      explicacion:
        "Las materias de verano se desarrollan de manera intensiva durante cinco semanas y se cursan virtualmente.",
    },
    {
      id: "mc-13",
      tipo: "multiple-choice",
      pregunta: "¿Qué es una materia extra?",
      opciones: [
        {
          id: "a",
          texto: "Una materia que no pertenece a ninguna carrera.",
        },
        {
          id: "b",
          texto:
            "Una materia adicional a las incluidas normalmente en el semestre.",
        },
        {
          id: "c",
          texto: "Una materia que no tiene trabajos prácticos.",
        },
        {
          id: "d",
          texto: "Una materia reconocida por equivalencia.",
        },
      ],
      respuestaCorrecta: "b",
      explicacion:
        "Una materia extra se cursa de manera adicional a la carga académica habitual prevista para el semestre.",
    },
    {
      id: "mc-14",
      tipo: "multiple-choice",
      pregunta: "¿Cuál es el objetivo principal de la Práctica Solidaria?",
      opciones: [
        {
          id: "a",
          texto: "Trabajar exclusivamente en una empresa privada.",
        },
        {
          id: "b",
          texto:
            "Desarrollar una experiencia de aprendizaje junto con la comunidad.",
        },
        {
          id: "c",
          texto: "Rendir un examen integrador presencial.",
        },
        {
          id: "d",
          texto: "Obtener automáticamente créditos electivos.",
        },
      ],
      respuestaCorrecta: "b",
      explicacion:
        "La Práctica Solidaria vincula la formación universitaria con una experiencia de participación y aprendizaje en la comunidad.",
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
          texto: "Reemplazar todas las materias electivas.",
        },
        {
          id: "c",
          texto: "Aprender a utilizar Canvas.",
        },
        {
          id: "d",
          texto: "Preparar el examen de ingreso.",
        },
      ],
      respuestaCorrecta: "a",
      explicacion:
        "La Práctica Profesional permite aplicar conocimientos y desarrollar competencias en una experiencia vinculada con el campo laboral.",
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
        "EFIP significa Examen Final Integrador Presencial y forma parte de las carreras de grado a distancia que contemplan esta instancia.",
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
        "¿Dónde se realizan habitualmente los parciales y finales virtuales?",
      opciones: [
        {
          id: "a",
          texto: "En Canvas.",
        },
        {
          id: "b",
          texto: "En La Nube.",
        },
        {
          id: "c",
          texto: "En SOE o Klarway.",
        },
        {
          id: "d",
          texto: "En ComunidadNET.",
        },
      ],
      respuestaCorrecta: "c",
      explicacion:
        "Los parciales y finales virtuales se realizan habitualmente mediante SOE o Klarway, según la instancia correspondiente.",
    },
  ],

  Aproximación: [
    {
      id: "ap-1",
      tipo: "aproximacion",
      pregunta:
        "¿Cuántos días tenés para aprobar una correlativa anterior y mantener la promoción?",
      respuestaCorrecta: 60,
      unidad: "días",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "El plazo indicado para aprobar la correlativa anterior y conservar la promoción es de 60 días.",
    },
    {
      id: "ap-2",
      tipo: "aproximacion",
      pregunta: "¿Cuántas horas comprende la Práctica Profesional?",
      respuestaCorrecta: 250,
      unidad: "horas",
      cantidadMinimaRespuestas: 2,
      explicacion: "La Práctica Profesional comprende un total de 250 horas.",
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
        "La instancia organizacional de Práctica Solidaria dura 12 semanas.",
    },
    {
      id: "ap-4",
      tipo: "aproximacion",
      pregunta: "¿Cuántas preguntas tiene un parcial de modalidad ED o EDH?",
      respuestaCorrecta: 20,
      unidad: "preguntas",
      cantidadMinimaRespuestas: 2,
      explicacion: "Un parcial de modalidad ED o EDH tiene 20 preguntas.",
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
        "Un examen integrador de modalidad ED o EDH tiene 30 preguntas.",
    },
    {
      id: "ap-6",
      tipo: "aproximacion",
      pregunta: "¿Cuántos módulos abarca un examen integrador?",
      respuestaCorrecta: 4,
      unidad: "módulos",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "El examen integrador abarca los cuatro módulos de la materia.",
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
        "Las materias programáticas suelen incluir cuatro trabajos prácticos.",
    },
    {
      id: "ap-8",
      tipo: "aproximacion",
      pregunta: "¿Cuántos parciales se rinden normalmente durante una materia?",
      respuestaCorrecta: 2,
      unidad: "parciales",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "Durante el cursado de una materia normalmente se rinden dos parciales.",
    },
    {
      id: "ap-9",
      tipo: "aproximacion",
      pregunta: "¿Cuánto dura normalmente un parcial virtual?",
      respuestaCorrecta: 40,
      unidad: "minutos",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "La duración habitual de un parcial virtual es de 40 minutos.",
    },
    {
      id: "ap-10",
      tipo: "aproximacion",
      pregunta: "¿Cuánto dura normalmente un examen integrador virtual?",
      respuestaCorrecta: 60,
      unidad: "minutos",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "La duración habitual de un examen integrador virtual es de 60 minutos.",
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
        "Una materia regular cuenta normalmente con hasta tres oportunidades para rendir su examen final.",
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
        "La regularidad de una materia suele mantenerse durante 18 meses.",
    },
    {
      id: "ap-13",
      tipo: "aproximacion",
      pregunta:
        "¿Hasta cuántas materias extra pueden realizarse durante un año?",
      respuestaCorrecta: 9,
      unidad: "materias",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "Durante el año pueden realizarse hasta nueve materias extra.",
    },
    {
      id: "ap-14",
      tipo: "aproximacion",
      pregunta:
        "¿Cuántos créditos electivos requieren normalmente las carreras de grado, excepto los planes que establecen otra cantidad?",
      respuestaCorrecta: 8,
      unidad: "créditos",
      cantidadMinimaRespuestas: 2,
      explicacion:
        "Las carreras de grado requieren normalmente ocho créditos electivos, salvo que el plan de estudios indique otra cantidad.",
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
      id: "cm-9",
      tipo: "carrera-misteriosa",
      pregunta: "¿De qué carrera se trata?",
      pistas: [
        "Diseño y construyo soluciones digitales.",
        "Trabajo con programación y arquitectura tecnológica.",
        "Puedo desarrollar sistemas que utilicen miles de personas.",
      ],
      respuestasAceptadas: [
        "ingeniería en software",
        "ingenieria en software",
        "software",
      ],
      respuestaCorrecta: "Ingeniería en Software",
      explicacion:
        "Ingeniería en Software se ocupa del diseño, desarrollo y mantenimiento de sistemas y aplicaciones.",
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
      pregunta: "Nombrá tres carreras relacionadas con la tecnología.",
      validacion: "manual",
      explicacion:
        "Algunas opciones son Ingeniería en Software, Ciencia de Datos, Inteligencia Artificial y Robótica y Seguridad Informática.",
    },
    {
      id: "dr-2",
      tipo: "desafio-rapido",
      pregunta:
        "Nombrá tres carreras en las que sea importante saber comunicarse bien.",
      validacion: "manual",
      explicacion:
        "La comunicación es transversal a muchas profesiones. Lo importante es poder explicar por qué resulta relevante en las carreras elegidas.",
    },
    {
      id: "dr-3",
      tipo: "desafio-rapido",
      pregunta:
        "Nombrá tres profesiones que puedan trabajar dentro de una empresa.",
      validacion: "manual",
      explicacion:
        "Una empresa puede integrar profesionales de administración, contabilidad, recursos humanos, marketing, tecnología y muchas otras áreas.",
    },
    {
      id: "dr-4",
      tipo: "desafio-rapido",
      pregunta:
        "Nombrá tres carreras relacionadas con la justicia o la seguridad.",
      validacion: "manual",
      explicacion:
        "Algunas opciones son Abogacía, Criminología y Seguridad e Investigación de la Escena del Crimen.",
    },
    {
      id: "dr-5",
      tipo: "desafio-rapido",
      pregunta:
        "Nombrá tres carreras en las que se trabaje habitualmente con números.",
      validacion: "manual",
      explicacion:
        "Algunas opciones son Contador Público, Finanzas, Ciencia de Datos y Administración.",
    },
    {
      id: "dr-6",
      tipo: "desafio-rapido",
      pregunta:
        "Nombrá tres carreras que puedan generar un impacto positivo en la sociedad.",
      validacion: "manual",
      explicacion:
        "Todas las profesiones pueden generar impacto. El desafío consiste en elegir tres y explicar brevemente de qué manera podrían hacerlo.",
    },
    {
      id: "dr-7",
      tipo: "desafio-rapido",
      pregunta:
        "Elegí una carrera distinta a la tuya y explicá en diez segundos por qué podría interesarte.",
      validacion: "manual",
      explicacion:
        "El objetivo es descubrir afinidades y aspectos interesantes de una formación diferente.",
    },
    {
      id: "dr-8",
      tipo: "desafio-rapido",
      pregunta:
        "Describí tu carrera sin decir su nombre y hacé que el grupo la adivine.",
      validacion: "manual",
      explicacion:
        "Podés mencionar actividades, conocimientos, ámbitos de trabajo o problemas que resuelve, pero no su nombre.",
    },
    {
      id: "dr-9",
      tipo: "desafio-rapido",
      pregunta:
        "Representá con mímica una profesión para que el grupo la descubra.",
      validacion: "manual",
      explicacion:
        "El desafío se completa cuando el grupo logra identificar la profesión representada.",
    },
    {
      id: "dr-10",
      tipo: "desafio-rapido",
      pregunta:
        "Buscá a una persona que estudie una carrera diferente y encuentren algo que ambas carreras tengan en común.",
      validacion: "manual",
      explicacion:
        "Carreras diferentes pueden compartir habilidades, herramientas, ámbitos de trabajo o problemas que ayudan a resolver.",
    },
    {
      id: "dr-11",
      tipo: "desafio-rapido",
      pregunta:
        "Nombrá tres cosas que no pueden faltar en la mochila o el escritorio de un estudiante.",
      validacion: "manual",
      explicacion:
        "No existe una única combinación correcta. El objetivo es compartir recursos, objetos o hábitos útiles para estudiar.",
    },
    {
      id: "dr-12",
      tipo: "desafio-rapido",
      pregunta: "Decí tres excusas típicas para postergar un trabajo práctico.",
      validacion: "manual",
      explicacion:
        "El desafío propone reconocer con humor algunas formas habituales de postergar tareas.",
    },
    {
      id: "dr-13",
      tipo: "desafio-rapido",
      pregunta: "Inventá un nombre de grupo de WhatsApp para tu curso.",
      validacion: "manual",
      explicacion:
        "El nombre puede relacionarse con la carrera, las materias, el grupo o alguna situación típica de estudiantes.",
    },
    {
      id: "dr-14",
      tipo: "desafio-rapido",
      pregunta:
        "Explicá qué es un parcial utilizando solamente cinco palabras.",
      validacion: "manual",
      explicacion:
        "La explicación debe tener exactamente cinco palabras y comunicar una idea comprensible.",
    },
    {
      id: "dr-15",
      tipo: "desafio-rapido",
      pregunta:
        "Mencioná tres estrategias para atravesar una semana con muchas entregas.",
      validacion: "manual",
      explicacion:
        "Algunas estrategias posibles son priorizar tareas, organizar horarios, dividir trabajos grandes y pedir ayuda cuando sea necesario.",
    },
    {
      id: "dr-16",
      tipo: "desafio-rapido",
      pregunta:
        "Presentate diciendo tu nombre, tu carrera y una habilidad inesperada que tengas.",
      validacion: "manual",
      explicacion:
        "El objetivo es presentarse de una manera breve y permitir que el grupo conozca algo diferente sobre cada participante.",
    },
  ],
};
