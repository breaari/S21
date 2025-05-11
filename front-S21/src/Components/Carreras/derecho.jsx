// import React, { useState } from "react";

// export const Derecho = () => {

//         const [derechoIsOpen, setDerechoIsOpen] = useState(false);
      
//         const derechoToggleDropdown = () => {
//           setDerechoIsOpen(!derechoIsOpen);
//         };
      
//         const derechoCloseDropdown = () => {
//           setDerechoIsOpen(false);
//         };

//     return (
//         <div className={`${derechoIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
//             <button
//                 type="button"
//                 className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
//                 onClick={derechoToggleDropdown}
//                 aria-expanded={derechoIsOpen ? 'true' : 'false'}
//             >
//                 <div className="mr-[5px] flex items-end">
//                 <i class="fa-solid fa-gavel fa-2x" style={{ color: '#006C5B' }}></i>
//                 </div>
//                 Derecho y Ciencias Sociales  
//                 <svg
//                     className={`-mr-1 ml-2 h-5 w-5 ${derechoIsOpen ? 'transform rotate-180' : ''}`}
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

//             {derechoIsOpen && (
//                 <div
//                 className="relative w-[300px] rounded-md bg-transparent mq980:max-h-[15000px] mq980:overflow-hidden max-h-[350px] overflow-y-auto  dropdown-menu"
//                 role="menu"
//                 aria-orientation="vertical"
//                 >
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Licenciatura en Criminología Y Seguridad
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                    // onClick={derechoCloseDropdown}
//                 >
//                     Licenciatura en Ciencia Política y Gobierno
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Licenciatura en Administración Pública
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Licenciatura en Relaciones Internacionales
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Abogacía
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={agroCloseDropdown}
//                 >
//                     Licenciatura en Antropología Organizacional
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Escribanía
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Martillero, Corredor Público y Corredor Inmobiliario
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Procurador
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Administración y Gestión de Políticas Públicas
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={derechoCloseDropdown}
//                 >
//                     Tecnicatura en Investigación de la Escena del Crimen
//                 </a>
                
//                 </div>
//             )}
//         </div> 
//     )
// }

import React, { useState } from "react";
import derechoimage from "../../assets/derecho.png";

export const Derecho = () => {
    const [derechoIsOpen, setDerechoIsOpen] = useState(false);

    const toggleDropdown = () => {
        setDerechoIsOpen(!derechoIsOpen);
    };

    const carreras = [
        // { nombre: "Licenciatura en Criminología y Seguridad", nueva: false },
        // { nombre: "Licenciatura en Ciencia Política y Gobierno", nueva: false },
        // { nombre: "Licenciatura en Administración Pública", nueva: false },
        // { nombre: "Licenciatura en Relaciones Internacionales", nueva: false },
        { nombre: "Abogacía", nueva: false },
        { nombre: "Procurador", nueva: false },    
        // { nombre: "Licenciatura en Antropología Organizacional", nueva: false },
        { nombre: "Escribanía", nueva: false },
        { nombre: "Martillero, Corredor Público y Corredor Inmobiliario", nueva: false },

        { nombre: "Contador Público", nueva: false },
        { nombre: "Actuario", nueva: false },
        { nombre: "Maestría en Derecho Internacional", nueva: false },
        { nombre: "Maestría en Derecho Procesal", nueva: false },
        { nombre: "Esp. en Derecho de Familia, Niñez y Adolescencia", nueva: false },
        // { nombre: "Martillero, Corredor Público y Corredor Inmobiliario", nueva: false },
        // { nombre: "Procurador", nueva: false },
        // {
        //     nombre: "Tecnicatura Universitaria en Administración y Gestión de Políticas Públicas",
        //     nueva: false,
        // },
        // { nombre: "Tecnicatura en Investigación de la Escena del Crimen", nueva: false },
    ];

    return (
        // <div
        //     onClick={toggleDropdown}
        //     className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-blanco rounded-md m-1 mb-4 px-3 py-5`}
        // >
        //     <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        //         <div className="mr-[8px] flex items-center">
        //             <img src={derechoimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Derecho" />
        //         </div>
        //         Derecho
        //     </div>

        //     {derechoIsOpen && (
        //         <div className="relative w-[95%] rounded-md bg-transparent max-h-[350px] overflow-y-auto  mt-2">
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
    className="cursor-pointer transition-all duration-300 overflow-hidden w-full bg-blanco rounded-md m-1 mb-4 px-3 py-5"
>
    <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        <div className="mr-[8px] flex items-center">
            <img src={derechoimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Derecho" />
        </div>
        Derecho
    </div>

    <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-y-auto ${
            derechoIsOpen ? "max-h-[350px]" : "max-h-0"
        }`}
    >
        <div className="relative w-[95%] rounded-md bg-transparent mt-2 max-h-[350px]">
            {carreras.map((carrera, index) => (
                <div
                    key={index}
                    className="block px-10 py-2 text-[18px] text-grisoscuro font-semibold"
                >
                    {carrera.nombre}
                    {carrera.nueva && (
                        <span className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">
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
