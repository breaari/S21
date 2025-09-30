import React, { useState } from "react";
import politicaimage from "../../assets/politica.png"; // Asegúrate de tener la imagen

export const Politica = () => {
  const [politicaIsOpen, setPoliticaIsOpen] = useState(false);

  const toggleDropdown = () => {
    setPoliticaIsOpen(!politicaIsOpen);
  };

  const carreras = [
    {
      nombre:
        "Especialización en Políticas Públicas de Seguridad y Criminológicas",
      nueva: true,
    },
    { nombre: "Licenciatura en Ciencia Política y Gobierno", nueva: false },
    // { nombre: "Licenciatura en Ciencia Política", nueva: false },
    { nombre: "Licenciatura en Relaciones Internacionales", nueva: false },
    // { nombre: "Licenciatura en Política y Gobierno", nueva: true },
    {
      nombre: "Tec. en Promoción Comunitaria en Niñez y Adolesc.",
      nueva: false,
    },
    { nombre: "Tecnicatura en Relaciones Laborales", nueva: false },
    { nombre: "Tecnicatura en Responsabilidad y Gestión Social", nueva: false },
    // { nombre: "Licenciatura en Derecho", nueva: false },
    // { nombre: "Licenciatura en Comunicación Social", nueva: true },
    // { nombre: "Licenciatura en Sociología", nueva: false },
    // { nombre: "Tecnicatura Universitaria en Políticas Públicas", nueva: false },
  ];

  return (
    <div
      onClick={toggleDropdown}
      className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-grisclaro rounded-md m-1 mb-4 px-3 py-5`}
    >
      <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        <div className="mr-[8px] flex items-center">
          <img
            src={politicaimage}
            className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4"
            alt="Política"
          />
        </div>
        Política
      </div>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          politicaIsOpen ? "max-h-[350px]" : "max-h-0"
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
