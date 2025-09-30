import { useEffect, useRef, useState } from "react";
import { isValidBranch } from "../Validaciones/isValidBranch";
import { isValidEmail } from "../Validaciones/isValidEmail";
import { isValidLastName } from "../Validaciones/isValidLastName";
import { isValidModality } from "../Validaciones/isValidModality";
import { isValidName } from "../Validaciones/isValidName";
import { isValidProgram } from "../Validaciones/isValidProgram";
import { isValidType } from "../Validaciones/isValidType";
import { isValidWhatsapp } from "../Validaciones/isValidWhatsapp";
import axios from "axios";
import usePrograms from "../Hooks/usePrograms";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Formulario = () => {
  // 🔹 NUEVO: guard para no disparar 2 veces la conversión
  const adsConvFiredRef = useRef(false);

  // 🔹 NUEVO: helper para tomar gclid/utm y guardarlos
  const getClickParams = () => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["gclid","utm_source","utm_medium","utm_campaign","utm_term","utm_content"];
    const out = {};
    keys.forEach(k => {
      const v = params.get(k) || localStorage.getItem("utm_"+k) || "";
      if (v) {
        out[k] = v;
        try { localStorage.setItem("utm_"+k, v); } catch(e){}
      }
    });
    return out;
  };

  const initialInput = {
    type: "",
    program: "",
    equivalency: "",
    modality: "",
    email: "",
    name: "",
    lastName: "",
    whatsapp: "",
    branch: "",
    // 🔹 NUEVO: campos de atribución
    gclid: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  };
  const [input, setInput] = useState(initialInput);

  const initialErrors = {
    type: { valid: false, error: "" },
    program: { valid: false, error: "" },
    equivalency: { valid: true, error: "" },
    modality: { valid: false, error: "" },
    email: { valid: false, error: "" },
    name: { valid: false, error: "" },
    lastName: { valid: false, error: "" },
    whatsapp: { valid: false, error: "" },
    branch: { valid: false, error: "" },
  };
  const [inputError, setInputError] = useState(initialErrors);

  // 🔹 NUEVO: al montar, cargo gclid/utm al state
  useEffect(() => {
    const p = getClickParams();
    setInput(prev => ({ ...prev, ...p }));
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "modality") {
      const { valid, error } = isValidModality(value);
      setInputError(prev => ({ ...prev, modality: { valid, error } }));
    }
    if (name === "email") {
      const { valid, error } = isValidEmail(value);
      setInputError(prev => ({ ...prev, email: { valid, error } }));
    }
    if (name === "name") {
      const { valid, error } = isValidName(value);
      setInputError(prev => ({ ...prev, name: { valid, error } }));
    }
    if (name === "lastName") {
      const { valid, error } = isValidLastName(value);
      setInputError(prev => ({ ...prev, lastName: { valid, error } }));
    }
    if (name === "whatsapp") {
      const { valid, error } = isValidWhatsapp(value);
      setInputError(prev => ({ ...prev, whatsapp: { valid, error } }));
    }
    if (name === "branch") {
      const { valid, error } = isValidBranch(value);
      setInputError(prev => ({ ...prev, branch: { valid, error } }));
    }

    setInput(prev => ({ ...prev, [name]: value }));
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsChecked(checked);
    setInput(prev => ({ ...prev, equivalency: checked }));
  };

  const handleProgramChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      const { valid, error } = isValidType(value);
      setInputError(prev => ({ ...prev, type: { valid, error } }));
      setInput(prev => ({ ...prev, type: value, program: "Seleccioná" }));
    }

    if (name === "program") {
      const { valid, error } = isValidProgram(value);
      setInputError(prev => ({ ...prev, program: { valid, error } }));
      setInput(prev => ({ ...prev, program: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // (opcional) Meta Pixel si está
    if (window.fbq) {
      try { window.fbq("track", "Lead"); } catch(e){}
    }

    const isValid = Object.values(inputError).every((field) => field.valid);
    if (!isValid) {
      if (!toast.isActive("error-toast")) {
        toast.error("Por favor, complete todos los campos correctamente antes de enviar.", {
          toastId: "error-toast",
        });
      }
      return;
    }

    try {
      // 🔹 Aseguro que viajen gclid/utm
      const clickParams = getClickParams();
      const payload = { ...input, ...clickParams };

      await axios.post("/", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // 🔹 DISPARO CONVERSIÓN Google Ads SOLO si no se disparó antes
      if (!adsConvFiredRef.current && window.gtag) {
        adsConvFiredRef.current = true;
        window.gtag("event", "conversion", {
          send_to: "AW-17392341664/y5OxCKbO4vgaEKClqOVA",
        });
      }

      setInput(initialInput);
      setInputError(initialErrors);
      setIsChecked(false);

      if (!toast.isActive("success-toast")) {
        toast.success(
          "¡Gracias por tu consulta! Te estará llegando un email con información sobre tu interés y te vamos a estar contactando a la brevedad al número informado.",
          { toastId: "success-toast" }
        );
      }

      // (opcional) redirigir a /gracias
      // window.location.href = "/gracias";

    } catch (error) {
      window.alert("Error al enviar consulta");
    }
  };

  const { getProgramsByModalityAndType } = usePrograms();
  const filteredPrograms = getProgramsByModalityAndType(input.modality, input.type);

  return (
    <div className=" bg-grisclaro w-full mq980:w-full mq980:mr-[0px] mr-[20px] flex flex-col justify-center items-start p-16 mq980:p-4 mq980:py-8">
      <h1 className=" font-bold flex justify-center items-center text-center text-[48px] mq980:text-[38px] text-verdeoscuro  mq980:pt-[0px]">
        Inscribite
      </h1>
      <h2 className=" font-regular flex justify-center items-center mq980:items-start mq980:text-start text-center text-[24px] mq980:text-[24px] text-verde  mq980:pt-[0px] mb-[60px] mq980:mb-[30px]">
        Completá tus datos para más información y rebelate en La Siglo 21.
      </h2>

      {/* 🔹 CAMBIO: quité el fbq directo acá; lo llamamos dentro de handleSubmit con guard */}
      <form onSubmit={handleSubmit}
            className="bg-grisclaro rounded-md flex flex-col justify-start py-4 px-6 mq980:rounded-md w-full mq980:min-w-[200px] border border-gray-300">

        {/* ...tus campos tal cual... */}
        {/* (no hace falta agregar inputs ocultos porque ya mandamos gclid/utm en el payload) */}


                 <label className="text-grisoscuro py-1">Modalidad</label>
                 <select name='modality' onChange={handleChange} onClick={handleChange} value= {input.modality? input.modality : 'Seleccioná'}
                         className="bg-white cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                     <option disabled selected value='Seleccioná'>Seleccioná</option>
                     <option value='presencial'>Presencial Distribuida</option>
                     <option value='distancia'>Educación Distribuida</option>
                     <option value='distancia'>Educación Distribuida Home</option>
                 </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.modality.error}</p>
                <label className="text-grisoscuro py-1">Tipo de programa</label>
                 <select name='type' onChange={handleProgramChange} onClick={handleProgramChange} value= {input.type? input.type : 'Seleccioná'}
                        className="bg-white cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná'>Seleccioná</option>
                    <option value='grado'>Grado</option>
                    <option value='pregrado'>Pregrado</option>
                    <option value='posgrado'>Posgrado</option>
                </select>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.type.error}</p>
                <label className="text-grisoscuro py-1">Programa</label>
                <select name="program" value={input.program} onChange={handleProgramChange} onClick={handleProgramChange}  
                        className="bg-white cursor-pointer p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                    <option disabled selected value='Seleccioná' className="">Seleccioná</option>

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
                        className="bg-white p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                </input>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.email.error}</p>

                <div className="flex flex-row justify-between space-x-2 mq980:space-x-0 w-full mq980:flex-col">
                    <div className="flex flex-col w-full">
                        <label className="text-grisoscuro py-1">Nombre</label>
                        <input
                            name='name'
                            value={input.name}
                            onChange={handleChange}
                            maxLength={36}
                            className="w-full bg-white p-2 border border-solid border-gray-200 mt-1 text-grisoscuro rounded-md focus:outline-none"
                        />
                        <p className="hidden mq980:block w-full text-start text-[13px] text-red-600 py-2">{inputError.name.error}</p>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-grisoscuro py-1">Apellido</label>
                        <input
                            name='lastName'
                            value={input.lastName}
                            onChange={handleChange}
                            maxLength={36}
                            className="w-full bg-white p-2 border border-solid border-gray-200 mt-1 text-grisoscuro rounded-md focus:outline-none"
                        />
                        <p className="hidden mq980:block w-full text-start text-[13px] text-red-600 py-2">{inputError.lastName.error}</p>
                    </div>
                </div>

                <div className=" mq980:hidden flex flex-row justify-between gap-2">
                    <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.name.error}</p>
                    <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.lastName.error}</p>
                </div>
                <label className="text-grisoscuro py-1">WhatsApp</label>
                <input name='whatsapp' value={input.whatsapp} onChange={handleChange} maxLength={10}
                        className="bg-white p-2 border border-solid border-gray-200 mt-1 text-grisoscuro  rounded-md focus:outline-none">
                </input>
                <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.whatsapp.error}</p>
                <label className="text-grisoscuro py-1">Localidad</label>
                <input
                  name="branch"
                  value={input.branch || ''}
                  onChange={handleChange}
                  maxLength={50}
                  className="bg-white p-2 border border-solid border-gray-200 mt-1 text-grisoscuro rounded-md focus:outline-none"
                />
                 <p className=" w-[100%] text-start text-[13px] text-red-600 py-2">{inputError.branch.error}</p>


        <button className="flex w-[80px] active:scale-95 bg-verde cursor-pointer text-blanco px-4 py-2 rounded-md font-regular">
          Enviar
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
  );
};
