import React, { useEffect, useState } from "react";
import { isValidBranch } from "../Validaciones/isValidBranch";
import { isValidEmail } from "../Validaciones/isValidEmail";
import { isValidLastName } from "../Validaciones/isValidLastName";
import { isValidModality } from "../Validaciones/isValidModality";
import { isValidName } from "../Validaciones/isValidName";
import { isValidProgram } from "../Validaciones/isValidProgram";
import { isValidType } from "../Validaciones/isValidType";
import { isValidWhatsapp } from "../Validaciones/isValidWhatsapp";
import axios from 'axios'
import usePrograms from "../Hooks/usePrograms"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Formulario = () => {

  const initialInput = {

    type: "",
    program: "",
    equivalency: "",
    modality: "",
    email: "",
    name: "",
    lastName: "",
    whatsapp: "", 
    branch: ""

}
    const [input, setInput ] = useState(initialInput);

    const initialErrors= {

      type: { valid: false, error: '' },
      program: { valid: false, error: '' },
      equivalency: { valid: true, error: '' },
      modality: { valid: false, error: '' },
      email: { valid: false, error: '' },
      name: { valid: false, error: '' },
      lastName: { valid: false, error: '' },
      whatsapp: { valid: false, error: '' },
      branch: { valid: false, error: '' },

  }

    const [inputError, setInputError ] = useState(initialErrors);

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

   const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.values(inputError).every(field => field.valid);
      
        if (!isValid) {
          if (!toast.isActive('error-toast')) {
            toast.error('Por favor, complete todos los campos correctamente antes de enviar.', {
              toastId: 'error-toast', 
            });
          }
          return;
        }
      
        try {
          const responseBack = await axios.post("/", input, {
            headers: {
              'Content-Type': 'application/json',
            },
      
          });
       
          setInput(initialInput)
          setInputError(initialErrors)
          setIsChecked(false)
          if (!toast.isActive('success-toast')) {
            toast.success('¡Gracias por tu consulta! Te estará llegando un email con información sobre tu interés y te vamos a estar contactando a la brevedad al número informado.', {
              toastId: 'success-toast',
            });}
          
        } catch (error) {
          window.alert('Error al enviar consulta')
        }
      };

    // const { getProgramsByType } = usePrograms();
    const { getProgramsByModalityAndType } = usePrograms();

    const filteredPrograms = getProgramsByModalityAndType(input.modality, input.type);


    return (
        <div className=" bg-grisclaro w-[95%] mq980:w-full mq980:mr-0 mr-[20px] flex  mq980:justify-center items-start">
            <form onSubmit={(e) => {
                      fbq('track', 'Lead');
                      handleSubmit(e);
                  }}
                className="bg-blanco rounded-md flex flex-col justify-start py-4 px-6 mq980:w-[90%] mq980:rounded-md min-w-[470px] mq980:min-w-[200px]">
                <a className="text-verde font-semibold text-[24px]">Contacto</a>
                <label className="text-grisoscuro py-1">Modalidad</label>
                <select name='modality' onChange={handleChange} onClick={handleChange} value= {input.modality? input.modality : 'Seleccioná'}
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná'>Seleccioná</option>
                    <option value='presencial'>Educación Presencial Distribuida</option>
                    <option value='distancia'>Educación Distribuida (1 Encuentro Semanal)</option>
                    <option value='distancia'>Educación Distribuida Home (100% Online)</option>
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.modality.error}</p>
                <label className="text-grisoscuro py-1">Tipo de programa</label>
                <select name='type' onChange={handleProgramChange} onClick={handleProgramChange} value= {input.type? input.type : 'Seleccioná'}
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná'>Seleccioná</option>
                    <option value='grado'>Grado</option>
                    <option value='pregrado'>Pregrado</option>
                    <option value='posgrado'>Posgrado</option>
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.type.error}</p>
                <label className="text-grisoscuro py-1">Programa</label>
                <select name="program" value={input.program} onChange={handleProgramChange} onClick={handleProgramChange}  
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná' className="">Seleccioná</option>
                    {/* {getProgramsByType(input.type)?.map((program) => (
                      <option key={program.name} value={program.name}>
                        {program.name}
                      </option>
                    ))} */}
                    {filteredPrograms.map((program) => (
                      <option key={program.name} value={program.name}>
                        {program.name}
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
                                <p className="hidden mq980:block w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.name.error}</p>
                    </div>
                    
                    <div className="mq980:flex mq980:flex-col">
                        <label className="text-grisoscuro py-1">Apellido</label>
                        <input name='lastName' value={input.lastName} onChange={handleChange} maxLength={36}
                                className="bg-grisclaro p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none"></input>
                                <p className="hidden mq980:block w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.lastName.error}</p>
                    </div>
                </div>
                <div className=" mq980:hidden flex flex-row justify-between gap-2">
                    <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.name.error}</p>
                    <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.lastName.error}</p>
                </div>
                <label className="text-grisoscuro py-1">WhatsApp</label>
                <input name='whatsapp' value={input.whatsapp} onChange={handleChange} maxLength={10}
                        className="bg-grisclaro p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                </input>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.whatsapp.error}</p>
                <label className="text-grisoscuro py-1">Sede más cercana</label>
                <select name='branch' onChange={handleChange} onClick={handleChange} value= {input.branch? input.branch : 'Seleccioná'}
                        className="bg-grisclaro cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná'>Seleccioná</option>
                    <option value='Mar del Plata'>Mar del Plata</option>
                    <option value='La Costa'>La Costa</option>
                    <option value='Villa Gesell'>Villa Gesell</option>
                    <option value='Necochea'>Necochea</option>
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.branch.error}</p>
                <button className="flex w-48 active:scale-95 bg-verde cursor-pointer text-blanco px-4 py-2 rounded-md font-semibold">
                    Solicitar información
                </button>
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  limit={1}
                  queue={false}
                  theme="colored"
                  transition={Zoom}
                />
            </form>
           
        </div>
    )

};