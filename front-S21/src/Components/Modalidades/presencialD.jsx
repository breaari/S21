// import React, { useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";

// export const PresencialD = () => {
//   const [presencialDIsOpen, setPresencialDIsOpen] = useState(false);

//   const presencialDToggleDropdown = () => {
//     setPresencialDIsOpen(!presencialDIsOpen);
//   };

//   return (
//     <div className="w-[600px] mq980:w-full bg-white py-4 px-2 rounded-md mq980:mb-4">
//         <button
//             type="button"
//             className="font-medium flex justify-between items-center text-[22px] text-verde px-3 w-full"
//             onClick={presencialDToggleDropdown}
//             aria-expanded={presencialDIsOpen ? 'true' : 'false'}
//         >
//             <span className="font-lexend font-light flex-grow text-center mq980:text-start">Presencial Distribuida</span>
//             <span className="ml-auto text-right">{/* Aquí va tu fecha */}</span>
//             <IoIosArrowDown className="ml-2" />
//         </button>


//       {presencialDIsOpen && (
//         <div className="w-[95%] rounded-md bg-transparent mt-2">
//           <a className="block px-10 py-2 text-sm" role="menuitem">
//             <ul className="list-inside list-disc text-grisoscuro">
//               <li><strong>Cursá como en el Campus, desde donde estés y con holografía.</strong></li>
//               <li>Accedé a clases presenciales en tiempo real con tus docentes y compañeros/as, en los principales CAU del país: <strong>La Plata, Mar del Plata, Villa María, Mendoza, Salta, Rosario, Tucumán y Neuquén. Además de la Sede de Río Cuarto y desde el Centro Universitario Buenos Aires.</strong></li>
//               <li>Estudiá con tecnología innovadora cerca tuyo:</li>
//               <ul className="list-inside list-disc pl-6">
//                 <li><strong>Metodologías innovadoras</strong></li>
//                 <li><strong>Didácticas avanzadas</strong></li>
//                 <li><strong>Aprendizaje basado en simulación (ABSimulación)</strong></li>
//                 <li><strong>Herramientas de IA</strong></li>
//                 <li><strong>Experiencias inmersivas con Metaverso o RA</strong></li>
//               </ul>
//             </ul>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const PresencialD = () => {
  const [presencialDIsOpen, setPresencialDIsOpen] = useState(false);

  const presencialDToggleDropdown = () => {
    setPresencialDIsOpen(!presencialDIsOpen);
  };

  return (
    <div className="w-[600px] mq980:w-full bg-white py-4 px-2 rounded-md mq980:mb-4 m-1 mq980:m-0">
      <button
        type="button"
        className="font-medium flex justify-between items-center text-[22px] text-verde px-3 w-full"
        onClick={presencialDToggleDropdown}
        aria-expanded={presencialDIsOpen ? 'true' : 'false'}
      >
        <span className="font-lexend font-light flex-grow text-center mq980:text-start">Presencial Distribuida</span>
        <span className="ml-auto text-right">{/* Aquí va tu fecha */}</span>
        <IoIosArrowDown className="ml-2" />
      </button>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          presencialDIsOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="w-[95%] rounded-md bg-transparent mt-2">
          <a className="block px-10 py-2 text-sm" role="menuitem">
            <ul className="list-inside list-disc text-grisoscuro">
              <li><strong>Cursá como en el Campus, desde donde estés y con holografía.</strong></li>
              <li>Accedé a clases presenciales en tiempo real con tus docentes y compañeros/as, en los principales CAU del país: <strong>La Plata, Mar del Plata, Villa María, Mendoza, Salta, Rosario, Tucumán y Neuquén. Además de la Sede de Río Cuarto y desde el Centro Universitario Buenos Aires.</strong></li>
              <li>Estudiá con tecnología innovadora cerca tuyo:</li>
              <ul className="list-inside list-disc pl-6">
                <li><strong>Metodologías innovadoras</strong></li>
                <li><strong>Didácticas avanzadas</strong></li>
                <li><strong>Aprendizaje basado en simulación (ABSimulación)</strong></li>
                <li><strong>Herramientas de IA</strong></li>
                <li><strong>Experiencias inmersivas con Metaverso o RA</strong></li>
              </ul>
            </ul>
          </a>
        </div>
      </div>
    </div>
  );
};
