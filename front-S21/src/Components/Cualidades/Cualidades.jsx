import React from "react";
import 'boxicons';

export const Cualidades = () => {
    const textos = [
        "Es momento de estudiar lo que te gusta.",
        "Elegí el camino que te va a llevar más lejos.",
        "Mar del Plata - Villa Gesell - Necochea - La Costa - Tandil - Olavarría."
    ];

    return (
        <div className="bg-grisclaro py-[40px] relative w-full h-auto  flex justify-center items-center flex-col text-violeta text-[48px] leading-[1.2]">
            {textos.map((texto, index) => (
                <h1 
                    key={index} 
                    className={`font-bold text-center mq980:text-[32px] max-w-[80%]`}
                >
                    {texto}
                </h1>
            ))}
        </div>
    );
};

