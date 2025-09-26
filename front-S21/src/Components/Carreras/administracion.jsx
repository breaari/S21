import React, { useState } from "react";
import administracionimage from "../../assets/administracion.png";

export const Administracion = () => {
    const [administracionIsOpen, setAdministracionIsOpen] = useState(false);

    const toggleDropdown = () => {
        setAdministracionIsOpen(!administracionIsOpen);
    };

    const carreras = [
        { nombre: "Licenciatura en Negocios Agroecológicos", nueva: true },
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
        { nombre: "Especialización en Gestión de Energías Renovables", nueva: true },
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
