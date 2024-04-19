import React, { useEffect, useState } from "react";
import { isValidBranch } from "../Validaciones/isValidBranch";
import { isValidEmail } from "../Validaciones/isValidEmail";
import { isValidLastName } from "../Validaciones/isValidLastName";
import { isValidModality } from "../Validaciones/isValidModality";
import { isValidName } from "../Validaciones/isValidName";
import { isValidProgram } from "../Validaciones/isValidProgram";
import { isValidType } from "../Validaciones/isValidType";
import { isValidWhatsapp } from "../Validaciones/isValidWhatsapp";
import { Maestría } from "../Programas/Maestría";
import { Pregrado } from "../Programas/Pregrado";
import { Grado } from "../Programas/Grado";

export const Formulario = () => {

    const [input, setInput ] = useState({

        type: "",
        program: "",
        equivalency: "",
        modality: "",
        email: "",
        name: "",
        lastName: "",
        whatsapp: "", 
        branch: ""

    });

    console.log("input", input)

    const [inputError, setInputError ] = useState({

        type: { valid: false, error: '' },
        program: { valid: false, error: '' },
        equivalency: { valid: false, error: '' },
        modality: { valid: false, error: '' },
        email: { valid: false, error: '' },
        name: { valid: false, error: '' },
        lastName: { valid: false, error: '' },
        whatsapp: { valid: false, error: '' },
        branch: { valid: false, error: '' },

    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
    
        if (name === 'modality') {
            const { valid, error } = isValidModality(value);
            setInputError((prevInputError) => ({
              ...prevInputError,
              modality: { valid, error }
            }));
          }

          if (name === 'email') {
            const { valid, error } = isValidEmail(value);
            console.log("valid", valid)
            console.log("error", error)
            setInputError((prevInputError) => ({
              ...prevInputError,
              email: { valid, error }
            }));
          }

          if (name === 'name') {
            const { valid, error } = isValidName(value);
            setInputError((prevInputError) => ({
              ...prevInputError,
              name: { valid, error }
            }));
          }
          
          if (name === 'lastName') {
            const { valid, error } = isValidLastName(value);
            setInputError((prevInputError) => ({
              ...prevInputError,
              lastName: { valid, error }
            }));
          }

          if (name === 'whatsapp') {
            const { valid, error } = isValidWhatsapp(value);
            setInputError((prevInputError) => ({
              ...prevInputError,
              whatsapp: { valid, error }
            }));
          }
          
          if (name === 'branch') {
            const { valid, error } = isValidBranch(value);
            setInputError((prevInputError) => ({
              ...prevInputError,
              branch: { valid, error }
            }));
          }
    
        setInput((prevInput) => ({
          ...prevInput,
          [name]: value
        }));
      };

      const [isChecked, setIsChecked] = useState(false);

      const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setIsChecked(checked);
      
        setInput((prevInput) => ({
          ...prevInput,
          equivalency: checked, 
        }));
      };

      const handleProgramChange = (e) => {

        const { name, value } = e.target;

        if (name === "type") {
          const { valid, error } = isValidType(value);
          setInputError((prevInputError) => ({
            ...prevInputError,
            type: { valid, error },
          }));
          setInput((prevInput) => ({
            ...prevInput,
            type: value,
            program: "Seleccioná", 
          }));
        }
    
        if (name === "program") {
          const { valid, error } = isValidProgram(value);
          setInputError((prevInputError) => ({
            ...prevInputError,
            program: { valid, error },
          }));
          setInput((prevInput) => ({
            ...prevInput,
            program: value,
          }));
        }

      }

    const programOptions = {
      Maestría: Maestría,
      Grado: Grado,
      Pregrado: Pregrado,
    };


    return (
        <div className=" bg-grisclaro w-[95%] mq980:w-full mq980:mr-0 mr-[20px] flex  mq980:justify-center items-start">
            <form className="bg-blanco rounded-md flex flex-col justify-start py-4 px-6 mq980:w-[90%] mq980:rounded-md min-w-[470px]">
                <a className="text-verde font-semibold text-[24px]">Contacto</a>
                <label className="text-grisoscuro py-1">Tipo de programa</label>
                <select name='type' onChange={handleProgramChange} onClick={handleProgramChange}
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná'>Seleccioná</option>
                    <option value='Grado'>Grado</option>
                    <option value='Pregrado'>Pregrado</option>
                    <option value='Maestría'>Maestría</option>
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.type.error}</p>
                <label className="text-grisoscuro py-1">Programa</label>
                <select name="program" value={input.program} onChange={handleProgramChange} onClick={handleProgramChange}  
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná' className="">Seleccioná</option>
                    {programOptions[input.type]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                      </option>
                    ))}
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.program.error}</p>
                <div className="flex items-center">
                    <input
                        name= 'equivalency'
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-verde  cursor-pointer checked:border-transparent checked:bg-verde mr-2"
                    />
                    <label className="text-grisoscuro font-semibold py-2"> Quiero acreditar equivalencias</label>
                </div>
                <label className="text-grisoscuro py-1">Modalidad</label>
                <select name='modality' onChange={handleChange} onClick={handleChange}
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná'>Seleccioná</option>
                    <option value='ED'>Educación Distribuida</option>
                    <option value='EDH'>Educación Distribuida Home</option>
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.modality.error}</p>
                <label className="text-grisoscuro py-1">Correo Electrónico</label>
                <input name='email' value={input.email} onChange={handleChange} maxLength={36}
                        className="bg-grisclaro p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                </input>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.email.error}</p>
                <div className="flex flex-row justify-between w-full mq980:flex-col">
                    <div className="mq980:flex mq980:flex-col">
                        <label className="text-grisoscuro py-1">Nombre</label>
                        <input name='name' value={input.name} onChange={handleChange} maxLength={36}
                                className="bg-grisclaro p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none"></input>
                    </div>
                    
                    <div className="mq980:flex mq980:flex-col">
                        <label className="text-grisoscuro py-1">Apellido</label>
                        <input name='lastName' value={input.lastName} onChange={handleChange} maxLength={36}
                                className="bg-grisclaro p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none"></input>
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-2">
                    <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.name.error}</p>
                    <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.lastName.error}</p>
                </div>
                <label className="text-grisoscuro py-1">WhatsApp</label>
                <input name='whatsapp' value={input.whatsapp} onChange={handleChange} maxLength={10}
                        className="bg-grisclaro p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                </input>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.whatsapp.error}</p>
                <label className="text-grisoscuro py-1">Sede más cercana</label>
                <select name='branch' onChange={handleChange} onClick={handleChange}
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná'>Seleccioná</option>
                    <option value='Mar del Plata'>Mar del Plata</option>
                    <option value='Santa Teresita'>Santa Teresita</option>
                    <option value='Villa Gesell'>Villa Gesell</option>
                    <option value='Necochea'>Necochea</option>
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.branch.error}</p>
                <button className="flex w-48 bg-verde cursor-pointer text-blanco px-4 py-2 rounded-md font-semibold">
                    Solicitar información
                </button>

            </form>
        </div>
    )

};