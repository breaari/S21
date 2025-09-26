import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTest } from "./TestContext2";
import imagentest from "../assets/vocacion.jpg";
import { MdArrowOutward } from "react-icons/md";
import { Navbar } from "./Navbar";

export const InicioVocacion = () => {
  const { nombre, setNombre } = useTest();
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Test Carrera vs. Vocación | Universidad Siglo 21";
  }, []);

  const handleStartTest = () => {
    setTouched(true);
    if (!nombre.trim()) return;
    navigate("/mivocacion/preguntas");
  };

  const showError = touched && !nombre.trim();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="text-center">
        <h1 className="font-bold text-[50px] text-grisoscuro2 leading-tight">
        CARRERA VS VOCACIÓN,
        </h1>
        <h2 className="font-bold text-[50px] text-verdeclaro mb-4 leading-tight">
          ¿COINCIDEN?
        </h2>

        <p className="text-grisoscuro text-[18px] mb-10 px-[20%]">
        Reflexioná sobre tu presente académico y laboral para descubrir si estás realmente en el camino que te apasiona. Elegí la opción que mejor te represente en cada pregunta y conocé qué tan alineado estás con lo que verdaderamente te motiva.
        </p>

        <div className="text-start mb-10 px-[25%] mq980:px-[10%]">
          <label htmlFor="nombre" className="block mb-1 text-sm font-medium text-verdeclaro">
            Nombre
          </label>
          <div className="flex flex-row gap-4 mq980:flex-col">
            <input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() => setTouched(true)}
              maxLength={50}
              placeholder="Ingresá tu nombre"
              className={`flex-1 border px-4 py-2 rounded-md outline-none transition
                ${showError 
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-400 focus:border-verdeclaro"}`}
            />
            <button
              onClick={handleStartTest}
              disabled={!nombre.trim()}
              className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-md transition mq980:justify-center mq980:w-[60%] mq980:mx-auto
                ${!nombre.trim()
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-verde text-white hover:bg-verdeoscuro"}`}
            >
              Comenzar test
              <MdArrowOutward size={20} />
            </button>
          </div>

          {showError && (
            <p className="text-red-500 text-sm mt-2">Este campo es requerido</p>
          )}
        </div>

        <div className="flex justify-center">
          <img src={imagentest} alt="Ilustración de test vocacional" className="w-full" />
        </div>
      </section>
    </main>
  );
};

