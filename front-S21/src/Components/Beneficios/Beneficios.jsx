import React from "react";
import 'boxicons'

export const Beneficios = () => {
    return (
        <div className="flex flex-row justify-evenly gap-1 items-center my-12">
            <div className='flex flex-col justify-center items-center w-[500px]'>
                <box-icon name='football' size='132px' color='#006C5B' ></box-icon>
                <h2 className="font-bold flex justify-center items-center text-[18px] text-grisoscuro w-[340px] text-center">
                    Beneficios para deportistas federados 10% de descuento en aranceles.
                </h2>
            </div>
            <div className='flex flex-col justify-center items-center w-[500px]'>
                <div className='bg-verde rounded-[100px] w-[116px] h-[116px] flex items-center justify-center mb-[8px] mt-[32px]'>
                    <i className="fa-solid fa-handshake fa-5x" style={{ color: '#fafcff' }}></i>
                </div>
                <h2 className="font-bold flex justify-center items-center text-[18px] text-grisoscuro w-[440px] text-center">
                    Beneficio por "organización amiga" 10% de bonificación sobre los aranceles de carreras de grado para miembros de empresas con convenio y sus familias.
                </h2>
            </div>
        </div>
    )
}