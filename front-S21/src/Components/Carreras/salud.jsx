// import React, { useState } from "react";
// import saludimage from "../../assets/salud.png"

// export const Salud = () => {

//         const [saludIsOpen, setSaludIsOpen] = useState(false);
      
//         const saludToggleDropdown = () => {
//           setSaludIsOpen(!saludIsOpen);
//         };
      
//         const saludCloseDropdown = () => {
//           setSaludIsOpen(false);
//         };

//     return (
//         <div className={`${saludIsOpen ? 'h-auto' : 'h-[60px]'} w-[320px] bg-blanco rounded-md m-1 mb-4 px-3 py-5`}>
//             <button
//                 type="button"
//                 className="font-bold flex justify-center items-center text-[24px] text-grisoscuro dropdown-toggle"
//                 onClick={saludToggleDropdown}
//                 aria-expanded={saludIsOpen ? 'true' : 'false'}
//             >
//                 <div className="mr-[8px] flex items-center">
//                 <img src={saludimage} className="w-[40px]"></img>
                
//                 </div>
//                 Salud
//             </button>

//             {saludIsOpen && (
//                 <div
//                 className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
//                 role="menu"
//                 aria-orientation="vertical"
//                 >
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={educacionCloseDropdown}
//                 >
//                     {`Licenciatura en Fonoaudiología (PD)`}
//                     <a className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">Nueva carrera</a>
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={educacionCloseDropdown}
//                 >
//                     {`Licenciatura en Nutrición (PD)`}
//                     <a className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">Nueva carrera</a>
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={saludCloseDropdown}
//                 >
//                     Licenciatura en Gerontología
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={saludCloseDropdown}
//                 >
//                     Licenciatura en Administración de Servicios de Salud
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={saludCloseDropdown}
//                 >
//                     Licenciatura en Terapia Ocupacional y Desarrollo Humano
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={educacionCloseDropdown}
//                 >
//                     {`Tecnicatura en Enfermería (PD)`}
//                     <a className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">Nueva carrera</a>
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={saludCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Gestión Administrativa de Servicios de Salud
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={saludCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Promoción Comunitaria en Niñez y Adolescencia 
//                 </a>
                
//                 </div>
//             )}
//         </div> 
//     )
// }

import React, { useState } from "react";
import saludimage from "../../assets/salud.png";

export const Salud = () => {
    const [saludIsOpen, setSaludIsOpen] = useState(false);

    const toggleDropdown = () => {
        setSaludIsOpen(!saludIsOpen);
    };

    const carreras = [
        { nombre: "Licenciatura en Fonoaudiología (PD)", nueva: true },
        { nombre: "Licenciatura en Psicología (PD)", nueva: true },
        { nombre: "Licenciatura en Nutrición (PD)", nueva: true },
        { nombre: "Tecnicatura en Enfermería (PD)", nueva: true },
        
        { nombre: "Licenciatura en Gerontología", nueva: false },
        { nombre: "Licenciatura en Administración de Servicios de Salud", nueva: false },
        { nombre: "Licenciatura en Terapia Ocupacional y Desarrollo Humano", nueva: false },
        { nombre: "Lic. en Higiene, Seguridad y Medio Ambiente del Trabajo", nueva: false },
        { nombre: "Tec. en Higiene y Seguridad Laboral", nueva: false },
        { nombre: "Tec. en Gestión Administrativa de Servicios de Salud", nueva: false },

     
        // { nombre: "Tecnicatura Universitaria en Gestión Administrativa de Servicios de Salud", nueva: false },
        // { nombre: "Licenciatura en Bioinformática", nueva: false },
    ];

    return (
        // <div
        //     onClick={toggleDropdown}
        //     className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-blanco rounded-md m-1 mb-4 px-3 py-5`}
        // >
        //     <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        //         <div className="mr-[8px] flex items-center">
        //             <img src={saludimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Salud" />
        //         </div>
        //         Salud
        //     </div>

        //     {saludIsOpen && (
        //         <div className="relative w-[95%] rounded-md bg-transparent  mt-2">
        //             {carreras.map((carrera, index) => (
        //                 <div
        //                     key={index}
        //                     className="block px-10 py-2 text-[18px] text-grisoscuro font-semibold"
        //                 >
        //                     {carrera.nombre}
        //                     {carrera.nueva && (
        //                         <span className="ml-2 bg-verde rounded-md w-auto text-white text-[10px] font-semibold py-1 px-2 inline-block">
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
            <img src={saludimage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Salud" />
        </div>
        Salud
    </div>

    <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            saludIsOpen ? "max-h-[350px]" : "max-h-0"
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
