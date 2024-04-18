import React from "react";
import portadaMovil from '../../assets/portada-movil.jpeg';
import portadaPc from '../../assets/portada-pc.jpg'

export const Portada = () => {
    return (
        <div>
            <img className='block mq980:hidden'src={portadaPc} /> 
            <img className='hidden mq980:block'src={portadaMovil}/> 
        </div>
    );
};
