// import React, { useState } from "react";

// export const Turismo = () => {

//         const [turismoIsOpen, setTurismoIsOpen] = useState(false);
      
//         const turismoToggleDropdown = () => {
//           setTurismoIsOpen(!turismoIsOpen);
//         };
      
//         const turismoCloseDropdown = () => {
//           setTurismoIsOpen(false);
//         };

//     return (
//         <div className={`${turismoIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
//             <button
//                 type="button"
//                 className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
//                 onClick={turismoToggleDropdown}
//                 aria-expanded={turismoIsOpen ? 'true' : 'false'}
//             >
//                 <div className="mr-[5px] flex items-end">
//                 <box-icon type='solid' name='dish' color='#006C5B' size='40px'></box-icon>
//                 </div>
//                 Turismo y Hoteleria
//                 <svg
//                     className={`-mr-1 ml-[75px] h-5 w-5 ${turismoIsOpen ? 'transform rotate-180' : ''}`}
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

//             {turismoIsOpen && (
//                 <div
//                 className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
//                 role="menu"
//                 aria-orientation="vertical"
//                 >
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
//                     role="menuitem"
//                     //onClick={turismoCloseDropdown}
//                 >
//                     Licenciatura en Administración Hotelera
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={turismoCloseDropdown}
//                 >
//                     Licenciatura en Gestión Turística
//                 </a>
//                 <a
//                     //href="#"
//                     className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
//                     role="menuitem"
//                     //onClick={turismoCloseDropdown}
//                 >
//                     Tecnicatura Universitaria en Gestión de Recursos Turísticos
//                 </a>
                
//                 </div>
//             )}
//         </div> 
//     )
// }


import React, { useState } from "react";
import criminologiaImage from "../../assets/criminologia.png";

export const Criminologia = () => {
    const [criminologiaIsOpen, setCriminologiaIsOpen] = useState(false);

    const toggleDropdown = () => {
        setCriminologiaIsOpen(!criminologiaIsOpen);
    };

    const carreras = [
        { nombre: "Licenciatura en Criminología y Seguridad", nueva: false },
        { nombre: "Tecnicatura en Investigación de la Escena del Crimen", nueva: false },
        { nombre: "Especialización en Cibercrimen", nueva: false },
        // { nombre: "Licenciatura en Criminalística", nueva: false },
        // { nombre: "Licenciatura en Psicología Forense", nueva: false },

        // { nombre: "Tecnicatura en Ciencias Forenses", nueva: false },
        // { nombre: "Licenciatura en Derecho Penal", nueva: false },
        // { nombre: "Licenciatura en Seguridad Pública", nueva: false },
    ];

    return (
        // <div
        //     onClick={toggleDropdown}
        //     className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-blanco rounded-md m-1 mb-4 px-3 py-5`}
        // >
        //     <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        //         <div className="mr-[8px] flex items-center">
        //             <img src={criminologiaImage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Criminología" />
        //         </div>
        //         Criminología
        //     </div>

        //     {criminologiaIsOpen && (
        //         <div className="relative w-[95%] rounded-md bg-transparent max-h-[350px] overflow-y-auto  mt-2">
        //             {carreras.map((carrera, index) => (
        //                 <div
        //                     key={index}
        //                     className="block px-10 py-2 text-[18px]  text-grisoscuro font-semibold"
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
            className="cursor-pointer transition-all duration-300 w-full overflow-hidden bg-blanco rounded-md m-1 mb-4 px-3 py-5"
        >
            <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
                <div className="mr-[8px] flex items-center">
                    <img src={criminologiaImage} className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4" alt="Criminología" />
                </div>
                Criminología
            </div>

            <div
                className={`transition-[max-height] duration-500 ease-in-out overflow-y-auto ${
                    criminologiaIsOpen ? "max-h-[350px]" : "max-h-0"
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
