import React, { useState } from "react";

export const Whatsapp = () => {

    const [isHovered, setIsHovered] = useState(false);

    return (
            <a className={`fixed right-0 bottom-0 mr-8 mb-12 shadow-md cursor-pointer rounded-full bg-green-500 w-14 h-14 flex items-center justify-evenly overflow-hidden transition-all duration-300 ${isHovered ? "hover:w-auto px-6" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                href='https://api.whatsapp.com/send?phone=5492235512665&text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%E2%80%A6'
                target="_blank"
                rel="noopener noreferrer"
            >
                {isHovered && (
                    <span className="text-blanco font-semibold">Hablá con un asesor</span>
                )}
            <box-icon name="whatsapp" type="logo" color="white"size="40px"/>
            </a>
            )
}