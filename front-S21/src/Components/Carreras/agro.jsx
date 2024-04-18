import React, { useState } from "react";

export const Agro = () => {

        const [agroIsOpen, setAgroIsOpen] = useState(false);
      
        const agroToggleDropdown = () => {
          setAgroIsOpen(!agroIsOpen);
        };
      
        const agroCloseDropdown = () => {
          setAgroIsOpen(false);
        };

    return (
        <div className="shadow-md w-[320px] bg-blanco p-2 rounded-[10px] m-1 mb-4">
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={agroToggleDropdown}
                aria-expanded={agroIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[5px] flex items-end">
                <box-icon name='recycle' color='#006C5B' size='40px'></box-icon>
                </div>
                Sustentabilidad y Agro
                <svg
                    className={`-mr-1 ml-12 h-5 w-5 ${agroIsOpen ? 'transform rotate-180' : ''}`}
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

            {agroIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    onClick={agroCloseDropdown}
                >
                    Licenciatura en Higiene, Seguridad y Medio Ambiente del Trabajo
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={agroCloseDropdown}
                >
                    Licenciatura en Ambiente y Energías Renovables
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={agroCloseDropdown}
                >
                    Licenciatura en Antropología Organizacional
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={agroCloseDropdown}
                >
                    Licenciatura en Administración Agraria
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={agroCloseDropdown}
                >
                    Licenciatura en Gestión Ambiental
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={agroCloseDropdown}
                >
                    Tecnicatura Universitaria en Hidrocarburos y Geociencia
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={agroCloseDropdown}
                >
                    Tecnicatura Universitaria en Gestión y Auditorías Ambientales
                </a>
                </div>
            )}
        </div> 
    )
}