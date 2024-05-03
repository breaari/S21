import React from "react";
import pinmap from "../../assets/pinmap-S21.png"

export const Caus = () => {
    return (
        <div className="bg-grisclaro pt-[25px] pb-[60px] px-5">
            <h1 className=" w-[95%] font-bold flex justify-center items-center text-center text-[32px] mq980:text-[24px] text-verde py-[20px] mq980:pt-[0px]">
                Centros de Aprendizajes Universitarios
            </h1>
            <div className="flex justify-around flex-wrap">
            <div className="shadow-md bg-blanco rounded-md flex flex-row text-md justify-start items-center w-[550px] p-5 mb-5">
                <img className= "h-[60px] w-[60px] mx-2"src={pinmap}></img>
                <div className="flex flex-col">
                    <a className="font-bold  text-verde ">Centro de Aprendizaje Universitario Regional Mar del Plata</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href="https://maps.app.goo.gl/rVskAfnrNuReYUQn8" target="_blank" rel="noopener noreferrer">
                    Av. Colón 3092 (esq. Catamarca), Mar del Plata.</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href='https://api.whatsapp.com/send?phone=5492235512665&text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%E2%80%A6'
                    target="_blank" rel="noopener noreferrer">223 551-2665</a>
                </div>
            </div>
            <div className="shadow-md bg-blanco rounded-md flex flex-row text-md justify-start items-center w-[550px] p-5 mb-5">
                <img className= "h-[60px] w-[60px] mx-2"src={pinmap}></img>
                <div className="flex flex-col">
                    <a className="font-bold  text-verde ">Centro de Aprendizaje Universitario Villa Gesell - Pinamar</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href="https://maps.app.goo.gl/nGPLrK5Sbg6kveWQ9" target="_blank" rel="noopener noreferrer">
                    Paseo 107 N°552, Villa Gesell.</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href='https://api.whatsapp.com/send?phone=5492267511914&text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%E2%80%A6'
                    target="_blank" rel="noopener noreferrer">226 751-1914</a>
                </div>
            </div>
            <div className="shadow-md bg-blanco rounded-md flex flex-row text-md justify-start items-center w-[550px] p-5">
                <img className= "h-[60px] w-[60px] mx-2"src={pinmap}></img>
                <div className="flex flex-col">
                    <a className="font-bold  text-verde ">Centro de Aprendizaje Universitario Necochea</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href="https://maps.app.goo.gl/xGuBBvjzsudveHC28" target="_blank" rel="noopener noreferrer">
                        Calle 57 N°2443, Necochea.</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href='https://api.whatsapp.com/send?phone=5492262474949&text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%E2%80%A6'
                    target="_blank" rel="noopener noreferrer">226 247-4949</a>
                </div>
            </div>
             <div className="shadow-md bg-blanco rounded-md flex flex-row text-md justify-start items-center w-[550px] p-5">
                <img className= "h-[60px] w-[60px] mx-2"src={pinmap}></img>
                <div className="flex flex-col">
                    <a className="font-bold  text-verde ">Centro de Aprendizaje Universitario La Costa</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href="https://maps.app.goo.gl/rPoLHQWYz7b5t4a26" target="_blank" rel="noopener noreferrer">
                        Calle 3 N°2233, Santa Teresita.</a>
                    <a className="text-grisoscuro font-semibold hover:underline" href='https://api.whatsapp.com/send?phone=5492246588991&text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%E2%80%A6'
                    target="_blank" rel="noopener noreferrer">224 658-8991</a>
                </div>
            </div>
            </div>
            
            

        </div>
    )
}