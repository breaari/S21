import React from "react";
import { Portada } from "../../Components/Inicio/Portada";
import { Cualidades } from "../../Components/Cualidades/Cualidades";
import { Oferta } from "../../Components/Oferta/Oferta";
import { Formulario } from "../../Components/Formulario/Formulario";
import { Beneficios } from "../../Components/Beneficios/Beneficios";
import { Footer } from "../../Components/Footer/Footer";

export const Landing = () => {
    return (
        <div>
            <Portada></Portada>
            <Cualidades></Cualidades>
            <div className="flex flex-row  bg-grisclaro">
            <Oferta></Oferta>
            <Formulario></Formulario>
            </div>
            <Beneficios></Beneficios>
            <Footer></Footer>
        </div>
    )
}