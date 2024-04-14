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
        <div className="shadow-md w-[320px] bg-blanco p-2 rounded-[10px] m-1">
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={saludToggleDropdown}
                aria-expanded={saludIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[5px] flex items-end">
                <box-icon type='solid' name='donate-heart' color='#006C5B' size='40px'></box-icon>
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
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    onClick={saludCloseDropdown}
                >
                    Licenciatura en Gerontología
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={saludCloseDropdown}
                >
                    Licenciatura en Administración de Servicios de Salud
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={saludCloseDropdown}
                >
                    Licenciatura En Terapia Ocupacional Y Desarrollo Humano
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={saludCloseDropdown}
                >
                    Tecnicatura Universitaria En Gestión Administrativa De Servicios De Salud
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={saludCloseDropdown}
                >
                    Tecnicatura Universitaria en Promoción Comunitaria en Niñez y Adolescencia 
                </a>
                
                </div>
            )}
        </div> 
    )
}