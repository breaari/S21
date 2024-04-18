import React from "react";
import Logo from "../../assets/logo-blanco-sin-fondo.png"

export const Footer = () => {
    return (
        <div className="bg-verde py-8 px-16 flex flex-row items-center justify-between">
            <div>
                <img src={Logo} className="w-[250px]"></img>
                <a className="text-blanco text-[13px] mt-4">Universidad Siglo 21 © 2023- Todos los derechos reservados</a>
            </div>
            <div className="flex flex-row">
                <div className='mr-1'>
                    <box-icon type='logo' name='instagram' color='#FFFFFF' size='35px'></box-icon>
                </div>
                    <box-icon name='facebook-square' type='logo' color='#FFFFFF' size='35px' ></box-icon>
            </div>

        </div>
    )
}