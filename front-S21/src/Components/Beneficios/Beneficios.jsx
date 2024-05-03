import React from "react";
import 'boxicons'

export const Beneficios = () => {
    return (
        <div className="bg-blanco py-[20px]">
            <h1 className=" w-[95%] font-bold flex justify-center items-center text-center text-[32px] mq980:text-[24px] text-verde mq980:pt-[0px]">
                Beneficios
            </h1>
        
        <div className=" flex flex-wrap mq980:flex-col justify-around p-4 text-sm">
            <div className="bg-verdeclaro flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full mb-[0.4%] hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer">
                <box-icon name='football' size='50px' color='#FFFFFF' ></box-icon>
                <h2 className="text-blanco ml-5">
                <a className="text-blanco font-semibold">Descuento para deportistas federados, </a> 
                en aranceles, para carreras de pre-grado y grado.</h2>
            </div>
            <div className="bg-grisoscuro2 flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full mb-[0.4%] hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer">
                <box-icon type='solid' name='graduation'  size='50px' color='#FFFFFF'></box-icon>
                <h2 className="text-blanco ml-5">Si sos egresado de la Universidad, podés articular una nueva carrera, con descuento en sus aranceles.</h2>
            </div>
            <div className="bg-verde flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full mb-[0.4%] hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer">
                <i class="fa-solid fa-arrow-rotate-left fa-3x" style={{ color: '#FFFFFF' }}></i>
                <h2 className="text-blanco ml-5">Garantía de Adaptación, para alumnos que cursan a distancia y necesitan cursar nuevamente el semestre inicial de la carrera.</h2>
            </div>

            <div className="bg-grisoscuro2 flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full mb-[0.4%] hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer">
                <box-icon type='solid' name='lock'  size='50px' color='#FFFFFF'></box-icon>
                <h2 className="text-blanco ml-5">
                <a className="text-blanco font-semibold">Seguro de Continuidad: </a>
                te permite continuar un semestre gratis a vos o a tu cónyuge, en el caso de quedarse sin trabajo.</h2>
            </div>
            <div className="bg-verde flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full mb-[0.4%] hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer">
                <i className="fa-regular fa-handshake fa-3x" style={{ color: '#FFFFFF' }}></i>
                <h2 className="text-blanco ml-5">Miembros y familiares de 
                <a className="text-blanco font-semibold"> Empresas Amigas, </a>
                cuentan con una bonificación sobre los aranceles de carreras de grado.</h2>
            </div>
            <div className="bg-verdeclaro flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full mb-[0.4%] hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer">
                <i class="fa-solid fa-list-check fa-3x" style={{ color: '#FFFFFF' }}></i>
                <h2 className="text-blanco ml-5">Beneficio de descuento automático por buen rendimiento académico.</h2>
            </div>

            <div className="bg-verde flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer mq980:mb-[0.4%]">
                <box-icon type='solid' name='user-plus' size='50px' color='#FFFFFF'></box-icon>
                <h2 className="text-blanco ml-5">
                <a className="text-blanco font-semibold">Beneficio por alumno referido. </a>
                Si sos alumno y recomendás a un ingresante, ambos recibirán una bonificación sobre la matrícula.</h2>
            </div>
            <div className="bg-verdeclaro flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer mq980:mb-[0.4%]">
                <i class="fa-solid fa-users fa-3x" style={{ color: '#FFFFFF' }}></i>
                <h2 className="text-blanco ml-5">
                <a className="text-blanco font-semibold">Beneficio por familiar directo, </a> 
                 para hermanos, padres, hijos o cónyuges de alumnos de Siglo 21. </h2>
            </div>
            <div className="bg-grisoscuro2 flex flex-row justify-center items-center p-5 w-[33%] mq980:w-full hover:scale-105 mq980:hover:scale-100 transition-transform duration-300 cursor-pointer mq980:mb-[0.4%]">
                <i class="fa-solid fa-hand-holding-dollar fa-3x" style={{ color: '#FFFFFF' }}></i>
                <h2 className="text-blanco ml-5">
                Ahorros y descuentos por inscripción anticipada en modalidades a distancia.</h2>
            </div>
           
        </div>
        </div>
    )
}