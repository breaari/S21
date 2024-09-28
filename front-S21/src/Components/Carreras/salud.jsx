import React, { useState } from "react";

export const Salud = () => {

        const [saludIsOpen, setSaludIsOpen] = useState(false);
      
        const saludToggleDropdown = () => {
          setSaludIsOpen(!saludIsOpen);
        };
      
        const saludCloseDropdown = () => {
          setSaludIsOpen(false);
        };

    return (
        <div className={`${saludIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={saludToggleDropdown}
                aria-expanded={saludIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[8px] flex items-center">
                <i class="fa-solid fa-heart-pulse fa-2x" style={{ color: '#006C5B' }}></i>
                
                </div>
                Salud
                <svg
                    className={` -mr-1 ml-[185px] h-5 w-5 ${saludIsOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>

            </button>

            {saludIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    //onClick={educacionCloseDropdown}
                >
                    {`Licenciatura en Fonoaudiología (PD)`}
                    <a className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">Nueva carrera</a>
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    //onClick={educacionCloseDropdown}
                >
                    {`Licenciatura en Nutrición (PD)`}
                    <a className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">Nueva carrera</a>
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    //onClick={saludCloseDropdown}
                >
                    Licenciatura en Gerontología
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={saludCloseDropdown}
                >
                    Licenciatura en Administración de Servicios de Salud
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={saludCloseDropdown}
                >
                    Licenciatura en Terapia Ocupacional y Desarrollo Humano
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    //onClick={educacionCloseDropdown}
                >
                    {`Tecnicatura en Enfermería (PD)`}
                    <a className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">Nueva carrera</a>
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={saludCloseDropdown}
                >
                    Tecnicatura Universitaria en Gestión Administrativa de Servicios de Salud
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={saludCloseDropdown}
                >
                    Tecnicatura Universitaria en Promoción Comunitaria en Niñez y Adolescencia 
                </a>
                
                </div>
            )}
        </div> 
    )
}