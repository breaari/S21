import React, { useState } from "react";
import marketingimage from "../../assets/marketing.png"; // Asegúrate de tener la imagen

export const Marketing = () => {
  const [marketingIsOpen, setMarketingIsOpen] = useState(false);

  const toggleDropdown = () => {
    setMarketingIsOpen(!marketingIsOpen);
  };

  const carreras = [
    { nombre: "Licenciatura en Comercialización (Marketing)", nueva: false },
    { nombre: "Licenciatura en Comercio Internacional", nueva: false },
    { nombre: "Licenciatura en Publicidad", nueva: false },
    { nombre: "Licenciatura en Periodismo", nueva: false },
    {
      nombre: "Licenciatura en Relaciones Públicas e Institucionales",
      nueva: false,
    },
    {
      nombre: "Tecnicatura en Dir. de Protocolo, Org. de Eventos y RRPP",
      nueva: false,
    },
    { nombre: "Tecnicatura en Dirección equipos de venta", nueva: false },
    { nombre: "Tecnicatura en Marketing y Publicidad Digital", nueva: false },
    {
      nombre: "Especialización en Marketing y Dirección Comercial",
      nueva: false,
    },
    { nombre: "Especialización en Negocios Internacionales", nueva: false },
  ];

  return (
    <div
      onClick={toggleDropdown}
      className={`cursor-pointer transition-all duration-300 overflow-hidden w-full bg-grisclaro rounded-md m-1 mb-4 px-3 py-5`}
    >
      <div className="font-bold flex justify-start mq980:text-center items-center text-[28px] text-grisoscuro mq980:flex-col">
        <div className="mr-[8px] flex items-center">
          <img
            src={marketingimage}
            className="w-[40px] mx-2 mq980:w-[60px] mq980:mx-0 mq980:mb-4"
            alt="Marketing"
          />
        </div>
        Marketing y comunicación
      </div>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          marketingIsOpen ? "max-h-[350px]" : "max-h-0"
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
