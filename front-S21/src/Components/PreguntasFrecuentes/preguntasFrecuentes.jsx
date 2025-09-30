import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

/**
 * Sección: Preguntas frecuentes (FAQ)
 * - Un solo archivo.
 * - Dos columnas en desktop, una en mobile.
 * - Acordeones con transición y flecha que rota.
 * - Textos provistos por Ariana.
 */
export default function PreguntasFrecuentes() {
  const faqs = [
    {
      q: "¿Dónde queda la Universidad?",
      a: (
        <div className="space-y-3">
          <p>
            La <strong>Universidad Siglo 21</strong> nació en{" "}
            <strong>Córdoba</strong>, donde se encuentra nuestra
            <strong> Sede Campus</strong> y también las sedes de{" "}
            <strong>Nueva Córdoba</strong> y <strong>Río Cuarto</strong>.
          </p>
          <p>
            Con el tiempo, nos expandimos hasta contar con más de{" "}
            <strong>320 Centros de Apoyo Universitario (CAU) </strong>
            en todo el país, que permiten acercar la universidad a cada
            estudiante.
          </p>
          <div>
            <p>
              En nuestra gestión acompañamos especialmente a quienes cursan en:
            </p>
            <ul className="list-none pl-2 mt-2 space-y-1">
              <li>
                📍 <strong>Olavarría</strong>
              </li>
              <li>
                📍 <strong>Tandil</strong>
              </li>
              <li>
                📍 <strong>Mar del Plata</strong>
              </li>
              <li>
                📍 <strong>Necochea</strong>
              </li>
              <li>
                📍 <strong>La Costa</strong>
              </li>
              <li>
                📍 <strong>Villa Gesell</strong>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      q: "¿Cuáles son los requisitos de inscripción? ¿Cómo me inscribo?",
      a: (
        <p>
          Para inscribirte es necesario haber{" "}
          <strong>finalizado el secundario</strong>.
        </p>
      ),
    },
    {
      q: "¿Qué formas de pago tiene la Universidad?",
      a: (
        <div className="space-y-3">
          <p>
            <strong>
              Podés abonar los aranceles por cuatrimestre de cursado.
            </strong>{" "}
            Cada año está dividido en <strong>dos cuatrimestres</strong>, y se
            requiere una <strong>matrícula de inscripción</strong> por cada uno.
            Podés pagar el <strong>cuatrimestre completo</strong> o hacerlo de
            manera <strong>bimestral</strong>.
          </p>
          <p>
            Podés pagar en <strong>cuotas</strong> a través de diferentes
            opciones como <strong>tarjetas de crédito</strong> y otros medios de{" "}
            <strong>financiación</strong>, dependiendo de la entidad bancaria o
            plataforma que elijas.
          </p>
        </div>
      ),
    },
    {
      q: "¿Qué validez tienen los títulos?",
      a: (
        <p>
          <strong>
            Todos los títulos de Universidad Siglo 21 son oficiales y cuentan
            con validez nacional
          </strong>
          . Están acreditados por la <strong>Secretaría de Educación</strong>,
          lo que garantiza que tu formación cumple con los estándares
          académicos. Esto significa que tu título es reconocido en todo el
          país, abriendo puertas a oportunidades tanto en el ámbito laboral como
          en la continuación de estudios.
        </p>
      ),
    },
    {
      q: "¿Toman equivalencias de otras universidades?",
      a: (
        <p>
          Sí. En Universidad Siglo 21 <strong>reconocemos equivalencias</strong>{" "}
          de numerosas universidades e instituciones educativas.
        </p>
      ),
    },
    {
      q: "¿Otorgan becas?",
      a: (
        <div className="space-y-3">
          <p>
            Sí, ofrecemos diversas opciones de becas para estudiantes con{" "}
            <strong>
              alto rendimiento académico, mejor promedio de secundaria
            </strong>{" "}
            y para quienes enfrentan{" "}
            <strong>dificultades socioeconómicas.</strong> Creemos en tu
            potencial y te acompañamos para que sigas creciendo.
          </p>
          <p>
            Además, contamos con beneficios, promociones y diferentes opciones
            de pago.
          </p>
        </div>
      ),
    },
    {
      q: "¿Tengo que hacer curso de nivelación?",
      a: (
        <p>
          No deberás realizar un curso de nivelación, aunque contamos con
          <strong>Universitarios 21</strong>, un programa diseñado para ingresantes de carreras
          de Grado o Pregrado. Este espacio te ayudará a prepararte para
          transitar el <strong>primer trayecto de tu carrera.</strong>
        </p>
      ),
    },
  ];

  // control individual por ítem (permite abrir varios a la vez, como en el screenshot)
  const [open, setOpen] = useState(() => faqs.map(() => false));
  const toggle = (i) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section className="w-full bg-white flex flex-col items-center justify-center px-4 py-[40px]">
      <h2 className="text-[48px] mq980:text-[38px] font-bold text-verdeoscuro text-center mb-8 leading-[1]">
        Preguntas frecuentes
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-6xl mq980:grid-cols-1">
        {faqs.map((item, i) => (
          <div key={i} className="bg-grisclaro rounded-xl px-4 py-2">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={open[i] ? "true" : "false"}
              className="w-full flex items-center text-left px-5"
            >
              <span className="text-[22px] text-verde font-semibold flex-1 py-3 leading-[1.1]">
                {item.q}
              </span>
              <IoIosArrowDown
                className={`transition-transform duration-300 text-verde ${
                  open[i] ? "rotate-180" : ""
                }`}
                size={28}
                aria-hidden="true"
              />
            </button>

            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
                open[i] ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-4 pt-1 text-grisoscuro leading-relaxed">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
