import React, { useState } from "react";

export const Diseño = () => {

        const [diseñoIsOpen, setDiseñoIsOpen] = useState(false);
      
        const diseñoToggleDropdown = () => {
          setDiseñoIsOpen(!diseñoIsOpen);
        };
      
        const diseñoCloseDropdown = () => {
          setDiseñoIsOpen(false);
        };

    return (
        <div className="shadow-md w-[320px] bg-blanco p-2 rounded-[10px] m-1">
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={diseñoToggleDropdown}
                aria-expanded={diseñoIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[5px] flex items-end">
                <box-icon name='pen' type='solid' color='#006C5B' size='40px'></box-icon>
                </div>
                Diseño y Comunicación  
                <svg
                    className={`mr-2 ml-[46px] h-5 w-5 ${diseñoIsOpen ? 'transform rotate-180' : ''}`}
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

            {diseñoIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    onClick={diseñoCloseDropdown}
                >
                    Licenciatura En Relaciones Públicas E Institucionales
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={diseñoCloseDropdown}
                >
                    Licenciatura En Periodismo
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={diseñoCloseDropdown}
                >
                    Licenciatura En Diseño Y Animación Digital
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={diseñoCloseDropdown}
                >
                    Tecnicatura Universitaria En Gestión De Moda
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={diseñoCloseDropdown}
                >
                    Tecnicatura Universitaria En Diseño Y Animación Digital
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={diseñoCloseDropdown}
                >
                    Tecnicatura En Dirección De Protocolo, Organización De Eventos Y Relaciones Públicas
                </a>
                
                </div>
            )}
        </div> 
    )
}