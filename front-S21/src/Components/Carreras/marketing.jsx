// import React, { useState } from "react";

// export const Agro = () => {

//         const [agroIsOpen, setAgroIsOpen] = useState(false);
      
//         const agroToggleDropdown = () => {
//           setAgroIsOpen(!agroIsOpen);
//         };
      
//         const agroCloseDropdown = () => {
//           setAgroIsOpen(false);
//         };

//     return (
//         <div className={`${agroIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
//             <button
//                 type="button"
//                 className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
//                 onClick={agroToggleDropdown}
//                 aria-expanded={agroIsOpen ? 'true' : 'false'}
//             >
//                 <div className="mr-[8px] flex items-end">
//                 <i class="fa-solid fa-tractor fa-xl" style={{ color: '#006C5B' }}></i>
//                 </div>
//                 Sustentabilidad y Agro
//                 <svg
//                     className={`-mr-1 ml-12 h-5 w-5 ${agroIsOpen ? 'transform rotate-180' : ''}`}
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     aria-hidden="true"
//                     >
//                     <path
//                         fillRule="evenodd"
//                         d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             </button>

//             {agroIsOpen && (
//                 <div
//                 className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
//                 role="menu"
//                 aria-orientation="vertical"
//                 >
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={agroCloseDropdown}
//                 >
//                     Licenciatura en Higiene, Seguridad y Medio Ambiente del Trabajo
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={agroCloseDropdown}
//                 >
//                     Licenciatura en Ambiente y Energías Renovables
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={agroCloseDropdown}
//                 >
//                     Licenciatura en Administración Agraria
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={agroCloseDropdown}
//                 >
//                     Licenciatura en Gestión Ambiental
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={ingenieriaCloseDropdown}
//                 >
//                     Tecnicatura en Higiene y Seguridad Laboral
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={agroCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Hidrocarburos y Geociencia
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={agroCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Gestión y Auditorías Ambientales
//                 </a>
//                 </div>
//             )}
//         </div> 
//     )
// }

import React, { useState } from "react";
import marketingimage from "../../assets/marketing.png"; // Asegúrate de tener la imagen

export const Marketing = () => {
    const [marketingIsOpen, setMarketingIsOpen] = useState(false);

    const toggleDropdown = () => {
        setMarketingIsOpen(!marketingIsOpen);
    };

    const carreras = [
        { nombre: "Licenciatura en Comercialización (Marketing)", nueva: false },
        { nombre: "Licenciatura en Comercio Internacional", nueva: false },
        { nombre: "Licenciatura en Publicidad", nueva: false },
        { nombre: "Licenciatura en Periodismo", nueva: false },
        { nombre: "Licenciatura en Relaciones Públicas e Institucionales", nueva: false },
        { nombre: "Tecnicatura en Dir. de Protocolo, Org. de Eventos y RRPP", nueva: false },
        { nombre: "Tecnicatura en Dirección equipos de venta", nueva: false },
        { nombre: "Tecnicatura en Marketing y Publicidad Digital", nueva: false },
        { nombre: "Especialización en Marketing y Dirección Comercial", nueva: false },
        { nombre: "Especialización en Negocios Internacionales", nueva: false },
    ];

    return (
        // <div
        //     onClick={toggleDropdown}
        //     className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-blanco rounded-md m-1 mb-4 px-3 py-5`}
        // >
        //     <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        //         <div className="mr-[8px] flex items-center">
        //             <img src={marketingimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Marketing" />
        //         </div>
        //         Marketing y comunicación
        //     </div>

        //     {marketingIsOpen && (
        //         <div className="relative w-[95%] rounded-md bg-transparent mt-2">
        //             {carreras.map((carrera, index) => (
        //                 <div
        //                     key={index}
        //                     className="block px-10 py-2 text-[18px] text-grisoscuro font-semibold"
        //                 >
        //                     {carrera.nombre}
        //                     {carrera.nueva && (
        //                         <span className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">
        //                             Nueva carrera
        //                         </span>
        //                     )}
        //                 </div>
        //             ))}
        //         </div>
        //     )}
        // </div>

        <div
    onClick={toggleDropdown}
    className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-blanco rounded-md m-1 mb-4 px-3 py-5`}
>
    <div className="font-bold flex justify-start mq980:text-center items-center text-[28px] text-grisoscuro mq980:flex-col">
        <div className="mr-[8px] flex items-center">
            <img src={marketingimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Marketing" />
        </div>
        Marketing y comunicación
    </div>

    <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            marketingIsOpen ? "max-h-[350px]" : "max-h-0"
        }`}
    >
        <div className="relative w-[95%] rounded-md bg-transparent mt-2 overflow-y-auto max-h-[350px]">
            {carreras.map((carrera, index) => (
                <div
                    key={index}
                    className="block px-10 py-2 text-[18px] text-grisoscuro font-semibold"
                >
                    {carrera.nombre}
                    {carrera.nueva && (
                        <span className="ml-2 bg-verde rounded-md w-auto text-white text-[10px] font-semibold py-1 px-2 inline-block">
                            Nueva carrera
                        </span>
                    )}
                </div>
            ))}
        </div>
    </div>
</div>

    );
};
