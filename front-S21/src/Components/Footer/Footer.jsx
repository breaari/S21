import React from "react";
import Logo from "../../assets/logo-blanco-sin-fondo.png"

export const Footer = () => {
    return (
        <div className="bg-verde py-8 px-16 flex flex-row mq980:flex-col items-center justify-between">
             <div className="hidden mq980:flex mq980:flex-row mq980:pb-4 mq1024:hidden lg:block">
                <div className='mr-1'>
                    <box-icon type='logo' name='instagram' color='#FFFFFF' size='35px'></box-icon>
                </div>
                <div>
                    <box-icon name='facebook-square' type='logo' color='#FFFFFF' size='35px' ></box-icon>
                </div>
            </div>
            <div>
                <img src={Logo} className="w-[250px]"></img>
                <a className="text-blanco text-[13px] mt-4 mq980:text-center mq980:flex mq980:justify-center mq980:items-center">Universidad Siglo 21 © 2023- Todos los derechos reservados</a>
            </div>
            <div className="flex flex-row mq980:hidden">
                <div className='mr-1'>
                    <box-icon type='logo' name='instagram' color='#FFFFFF' size='35px'></box-icon>
                </div>
                    <box-icon name='facebook-square' type='logo' color='#FFFFFF' size='35px' ></box-icon>
            </div>

        </div>
    )
}