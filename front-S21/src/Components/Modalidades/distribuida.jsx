// import React, { useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";

// export const Distribuida = () => {
//   const [distribuidaIsOpen, setDistribuidaIsOpen] = useState(false);

//   const distribuidaToggleDropdown = () => {
//     setDistribuidaIsOpen(!distribuidaIsOpen);
//   };

//   return (
//     <div className="w-full bg-white py-4 px-2 rounded-md mq980:mb-4">
//       <button
//         type="button"
//         className="font-medium flex justify-between items-center text-[22px] text-verde px-3 w-full"
//         onClick={distribuidaToggleDropdown}
//         aria-expanded={distribuidaIsOpen ? 'true' : 'false'}
//       >
//         <span className="font-lexend font-light">Educación Distribuida</span>
//         <IoIosArrowDown className="ml-auto" />
//       </button>
    
//     {distribuidaIsOpen && (
//         <div className="w-[95%] rounded-md bg-transparent mt-2">
//             <a className="block px-10 py-2 text-sm" role="menuitem">    
//                 <ul className="list-inside list-disc text-grisoscuro">
//                     <li>Estudiá de manera <strong>online</strong>, adaptando el cursado a tus necesidades.</li>
//                     <li >Asistí a <strong>4 encuentros presenciales</strong> OPEN CLASS por materia, cada 15 días en tu <strong>Centro de Apoyo Universitario (CAU)</strong> y el resto cursalo a través de la <strong>Plataforma Multimedia</strong> con el respaldo de un <strong>profesor</strong>.</li>
//                     <li >Viví diferentes instancias en el recorrido de tus materias:</li>
//                     <li ><strong>SAM CLASS:</strong> desarrollá consignas prácticas para trabajar con tus compañeros y el tutor dinamizador.</li>
//                     <li ><strong>EVA 21:</strong> instancia en donde presentarás un trabajo práctico con el apoyo de un tutor dinamizador.</li>
//                     <li><strong>EXPERIENCIAS 21:</strong> etapa de aprendizaje diferencial donde buscamos sumar valor a tu perfil profesional llenándolo de experiencias que lo enriquezcan.</li>
//                 </ul>
//             </a>
//         </div>
//     )}

//     </div>
//   );
// };

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Distribuida = () => {
  const [distribuidaIsOpen, setDistribuidaIsOpen] = useState(false);

  const distribuidaToggleDropdown = () => {
    setDistribuidaIsOpen(!distribuidaIsOpen);
  };

  return (
    <div className="w-full bg-white py-4 px-2 rounded-md mq980:mb-4 m-1 mq980:m-0">
      <button
        type="button"
        className="font-medium flex justify-between items-center text-[22px] text-verde px-3 w-full"
        onClick={distribuidaToggleDropdown}
        aria-expanded={distribuidaIsOpen ? 'true' : 'false'}
      >
        <span className="font-lexend font-light">Educación Distribuida</span>
        <IoIosArrowDown className="ml-auto" />
      </button>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          distribuidaIsOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="w-[95%] rounded-md bg-transparent mt-2">
          <a className="block px-10 py-2 text-sm" role="menuitem">
            <ul className="list-inside list-disc text-grisoscuro">
              <li>
                Estudiá de manera <strong>online</strong>, adaptando el cursado a
                tus necesidades.
              </li>
              <li>
                Asistí a <strong>4 encuentros presenciales</strong> OPEN CLASS por
                materia, cada 15 días en tu{" "}
                <strong>Centro de Apoyo Universitario (CAU)</strong> y el resto
                cursalo a través de la{" "}
                <strong>Plataforma Multimedia</strong> con el respaldo de un{" "}
                <strong>profesor</strong>.
              </li>
              <li>Viví diferentes instancias en el recorrido de tus materias:</li>
              <li>
                <strong>SAM CLASS:</strong> desarrollá consignas prácticas para
                trabajar con tus compañeros y el tutor dinamizador.
              </li>
              <li>
                <strong>EVA 21:</strong> instancia en donde presentarás un trabajo
                práctico con el apoyo de un tutor dinamizador.
              </li>
              <li>
                <strong>EXPERIENCIAS 21:</strong> etapa de aprendizaje diferencial
                donde buscamos sumar valor a tu perfil profesional llenándolo de
                experiencias que lo enriquezcan.
              </li>
            </ul>
          </a>
        </div>
      </div>
    </div>
  );
};
