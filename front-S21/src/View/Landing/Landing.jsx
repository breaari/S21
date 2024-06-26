import React, { useState } from "react";
import { Portada } from "../../Components/Inicio/Portada";
import { Cualidades } from "../../Components/Cualidades/Cualidades";
import { Oferta } from "../../Components/Oferta/Oferta";
import { Formulario } from "../../Components/Formulario/Formulario";
import { Beneficios } from "../../Components/Beneficios/Beneficios";
import { Footer } from "../../Components/Footer/Footer";
import { Whatsapp } from "../../Components/Whatsapp/Whatsapp";
import { Caus } from "../../Components/CAUS/Caus"

export const Landing = () => {
    //quiero hace run commit

    return (
        <div className=" max-w-full container mx-0">
            <Portada></Portada>
            <Cualidades></Cualidades>
            <div className="flex flex-row  mq980:flex-col bg-grisclaro py-[45px]">
            <Oferta></Oferta>
            <Formulario></Formulario>
            </div>
            <Beneficios></Beneficios>
            <Caus></Caus>
            <Footer></Footer>
            <Whatsapp></Whatsapp>
            
        </div>
    )
}