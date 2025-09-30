import React from "react";
import portadaMovil from '../../../public/CAMPAÑA2026_HEADER_MOBILE2.png';
import portadaPc from '../../../public/CAMPAÑA2026_HEADER_DESKTOP.webp';

export const Portada = () => {
    return (
        <div className="max-w-full mx-0 px-0">
            <img className='block mq980:hidden w-full'src={portadaPc} /> 
            <img className='hidden mq980:block w-full'src={portadaMovil}/> 
        </div>
    );
};
