import React, { useState } from "react";

export const DistribuidaHome = () => {

        const [distribuidaHomeIsOpen, setDistribuidaHomeIsOpen] = useState(false);
      
        const distribuidaHomeToggleDropdown = () => {
          setDistribuidaHomeIsOpen(!distribuidaHomeIsOpen);
        };
      
        const distribuidaHomeCloseDropdown = () => {
          setDistribuidaHomeIsOpen(false);
        };

    return (
        <div className={`${distribuidaHomeIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-verde py-4 px-2 rounded-md m-1 mq980:mb-[45px] `}>
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-blanco dropdown-toggle ml-3"
                onClick={distribuidaHomeToggleDropdown}
                aria-expanded={distribuidaHomeIsOpen ? 'true' : 'false'}
            >
                Educación Distribuida Home
                <svg
                    className={`mr-1 ml-8 h-5 w-5 ${distribuidaHomeIsOpen ? 'transform rotate-180' : ''}`}
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

            {distribuidaHomeIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent dropdown-menu transition-all duration-1000 ease-linear"
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-blanco"
                    role="menuitem"
                    //onClick={distribuidaHomeCloseDropdown}
                >
                    Modalidad 100% online pensada para quienes quieren alcanzar un título y no cuentan con la posibilidad o prefieren no asistir a clases presenciales. Cuenta con innovaciones tecnológicas que permiten la comunicación constante y en tiempo real con compañeros y profesores virtuales en cada materia.
                </a>
                
                </div>
            )}
        </div> 
    )
}