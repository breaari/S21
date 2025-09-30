import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const DistribuidaHome = () => {
  const [distribuidaHomeIsOpen, setDistribuidaHomeIsOpen] = useState(false);

  const distribuidaHomeToggleDropdown = () => {
    setDistribuidaHomeIsOpen(!distribuidaHomeIsOpen);
  };

  return (
    <div className="w-full bg-grisclaro py-4 px-2 rounded-md m-1 mq980:m-0">
      <button
        type="button"
        className="font-medium flex justify-between items-center text-[22px] text-verde px-3 w-full"
        onClick={distribuidaHomeToggleDropdown}
        aria-expanded={distribuidaHomeIsOpen ? 'true' : 'false'}
      >
        <span className="font-lexend font-light mq980:text-start">Educación Distribuida Home</span>
        <IoIosArrowDown className="ml-auto" />
      </button>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          distribuidaHomeIsOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="w-[95%] rounded-md bg-transparent mt-2">
          <a className="block px-10 py-2" role="menuitem">
            <ul className="list-inside list-disc text-grisoscuro">
              <li>Formate <strong>desde donde estés</strong>.</li>
              <li>Estudiá de manera <strong>online</strong> a través de nuestro <strong>Sistema de Aprendizaje Multimedial</strong>.</li>
              <li>Asistí al <strong>Centro de Apoyo Universitario (CAU)</strong> más cercano, solamente para <strong>rendir exámenes parciales y finales</strong>, y el resto del aprendizaje será <strong>online</strong>.</li>
            </ul>
          </a>
        </div>
      </div>
    </div>
  );
};
