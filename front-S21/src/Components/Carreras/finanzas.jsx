import React, { useState } from "react";

export const Finanzas = ({ isOpen, toggleDropdown }) => {

        const [finanzasIsOpen, setFinanzasIsOpen] = useState(false);
      
        const finanzasToggleDropdown = () => {
          setFinanzasIsOpen(!finanzasIsOpen);
        };
      
        const finanzasCloseDropdown = () => {
          setFinanzasIsOpen(false);
        };

    return (
        <div className="shadow-md w-[320px] bg-blanco p-2 rounded-[10px] m-1">
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={finanzasToggleDropdown}
                aria-expanded={finanzasIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[5px] flex items-end">
                <box-icon name='line-chart' color='#006C5B' size='40px'></box-icon>
                </div>
                Management y Finanzas
                <svg
                    className={`-mr-1 ml-10 h-5 w-5 ${finanzasIsOpen ? 'transform rotate-180' : ''}`}
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

            {finanzasIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura En Administración
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Actuario
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura En Gestión De Recursos Humanos
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                   Contador Público
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura En Comercialización
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Administración de Servicios de Salud
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura En Comercio Internacional
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura En Matemática
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura En Logística Global
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Licenciatura En Emprendimiento (CCC)
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura En Gestión Contable E Impositiva
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura En Dirección De Equipos De Ventas
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura En Relaciones Laborales
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura En Gestión De Empresas Familiares
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura Universitaria En Gestión Administrativa De Servicios De Salud
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura Universitaria En Gestión Del Clima Laboral En La Organización
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura En Responsabilidad Y Gestión Social
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura Universitaria En Marketing Y Publicidad Digital
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={finanzasCloseDropdown}
                >
                    Tecnicatura En Administración Y Gestión Tributaria
                </a>
                </div>
            )}
        </div> 
    )
}