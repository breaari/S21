import React, { useState } from "react";

export const Derecho = () => {

        const [derechoIsOpen, setDerechoIsOpen] = useState(false);
      
        const derechoToggleDropdown = () => {
          setDerechoIsOpen(!derechoIsOpen);
        };
      
        const derechoCloseDropdown = () => {
          setDerechoIsOpen(false);
        };

    return (
        <div className={`${derechoIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={derechoToggleDropdown}
                aria-expanded={derechoIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[5px] flex items-end">
                <i class="fa-solid fa-gavel fa-2x" style={{ color: '#006C5B' }}></i>
                </div>
                Derecho y Ciencias Sociales  
                <svg
                    className={`-mr-1 ml-2 h-5 w-5 ${derechoIsOpen ? 'transform rotate-180' : ''}`}
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

            {derechoIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent mq980:max-h-[15000px] mq980:overflow-hidden max-h-[350px] overflow-y-auto  dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Licenciatura En Criminología Y Seguridad
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Licenciatura En Ciencia Política Y Gobierno
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Licenciatura En Administración Pública
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Licenciatura En Relaciones Internacionales
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Abogacía
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Escribanía
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Licenciatura En Publicidad
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Martillero, Corredor Público Y Corredor Inmobiliario
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Procurador
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Tecnicatura Universitaria En Administración Y Gestión De Políticas Públicas
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={derechoCloseDropdown}
                >
                    Tecnicatura En Investigación De La Escena Del Crimen
                </a>
                
                </div>
            )}
        </div> 
    )
}