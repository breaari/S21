import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import preguntasData from "./data.json"; // Nuevo JSON adaptado
import { Navbar } from "./Navbar";
import { useTest } from "./TestContext2"; // ✅ Importa el contexto

export const Vocacion = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestaActual, setRespuestaActual] = useState(null);
  const navigate = useNavigate();

  const { respuestas, setRespuestas } = useTest(); // ✅ Global

  const preguntaActual = preguntasData[pasoActual];

  useEffect(() => {
    const respuestaGuardada = respuestas[pasoActual] ?? null;
    setRespuestaActual(respuestaGuardada);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [pasoActual]);

  const handleChange = (valor) => {
    setRespuestaActual(valor);
  };

  const handleNext = () => {
    const nuevasRespuestas = {
      ...respuestas,
      [pasoActual]: respuestaActual,
    };
    setRespuestas(nuevasRespuestas);

    if (pasoActual < preguntasData.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      navigate("/mivocacion/enviar");
    }
  };

  const handleBack = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  return (
    <div className="text-grisoscuro min-h-screen text-center bg-white px-[5%]">
      <Navbar />
  
      {/* Pregunta actual */}
      <div className="">
        <p className="text-[18px] font-semibold text-verde mb-6">
          Pregunta {pasoActual + 1} de {preguntasData.length}
        </p>
        <h2 className="text-[20px] font-bold text-verdeoscuro mb-4">
          {preguntaActual.pregunta}
        </h2>
  
        <div className="flex flex-col gap-4 items-center">
          {preguntaActual.respuestas.map((op, i) => {
            const valor = 5 - i; // Asignar valores: 5, 4, 3, 2, 1
            const seleccionado = respuestaActual === valor;
  
            return (
              <label
                key={i}
                className={`w-full max-w-xl px-4 py-2 border rounded-md cursor-pointer transition-all font-medium text-verde text-start
                  ${seleccionado ? "bg-verde/20 border-verdeoscuro" : "bg-white border-verde"}
                `}
              >
                <input
                  type="radio"
                  name={`pregunta-${pasoActual}`}
                  value={valor}
                  checked={seleccionado}
                  onChange={() => handleChange(valor)}
                  className="hidden"
                />
                {op}
              </label>
            );
          })}
        </div>
      </div>
  
      {/* Botones de navegación */}
      <div className="my-10 flex justify-center gap-6 mq980:flex-col mq980:items-center">
        <button
          onClick={handleBack}
          className="px-36 py-2 border font-semibold border-verde text-verde rounded-md hover:bg-verde/20 transition mq980:order-2 mq980:px-0 mq980:w-[95%]"
        >
          Atrás
        </button>
        <button
          onClick={handleNext}
          disabled={respuestaActual === null}
          className={`px-36 py-2 rounded-md transition font-semibold mq980:order-1 mq980:px-0 mq980:w-[95%]  ${
            respuestaActual !== null
              ? "bg-verde text-white hover:bg-verdeoscuro"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          {pasoActual === preguntasData.length - 1 ? "Enviar" : "Continuar"}
        </button>
      </div>
    </div>
  );
};  