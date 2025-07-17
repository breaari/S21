import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import preguntasData from "./data.json";
import { Navbar } from "./Navbar";
import { useTest } from "./TestContext"; // ✅ Importa el contexto

const opciones = [
  { valor: 1, texto: "No me gusta" },
  { valor: 2, texto: "Me gusta un poco" },
  { valor: 3, texto: "Me es indiferente" },
  { valor: 4, texto: "Lo disfruto" },
  { valor: 5, texto: "Lo disfruto mucho" },
];

export const TestVocacional = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestasPaso, setRespuestasPaso] = useState([
    null,
    null,
    null,
    null,
  ]);

  const navigate = useNavigate();
  const dimensionActual = preguntasData[pasoActual];

  // ✅ Usamos el contexto para acceder y guardar las respuestas globales
  const { respuestas, setRespuestas } = useTest();

  useEffect(() => {
    // Cargar respuestas previas si existen
    const respuestasGuardadas = respuestas[dimensionActual.dimension] || [
      null,
      null,
      null,
      null,
    ];
    setRespuestasPaso(respuestasGuardadas);

    // 👇 Resetear scroll al top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [pasoActual]);

  const handleChange = (index, value) => {
    const nuevas = [...respuestasPaso];
    nuevas[index] = value;
    setRespuestasPaso(nuevas);
  };

  const todasRespondidas = respuestasPaso.every((r) => r !== null);

  const handleNext = () => {
    const nuevasRespuestas = {
      ...respuestas,
      [dimensionActual.dimension]: respuestasPaso,
    };
    setRespuestas(nuevasRespuestas);

    if (pasoActual < preguntasData.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      navigate("/testvocacional/enviar");
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

      <h2 className="text-[20px] text-verde mb-4 text-center pb-2">
        {dimensionActual.numero} - {dimensionActual.dimension.toUpperCase()}
      </h2>

      {/* Barra de progreso */}
      <div className="flex justify-center gap-4 mt-4 mb-12">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`h-[5px] w-full rounded-full transition-all duration-300 ${
              i === dimensionActual.numero - 1
                ? "bg-verdeoscuro"
                : "bg-verdeclaro/30"
            }`}
          />
        ))}
      </div>

      <p className="mb-2 font-bold text-verdeclaro text-[20px]">
        ¿CUÁNTO DISFRUTAS DE...? <br />
      </p>
      <span className="text-sm text-grisoscuro2">
        Responde según lo que más disfrutas y lo que menos te gusta hacer. No
        hay respuestas correctas o incorrectas, tus respuestas nos ayudarán a
        reflejar tu perfil en los resultados!
      </span>

      {/* Preguntas */}
      <div className="flex flex-col gap-8 mt-8">
        {dimensionActual.preguntas.map((pregunta, i) => {
          const activa = i === 0 || respuestasPaso[i - 1] !== null;
          const sinResponder = activa && respuestasPaso[i] === null;

          return (
            <div
              key={i}
              className={`relative p-8 rounded-md transition overflow-hidden bg-gray-100 
                ${sinResponder ? "border border-verde" : ""}
              `}
            >
              {!activa && (
                <div className="absolute inset-0 bg-white/60 z-10 pointer-events-none rounded-md" />
              )}

              <p className="mb-4 text-start text-verde font-semibold">
                {pregunta}
              </p>

              <div className="flex flex-wrap gap-4 z-0">
                {opciones.map((op, j) => {
                  const seleccionado = respuestasPaso[i] === op.valor;

                  return (
                    <label
                      key={j}
                      className={`flex-1 basis-[calc(20%-0.8rem)] text-center px-4 py-2 border rounded-md cursor-pointer transition-all border-verde text-verde font-semibold
        ${seleccionado ? "bg-verde/20" : "bg-white"} 
        ${!activa && "pointer-events-none opacity-60"}
      `}
                    >
                      <input
                        type="radio"
                        name={`pregunta-${i}`}
                        value={op.valor}
                        checked={seleccionado}
                        onChange={() => handleChange(i, op.valor)}
                        disabled={!activa}
                        className="hidden"
                      />
                      {op.texto}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
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
          disabled={!todasRespondidas}
          className={`px-36 py-2 rounded-md transition font-semibold mq980:order-1 mq980:px-0 mq980:w-[95%]  ${
            todasRespondidas
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
