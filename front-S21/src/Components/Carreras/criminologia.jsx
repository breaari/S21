import React, { useState } from "react";
import criminologiaImage from "../../assets/criminologia.png";

export const Criminologia = () => {
  const [criminologiaIsOpen, setCriminologiaIsOpen] = useState(false);

  const toggleDropdown = () => {
    setCriminologiaIsOpen(!criminologiaIsOpen);
  };

  const carreras = [
    { nombre: "Licenciatura en Criminología y Seguridad", nueva: false },
    {
      nombre: "Tecnicatura en Investigación de la Escena del Crimen",
      nueva: false,
    },
    { nombre: "Especialización en Cibercrimen", nueva: false },
    // { nombre: "Licenciatura en Criminalística", nueva: false },
    // { nombre: "Licenciatura en Psicología Forense", nueva: false },

    // { nombre: "Tecnicatura en Ciencias Forenses", nueva: false },
    // { nombre: "Licenciatura en Derecho Penal", nueva: false },
    // { nombre: "Licenciatura en Seguridad Pública", nueva: false },
  ];

  return (
    <div
      onClick={toggleDropdown}
      className="cursor-pointer transition-all duration-300 w-full overflow-hidden bg-grisclaro rounded-md m-1 mb-4 px-3 py-5"
    >
      <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        <div className="mr-[8px] flex items-center">
          <img
            src={criminologiaImage}
            className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4"
            alt="Criminología"
          />
        </div>
        Criminología
      </div>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-y-auto ${
          criminologiaIsOpen ? "max-h-[350px]" : "max-h-0"
        }`}
      >
        <div className="relative w-[95%] rounded-md bg-transparent mt-2 overflow-y-auto max-h-[350px]">
          {carreras.map((carrera, index) => (
            <div
              key={index}
              className="block px-10 py-2 text-[18px] text-grisoscuro font-semibold"
            >
              {carrera.nombre}
              {carrera.nueva && (
                <span className="ml-2 bg-verde rounded-md h-10 w-10 text-white text-[10px] font-semibold py-1 px-2">
                  Nueva carrera
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
