import React from "react";
import Logo from "../../assets/logo-blanco-sin-fondo.png"


export const Footer = () => {
    return (
        <div className="bg-verde py-8 px-16 flex flex-row mq980:flex-col items-center justify-between">
             <div className="hidden mq980:flex mq980:flex-row mq980:pb-4 mq1024:hidden lg:block">
                <a href="https://www.instagram.com/lasiglo21.mdp" target="_blank" rel="noopener noreferrer" className="mr-1 cursor-pointer">
                    <box-icon type='logo' name='instagram' color='#FFFFFF' size='35px'></box-icon>
                </a>
                <a href="https://www.facebook.com/lasiglo21mdq" target="_blank" rel="noopener noreferrer" className="mr-1 cursor-pointer">
                
                    <box-icon name='facebook-square' type='logo' color='#FFFFFF' size='35px' ></box-icon>
                </a>
            </div>
            <div>
                <img src={Logo} className="w-[250px]"></img>
            </div>
            <div className="flex flex-row mq980:hidden">
                <a href="https://www.instagram.com/lasiglo21.mdp" target="_blank" rel="noopener noreferrer" className="mr-1 cursor-pointer">
                    <box-icon type='logo' name='instagram' color='#FFFFFF' size='35px'></box-icon>
                </a>
                <a href="https://www.facebook.com/lasiglo21mdq" target="_blank" rel="noopener noreferrer" className="mr-16 cursor-pointer">
                
                    <box-icon name='facebook-square' type='logo' color='#FFFFFF' size='35px' ></box-icon>
                </a>
            </div>

        </div>
    )
}