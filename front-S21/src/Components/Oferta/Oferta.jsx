import React, { useState } from "react";
import { Diseño } from "../Carreras/diseño";
import { Ingenieria } from "../Carreras/ingenieria";
import { Salud } from "../Carreras/salud";
import { Turismo } from "../Carreras/turismo";
import { Agro } from "../Carreras/agro";
import { Finanzas } from "../Carreras/finanzas";
import { Educacion } from "../Carreras/educacion";
import { Derecho } from "../Carreras/derecho";

export const Oferta = ()=> {

    return (
        <div className="bg-grisclaro flex flex-col items-center justify-center px-8">
            <h1 className=" w-[95%] font-bold flex justify-center items-center text-center text-[32px] text-verde pt-[45px] mq780:pt-[20px]">
                Oferta académica
            </h1>
            <h2 className="w-[95%] font-semibold flex justify-center items-center text-center text-[26px] text-grisoscuro mb-[20px]">
                Programas de pregrado, grado y posgrado para tu formación profesional.
            </h2>
            <div className="flex flex-wrap gap-1 justify-center mq780:flex-col ">
            <Diseño></Diseño>
            <Ingenieria></Ingenieria>
            <Salud></Salud>
            <Turismo></Turismo>
            <Agro></Agro>
            <Finanzas></Finanzas>
            <Educacion></Educacion>
            <Derecho></Derecho>
            </div>
         
    </div>
 )

};