// import React, { useState } from "react";

// export const Finanzas = ({ isOpen, toggleDropdown }) => {

//         const [finanzasIsOpen, setFinanzasIsOpen] = useState(false);
      
//         const finanzasToggleDropdown = () => {
//           setFinanzasIsOpen(!finanzasIsOpen);
//         };
      
//         const finanzasCloseDropdown = () => {
//           setFinanzasIsOpen(false);
//         };

//     return (
//         <div className={`${finanzasIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
//             <button
//                 type="button"
//                 className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
//                 onClick={finanzasToggleDropdown}
//                 aria-expanded={finanzasIsOpen ? 'true' : 'false'}
//             >
//                 <div className="mr-[5px] flex items-end">
//                 <box-icon name='line-chart' color='#006C5B' size='40px'></box-icon>
//                 </div>
//                 Management y Finanzas
//                 <svg
//                     className={`-mr-1 ml-10 h-5 w-5 ${finanzasIsOpen ? 'transform rotate-180' : ''}`}
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

//             {finanzasIsOpen && (
//                 <div
//                 className="relative w-[300px] rounded-md bg-transparent mq980:max-h-[15000px] mq980:overflow-hidden max-h-[450px] overflow-y-auto  dropdown-menu"
//                 role="menu"
//                 aria-orientation="vertical"
//                 >
//                     <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Licenciatura en Finanzas
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Licenciatura en Administración
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Actuario
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Licenciatura en Gestión de Recursos Humanos
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                    Contador Público
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Licenciatura en Comercialización
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Licenciatura en Comercio Internacional
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Licenciatura en Logística Global
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Licenciatura en Emprendimiento (CCC)
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura en Gestión Contable E Impositiva
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura en Dirección de Equipos de Ventas
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura en Relaciones Laborales
//                 </a>
//                 <a
//                    // href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura en Gestión De Empresas Familiares
//                 </a>
                
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Gestión del Clima Laboral en la Organización
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura en Responsabilidad y Gestión Social
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Marketing y Publicidad Digital
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={finanzasCloseDropdown}
//                 >
//                     Tecnicatura en Administración y Gestión Tributaria
//                 </a>
//                 </div>
//             )}
//         </div> 
//     )
// }

import React, { useState } from "react";
import administracionimage from "../../assets/administracion.png";

export const Administracion = () => {
    const [administracionIsOpen, setAdministracionIsOpen] = useState(false);

    const toggleDropdown = () => {
        setAdministracionIsOpen(!administracionIsOpen);
    };

    const carreras = [
        { nombre: "Licenciatura en Administración", nueva: false },
        { nombre: "Licenciatura en Administración Agraria", nueva: false },
        { nombre: "Licenciatura en Administración de Infraestructura Tecnológica", nueva: false },
        { nombre: "Licenciatura en Administración Hotelera", nueva: false },
        { nombre: "Licenciatura en Administración Pública", nueva: false },
        { nombre: "Licenciatura en Finanzas", nueva: false },
        { nombre: "Licenciatura en Antropología Organizacional", nueva: false },
        { nombre: "Licenciatura en Gestión Ambiental", nueva: false },
        { nombre: "Licenciatura en Gestión de Recursos Humanos", nueva: false },
        { nombre: "Licenciatura en Gestión Turística", nueva: false },
        { nombre: "Licenciatura en Logística Global", nueva: false },
        { nombre: "Licenciatura en Emprendimiento (CCC)", nueva: false },
        { nombre: "Tecnicatura en Administración y Gestión Tributaria", nueva: false },
        { nombre: "Tecnicatura en Gestión de Empresas Familiares", nueva: false },
        { nombre: "Tecnicatura en Gestión de Moda", nueva: false },
        { nombre: "Tec. en Gestión de Recursos Turísticos", nueva: false },
        { nombre: "Tec. en Gestión y Auditorías Ambientales", nueva: false },
        { nombre: "Tec. en Gestión del Clima Laboral en la Organización", nueva: false },
        
        { nombre: "Tecnicatura en Administración y Gestión de Políticas Públicas", nueva: false },
        { nombre: "Tecnicatura en Gestión Contable e Impositiva", nueva: false },
        { nombre: "Especialización en Finanzas Corporativas y Mercado de Capitales", nueva: false },
        { nombre: "Especialización en Gestión y Gobierno de Empresas Familiares", nueva: false },
        { nombre: "Maestría en Administración de Empresas", nueva: false },
        { nombre: "Maestría en Adm. de Neg. y Ap. Tec. en la Empresa", nueva: false },
       
    ];

    return (
        // <div
        //     onClick={toggleDropdown}
        //     className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-blanco rounded-md m-1 mb-4 px-3 py-5`}
        // >
        //     <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        //         <div className="mr-[8px] flex items-center">
        //             <img src={administracionimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Administración" />
        //         </div>
        //         Administración
        //     </div>

        //     {administracionIsOpen && (
        //         <div className="relative w-[95%] rounded-md bg-transparent max-h-[350px] overflow-y-auto  mt-2">
        //             {carreras.map((carrera, index) => (
        //                 <div
        //                     key={index}
        //                     className="block px-10 py-2 text-[18px] text-grisoscuro font-semibold"
        //                 >
        //                     {carrera.nombre}
        //                     {carrera.nueva && (
        //                         <span className="ml-2 bg-verde rounded-md w-auto text-white text-[10px] font-semibold py-1 px-2">
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
        <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
            <div className="mr-[8px] flex items-center">
                <img src={administracionimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Administración" />
            </div>
            Administración
        </div>

        <div
            className={`transition-[max-height] duration-500 ease-in-out overflow-y-auto ${
                administracionIsOpen ? "max-h-[350px]" : "max-h-0"
            }`}
        >
            <div className="relative w-[95%] rounded-md bg-transparent mt-2">
                {carreras.map((carrera, index) => (
                    <div
                        key={index}
                        className="block px-10 py-2 text-[18px] text-grisoscuro font-semibold"
                    >
                        {carrera.nombre}
                        {carrera.nueva && (
                            <span className="ml-2 bg-verde rounded-md w-auto text-white text-[10px] font-semibold py-1 px-2">
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
