import React, { useState } from "react";
import derechoimage from "../../assets/derecho.png";

export const Derecho = () => {
  const [derechoIsOpen, setDerechoIsOpen] = useState(false);

  const toggleDropdown = () => {
    setDerechoIsOpen(!derechoIsOpen);
  };

  const carreras = [
    // { nombre: "Licenciatura en Criminología y Seguridad", nueva: false },
    // { nombre: "Licenciatura en Ciencia Política y Gobierno", nueva: false },
    // { nombre: "Licenciatura en Administración Pública", nueva: false },
    // { nombre: "Licenciatura en Relaciones Internacionales", nueva: false },
    { nombre: "Abogacía", nueva: false },
    { nombre: "Procurador", nueva: false },
    // { nombre: "Licenciatura en Antropología Organizacional", nueva: false },
    { nombre: "Escribanía", nueva: false },
    {
      nombre: "Martillero, Corredor Público y Corredor Inmobiliario",
      nueva: false,
    },

    { nombre: "Contador Público", nueva: false },
    { nombre: "Actuario", nueva: false },
    { nombre: "Maestría en Derecho Internacional", nueva: false },
    { nombre: "Maestría en Derecho Procesal", nueva: false },
    {
      nombre: "Esp. en Derecho de Familia, Niñez y Adolescencia",
      nueva: false,
    },
    // { nombre: "Martillero, Corredor Público y Corredor Inmobiliario", nueva: false },
    // { nombre: "Procurador", nueva: false },
    // {
    //     nombre: "Tecnicatura Universitaria en Administración y Gestión de Políticas Públicas",
    //     nueva: false,
    // },
    // { nombre: "Tecnicatura en Investigación de la Escena del Crimen", nueva: false },
  ];

  return (
    <div
      onClick={toggleDropdown}
      className="cursor-pointer transition-all duration-300 overflow-hidden w-full bg-grisclaro rounded-md m-1 mb-4 px-3 py-5"
    >
      <div className="font-bold flex justify-start items-center text-[28px] text-grisoscuro mq980:flex-col">
        <div className="mr-[8px] flex items-center">
          <img
            src={derechoimage}
            className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4"
            alt="Derecho"
          />
        </div>
        Derecho
      </div>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-y-auto ${
          derechoIsOpen ? "max-h-[350px]" : "max-h-0"
        }`}
      >
        <div className="relative w-[95%] rounded-md bg-transparent mt-2 max-h-[350px]">
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
