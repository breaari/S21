import React, { useState } from "react";

 export const Ingenieria = ()=> {

        const [ingenieriaIsOpen, setIngenieriaIsOpen] = useState(false);
      
        const ingenieriaToggleDropdown = () => {
          setIngenieriaIsOpen(!ingenieriaIsOpen);
        };
      
        const ingenieriaCloseDropdown = () => {
          setIngenieriaIsOpen(false);
        };

        return (

            <div className={`${ingenieriaIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={ingenieriaToggleDropdown}
                aria-expanded={ingenieriaIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[5px] flex items-end">
                <box-icon name='code-alt' color='#006C5B' size='40px' ></box-icon>
                </div>
                Ingeniería y Sistemas
                <svg
                    className={`-mr-1 ml-[60px] h-5 w-5 ${ingenieriaIsOpen ? 'transform rotate-180' : ''}`}
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

            {ingenieriaIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent  dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    onClick={ingenieriaCloseDropdown}
                >
                    Licenciatura En Informática

                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={ingenieriaCloseDropdown}
                >
                    Licenciatura en Administración de Infraestructura Tecnológica
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={ingenieriaCloseDropdown}
                >
                    Licenciatura en Ciencia de Datos
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={ingenieriaCloseDropdown}
                >
                    Licenciatura en Seguridad Informática
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={ingenieriaCloseDropdown}
                >
                    Licenciatura en Inteligencia Artificial y Robótica
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={ingenieriaCloseDropdown}
                >
                    Tecnicatura en Higiene y Seguridad Laboral
                </a>
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    onClick={ingenieriaCloseDropdown}
                >
                    Tecnicatura Universitaria en Redes Informáticas y Telecomunicaciones
                </a>
                
                </div>
            )}
        </div>

        )
 }