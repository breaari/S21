import React, { useState } from "react";
import { Diseño } from "../Carreras/diseño";
import { Ingenieria } from "../Carreras/ingenieria";
import { Salud } from "../Carreras/salud";
import { Criminologia } from "../Carreras/criminologia";
import { Marketing } from "../Carreras/marketing";
import { Administracion } from "../Carreras/administracion";
import { Educacion } from "../Carreras/educacion";
import { Derecho } from "../Carreras/derecho";
import { Distribuida } from "../Modalidades/distribuida";
import { DistribuidaHome } from "../Modalidades/distribuidaHome";
import { Politica } from "../Carreras/politica";
import { PresencialD } from "../Modalidades/presencialD";

export const Oferta = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-center px-2 py-[40px]">
      <h1 className=" font-bold flex justify-center items-center text-center text-[48px] mq980:text-[38px] text-verdeoscuro  mq980:pt-[0px] mb-[60px] leading-[1]">
        ¿Qué carrera vas a elegir?
      </h1>
      <div className="grid grid-cols-3 gap-2 mq980:gap-0 justify-center mq980:grid-cols-1 px-10 mq980:px-4">
        <Diseño />
        <Ingenieria />
        <Salud />
        <Politica />
        <Criminologia />
        <Administracion />
        <Educacion />
        <Derecho />
        <Marketing />
      </div>
      <h1 className="font-bold flex justify-center items-center text-center text-[48px] mq980:text-[38px] text-verdeoscuro pt-[45px] mq780:pt-[20px] mb-[30px] px-4 leading-[1]">
        ¿Qué modalidad de estudio se adapta a tu rutina?
      </h1>
      <div className="w-full flex flex-col justify-center items-center px-10 mq980:px-4">
        <PresencialD />
        <div className="grid grid-cols-2 gap-2 mq980:gap-0 justify-center w-full mq980:grid-cols-1">
          <Distribuida />
          <DistribuidaHome />
        </div>
      </div>
    </div>
  );
};
