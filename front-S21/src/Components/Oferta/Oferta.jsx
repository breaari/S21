import React, { useState } from "react";
import { Diseño } from "../Carreras/diseño";
import { Ingenieria } from "../Carreras/ingenieria";
import { Salud } from "../Carreras/salud";
import { Turismo } from "../Carreras/turismo";
import { Agro } from "../Carreras/agro";
import { Finanzas } from "../Carreras/finanzas";
import { Educacion } from "../Carreras/educacion";
import { Derecho } from "../Carreras/derecho";
import { Distribuida } from "../Modalidades/distribuida";
import { DistribuidaHome } from "../Modalidades/distribuidaHome";

export const Oferta = ()=> {

    //! APLICAR TRANSICIONES EN LOS TOGGLE 

    return (
        <div className="bg-grisclaro flex flex-col items-center justify-center px-8">
            <h1 className=" w-[95%] font-bold flex justify-center items-center text-center text-[32px] mq980:text-[24px] text-verde pt-[45px] mq980:pt-[0px]">
                Oferta académica
            </h1>
            <h2 className="w-[95%] font-semibold flex justify-center items-center text-center text-[26px] mq980:text-[20px] text-grisoscuro mb-[20px]">
                Programas de pregrado, grado y posgrado para tu formación profesional.
            </h2>
            <div className="flex flex-wrap gap-2 justify-center mq780:flex-col ">
            <Diseño></Diseño>
            <Ingenieria></Ingenieria>
            <Salud></Salud>
            <Turismo></Turismo>
            <Agro></Agro>
            <Finanzas></Finanzas>
            <Educacion></Educacion>
            <Derecho></Derecho>
            </div>
            <h1 className=" w-[95%] font-bold flex justify-center items-center text-center text-[32px] mq980:text-[24px] text-verde pt-[45px] mq780:pt-[20px] mb-[20px]">
                Modalidades que se adaptan a tu estilo de vida
            </h1>
            <div className="flex flex-wrap gap-2 justify-center mq780:flex-col ">
            <Distribuida></Distribuida>
            <DistribuidaHome></DistribuidaHome>
            </div>
         
    </div>
 )

};