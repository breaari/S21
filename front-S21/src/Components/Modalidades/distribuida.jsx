import React, { useState } from "react";

export const Distribuida = () => {

        const [distribuidaIsOpen, setDistribuidaIsOpen] = useState(false);
      
        const distribuidaToggleDropdown = () => {
          setDistribuidaIsOpen(!distribuidaIsOpen);
        };
      
        const distribuidaCloseDropdown = () => {
          setDistribuidaIsOpen(false);
        };

    return (
        <div className={`${distribuidaIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-verde py-4 px-2 rounded-md m-1`}>
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-blanco dropdown-toggle ml-3"
                onClick={distribuidaToggleDropdown}
                aria-expanded={distribuidaIsOpen ? 'true' : 'false'}
            >
                Educación Distribuida
                <svg
                    className={`mr-1 ml-20 h-5 w-5 ${distribuidaIsOpen ? 'transform rotate-180' : ''}`}
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

            {distribuidaIsOpen && (
                <div
                className="relative w-[300px] rounded-md bg-transparent  dropdown-menu "
                role="menu"
                aria-orientation="vertical"
                >
                <a
                    href="#"
                    className="block px-10 py-2 text-sm text-blanco "
                    role="menuitem"
                    onClick={distribuidaCloseDropdown}
                >
                    Reúne las mejores prácticas de la educación a distancia y las mejores de la educación presencial. Se estudia de manera online y se asiste 1 vez por semana a una teleclase en el Centro de Apoyo Universitario más cercano. Todo en compañía de compañeros de cursado y un tutor de aprendizaje presencial. Los exámenes se rinden en el mismo lugar.
                </a>
                
                </div>
            )}
        </div> 
    )
};