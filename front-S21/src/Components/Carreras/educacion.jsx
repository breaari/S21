import React, { useState } from "react";

export const Educacion = () => {

        const [educacionIsOpen, setEducacionIsOpen] = useState(false);
      
        const educacionToggleDropdown = () => {
          setEducacionIsOpen(!educacionIsOpen);
        };
      
        const educacionCloseDropdown = () => {
          setEducacion(false);
        };

    return (
        <div className={`${educacionIsOpen ? 'h-auto' : 'h-[60px]'} shadow-md w-[320px] bg-blanco rounded-md m-1 mb-4 p-3`}>
            <button
                type="button"
                className="font-bold flex justify-center items-center text-[18px] text-verde dropdown-toggle"
                onClick={educacionToggleDropdown}
                aria-expanded={educacionIsOpen ? 'true' : 'false'}
            >
                <div className="mr-[5px] flex items-end">
                <box-icon name='book-reader' type='solid' color='#006C5B' size='40px'></box-icon>
                </div>
                Educación y Psicología  
                <svg
                    className={`-mr-1 ml-12 h-5 w-5 ${educacionIsOpen ? 'transform rotate-180' : ''}`}
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

            {educacionIsOpen && (
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
                    {`Licenciatura en Psicología (PD)`}
                    <a className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">Nueva carrera</a>
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold "
                    role="menuitem"
                    //onClick={educacionCloseDropdown}
                >
                    {`Licenciatura en Educación (CCC)`}
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={educacionCloseDropdown}
                >
                    Licenciatura en Educación y Nuevas Tecnologías
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={finanzasCloseDropdown}
                >
                    Licenciatura en Matemática
                </a>
                <a
                    //href="#"
                    className="block px-10 py-2 text-sm text-grisoscuro font-semibold"
                    role="menuitem"
                    //onClick={educacionCloseDropdown}
                >
                    Tecnicatura Universitaria en Promoción Comunitaria en Niñez y Adolescencia.
                </a>
                
                </div>
            )}
        </div> 
    )
}