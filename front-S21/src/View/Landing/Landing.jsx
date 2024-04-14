import React from "react";
import { Portada } from "../../Components/Start/Portada";
import { Cualidades } from "../../Components/Cualidades/Cualidades";
import { Oferta } from "../../Components/Oferta/Oferta";

export const Landing = () => {
    return (
        <div>
            <Portada></Portada>
            <Cualidades></Cualidades>
            <Oferta></Oferta>
        </div>
    )
}