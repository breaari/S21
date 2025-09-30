import React, { useState } from "react";
import { Portada } from "../../Components/Inicio/Portada";
import { Cualidades } from "../../Components/Cualidades/Cualidades";
import { Oferta } from "../../Components/Oferta/Oferta";
import { Formulario } from "../../Components/Formulario/Formulario";
import { Beneficios } from "../../Components/Beneficios/Beneficios";
import { Footer } from "../../Components/Footer/Footer";
import { Whatsapp } from "../../Components/Whatsapp/Whatsapp";
import { Caus } from "../../Components/CAUS/Caus"
import PreguntasFrecuentes from "../../Components/PreguntasFrecuentes/preguntasFrecuentes";

export const Landing = () => {
    //quiero hace run commit

    return (
        <div className=" max-w-full container mx-0">
            <Portada></Portada>
            <Cualidades></Cualidades>
            <Oferta></Oferta>
            <Formulario></Formulario>
            {/* <Beneficios></Beneficios> */}
            <PreguntasFrecuentes></PreguntasFrecuentes>
            <Caus></Caus>
            <Footer></Footer>
            <Whatsapp></Whatsapp>
            
        </div>
    )
}