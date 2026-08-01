import React from "react";
import Logo from "../../assets/logo-blanco-sin-fondo.png"

export const Footer = () => {
    return (
        <div className="bg-verde py-10 px-16 flex flex-col items-center">
            
            {/* Fila principal */}
            <div className="w-full flex flex-row mq980:flex-col items-center justify-between mb-6">
                
                <img src={Logo} className="w-[220px] mq980:mb-4" />

                <div className="flex flex-row gap-2">
                    <a href="https://www.instagram.com/lasiglo21.mdp" target="_blank" rel="noopener noreferrer">
                        <box-icon type='logo' name='instagram' color='#FFFFFF' size='32px'></box-icon>
                    </a>
                    <a href="https://www.facebook.com/lasiglo21mdq" target="_blank" rel="noopener noreferrer">
                        <box-icon name='facebook-square' type='logo' color='#FFFFFF' size='32px'></box-icon>
                    </a>
                </div>
            </div>

            {/* Separador */}
            <div className="w-full h-[1px] bg-white/20 mb-6"></div>

            {/* Bloque legal */}
            <div className="flex flex-col items-center gap-4">
                
                <p className="text-white/80 text-sm text-center">
                    © 2026 Pulsión y Racional SA – Todos los derechos reservados.
                </p>

                {/* AFIP */}
                <a 
                    href="http://qr.afip.gob.ar/?qr=dqmheiR45CkgCODcacvbpA,," 
                    target="_F960AFIPInfo" 
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition"
                >
                    <img 
                        src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg"
                        alt="AFIP Data Fiscal"
                        className="h-[65px] object-contain"
                    />
                </a>

            </div>

        </div>
    )
}