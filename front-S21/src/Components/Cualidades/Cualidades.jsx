import React from "react";
import 'boxicons'

export const Cualidades = () => {
    return (
        <div className="relative w-full h-auto pb-[50px] mq780:pb-[20px] flex justify-center items-center flex-col">
            <h1 className="font-bold flex justify-center items-center text-center text-[32px] text-verde pt-[45px] mq780:pt-[20px] max-w-[80%]">
                Elegí una Universidad que impulsa tu propósito y que está cerca tuyo para ayudarte a cada paso.
            </h1><h1 className="font-bold flex justify-center items-center text-center text-[32px] text-verde mb-[20px] max-w-[80%]">
                Mar del Plata - Villa Gesell - Necochea - Partido de La Costa.
            </h1>
            <div className="mq780:flex-col flex-row flex items-center justify-center"> 
                <div className="w-[220px] text-center mr-[40px] mq780:mr-[0px]">
                    <box-icon type='solid' name='check-circle' color='#006C5B' size='110px'/>
                    <h2 className="font-bold flex justify-center items-center text-[18px] text-grisoscuro">
                        Validación de equivalencias al instante
                    </h2>
                </div>
                <div className="w-[220px] text-center mr-[40px] mq780:mr-[0px]">
                    <box-icon type='solid' name='building' color='#006C5B' size='110px'/>
                    <h2 className="font-bold flex justify-center items-center text-[18px] text-grisoscuro">
                        Prácticas profesionales en empresas
                    </h2>
                </div>
                <div className="w-[220px] text-center flex justify-center items-center flex-col mb-[25px] mr-[40px] mq780:mr-[0px]">
                    <div className="rounded-[55px] bg-verde mt-[35px] w-[94px] h-[94px] p-[0.5px] items-center flex justify-center my-[15px]">
                    <box-icon type='solid' name='graduation' color='white' size='80px'/>
                    </div>
                    <h2 className="font-bold flex justify-center items-center text-[18px] text-grisoscuro w-[200px]">
                        Portal de empleo Siglo 21 para egresados
                    </h2>
                </div>
                <div className="w-[220px] text-center flex justify-center items-center flex-col mb-[25px]">
                    <div className="rounded-[55px] bg-verde mt-[35px] w-[94px] h-[94px] p-[0.5px] items-center flex justify-center my-[15px]">
                    <box-icon type='solid' name='plane' rotate='90' color='white' size='75px'/>
                    </div>
                    <h2 className="font-bold flex justify-center items-center text-[18px] text-grisoscuro w-[100px]">
                        Experiencias 
                        internacionales
                    </h2>
                </div>
                
            </div>
        </div>
    )
}