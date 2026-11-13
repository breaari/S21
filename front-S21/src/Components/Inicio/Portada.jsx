import React from "react";
import portadaMovil from '../../../public/CAMPAÑA2026_HEADER_MOBILE.jpg';
import portadaPc from '../../../public/CAMPAÑA2026_HEADER_DESKTOP.jpg';

export const Portada = () => {
    return (
        <header className="max-w-full mx-0 px-0">
            <img
                className="block mq980:hidden w-full"
                src={portadaPc}
                alt="Universidad Siglo 21 - Potenciando Nuevos Liderazgos"
            />
            <img
                className="hidden mq980:block w-full"
                src={portadaMovil}
                alt="Universidad Siglo 21 - Potenciando Nuevos Liderazgos"
            />

            <div
                className="mx-auto w-full max-w-6xl px-4 py-8 text-center sm:px-6 md:py-12"
                style={{ fontFamily: '"Barlow", sans-serif', color: '#009681', letterSpacing: '0.5px' }}
            >
                <h1
                    className="mx-auto max-w-5xl uppercase"
                    style={{
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 400,
                        lineHeight: 1.08
                    }}
                >
                    CENTRO DE APOYO UNIVERSITARIO
                </h1>
                <p
                    className="mx-auto mt-3 max-w-5xl uppercase"
                    style={{
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: '#006C5B',
                        fontWeight: 700,
                        lineHeight: 1.25
                    }}
                >
                    MAR DEL PLATA • TANDIL • OLAVARRÍA • AZUL • NECOCHEA • LA COSTA • VILLA GESELL
                </p>
            </div>
        </header>
    );
};
