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
        <div className={`${finanzasIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
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
                className="relative w-[300px] rounded-md bg-transparent mq980:max-h-[15000px] mq980:overflow-hidden max-h-[450px] overflow-y-auto  dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                >
                    <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Finanzas
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Administración
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Actuario
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Gestión de Recursos Humanos
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                   Contador Público
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Comercialización
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Comercio Internacional
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Logística Global
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Emprendimiento (CCC)
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura en Gestión Contable E Impositiva
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura en Dirección de Equipos de Ventas
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura en Relaciones Laborales
                </a>
                <a
                   // href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura en Gestión De Empresas Familiares
                </a>
                
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura Universitaria en Gestión del Clima Laboral en la Organización
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura en Responsabilidad y Gestión Social
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura Universitaria en Marketing y Publicidad Digital
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Tecnicatura en Administración y Gestión Tributaria
                </a>
                </div>
            )}
        </div> 
    )
}