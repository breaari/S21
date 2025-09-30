import React, { useState } from "react";
import educacionimage from "../../assets/educacion.png";

export const Educacion = () => {
  const [educacionIsOpen, setEducacionIsOpen] = useState(false);

  const toggleDropdown = () => {
    setEducacionIsOpen(!educacionIsOpen);
  };

  const carreras = [
    // { nombre: "Licenciatura en Psicología (PD)", nueva: true },
    { nombre: "Licenciatura en Educación (CCC)", nueva: true },
    { nombre: "Licenciatura en Educación y Nuevas Tecnologías", nueva: false },
    { nombre: "Maestría en Innovación Educativa", nueva: false },
    // { nombre: "Licenciatura en Matemática", nueva: false },
    // {
    //     nombre: "Tecnicatura Universitaria en Promoción Comunitaria en Niñez y Adolescencia",
    //     nueva: false,
    // },
  ];

  return (
    <div
      onClick={toggleDropdown}
      className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-grisclaro rounded-md m-1 mb-4 px-3 py-5`}
    >
      <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        <div className="mr-[8px] flex items-center">
          <img
            src={educacionimage}
            className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4"
            alt="Educación"
          />
        </div>
        Educación
      </div>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          educacionIsOpen ? "max-h-[350px]" : "max-h-0"
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
                <span className="ml-2 bg-verde rounded-md w-auto text-white text-[10px] font-semibold py-1 px-2 inline-block">
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
