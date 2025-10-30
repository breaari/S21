import { useNavigate } from "react-router-dom";
import { useTest2 } from "./TestContextH";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import { NavbarSecundaria } from "./NavbarH";
import { RuletaPremios } from "./ruletaPremios";

export const FinalSecundaria = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const {
    respuestas,
    setNombre,
    setRespuestas,
    nombre,
    datosContacto,
    setDatosContacto,
  } = useTest2();

  console.log("🧩 Datos desde contexto:");
  console.log("Nombre:", nombre);
  console.log("Respuestas:", respuestas);
  console.log("Datos contacto:", datosContacto);

  const datosIncompletos =
    !nombre || Object.keys(respuestas).length === 0 || !datosContacto?.correo;

  // --- CÁLCULO DEL PERFIL ---
  const defaultMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
  const perfilCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const normalizarOpcion = (v) => {
    if (v === null || v === undefined) return null;
    if (typeof v === "string" && /^\d+$/.test(v)) v = Number(v);
    if (typeof v === "number" && v >= 1 && v <= 5) return v;
    return null;
  };

  Object.keys(respuestas).forEach((qIdx) => {
    const opcion = normalizarOpcion(respuestas[qIdx]);
    if (!opcion) return;
    const perfilId = defaultMap[opcion];
    perfilCount[perfilId] += 1;
  });

  const maxVal = Math.max(...Object.values(perfilCount));
  const candidatos = Object.keys(perfilCount).filter(
    (k) => perfilCount[k] === maxVal
  );
  const perfilGanadorNum =
    candidatos.length === 1
      ? Number(candidatos[0])
      : Math.min(...candidatos.map(Number));

  const perfiles = {
    1: {
      titulo: "⚖️ El Defensor/a",
      descripcion:
        "Tenés una fuerte idea de justicia, te gusta debatir y defender tus ideas. Sos racional, seguro/a y confiás en tus argumentos.",
      carreras:
        "Abogacía • Lic. en Criminología y Seguridad • Tec. en Investigación de la Escena del Crimen",
      color: "text-indigo-700",
      bgColor: "bg-indigo-50",
    },
    2: {
      titulo: "💼 El Organizado/a",
      descripcion:
        "Te gusta planear, gestionar y liderar proyectos. Sos responsable, ordenado/a y confiás en tu capacidad de organización.",
      carreras:
        "Lic. en Recursos Humanos • Contador Público • Lic. en Finanzas",
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
    },
    3: {
      titulo: "💡 El Creativo/a",
      descripcion:
        "Pensás fuera de la caja, te encanta lo visual y disfrutás expresarte de forma artística o innovadora.",
      carreras:
        "Lic. en Diseño y Animación Digital • Tec. en Marketing y Publicidad",
      color: "text-pink-700",
      bgColor: "bg-pink-50",
    },
    4: {
      titulo: "🔍 El Curioso/a",
      descripcion:
        "Te fascina entender cómo funcionan las cosas, investigar y descubrir verdades ocultas.",
      carreras: "Lic. en Criminología • Tec. en Hidrocarburos y Geociencia",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    5: {
      titulo: "💬 El Empático/a",
      descripcion:
        "Tenés sensibilidad y conectás fácil con los demás. Te gusta escuchar, acompañar y generar vínculos.",
      carreras: "Lic. en Psicología • Lic. en Recursos Humanos",
      color: "text-purple-700",
      bgColor: "bg-purple-50",
    },
  };

  const perfil = perfiles[perfilGanadorNum] || null;

  // --- FUNCIONES ---
  const handleFinalizar = () => {
    console.log("🧹 Reiniciando datos del test...");
    setNombre("");
    setRespuestas({});
    setDatosContacto({
      apellido: "",
      correo: "",
      telefono: "",
      localidad: "",
    });

    localStorage.removeItem("nombre");
    localStorage.removeItem("respuestas");
    localStorage.removeItem("datosContacto");

    navigate("/secundaria");
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen text-center bg-white">
      <NavbarSecundaria />
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
      />
      <div className="mq980:px-[5%]">
        <div className="mb-8">
          <h1 className="text-[34px] font-extrabold text-verdeoscuro leading-tight">
            🚀 ¡Increíble! {nombre ? `${nombre}, ` : ""}acabás de dar el primer
            paso hacia tu futuro.
          </h1>
          <h2 className="text-[24px] font-medium text-grisoscuro leading-tight mt-5">
            🧩 Descubrí qué tipo de persona sos
          </h2>
        </div>

        {datosIncompletos ? (
          <div className="max-w-xl mx-auto p-6 bg-gray-100 border-l-4 border-gray-400 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              🤔 No encontramos tu resultado
            </h2>
            <p className="text-gray-600 text-base">
              Para ver tu resultado final, necesitás completar el test primero.
              <br />
              <br />
              <button
                onClick={() => navigate("/secundaria")}
                className="mt-4 bg-verde text-white px-6 py-2 rounded-md font-semibold transition hover:bg-verdeoscuro"
              >
                Ir al Test
              </button>
            </p>
          </div>
        ) : perfil ? (
          <>
            <div
              className={`relative max-w-2xl mx-auto p-8 ${perfil.bgColor} border-l-4 border-verdeoscuro rounded-xl shadow-md mb-4`}
            >
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-verdeoscuro text-white text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wide">
                Resultado
              </span>
              <h2 className={`text-xl font-semibold mb-4 ${perfil.color}`}>
                {perfil.titulo}
              </h2>
              <p className="text-grisoscuro2 text-base leading-relaxed mb-4">
                {perfil.descripcion}
              </p>
              <p className="text-grisoscuro font-semibold">
                Carreras sugeridas:{" "}
                <span className="text-verdeoscuro">{perfil.carreras}</span>
              </p>

              <a
                href="https://wa.me/5492235501021?text=Hola!%20Quiero%20saber%20más%20sobre%20mi%20futuro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-verde font-medium hover:underline transition-all"
              >
                Quiero saber más
              </a>
            </div>
            <RuletaPremios></RuletaPremios>
            <button
              onClick={handleFinalizar}
              className="bg-verde text-white font-semibold px-8 py-3 rounded-md my-10 transition hover:bg-verdeoscuro"
            >
              Finalizar
            </button>
          </>
        ) : (
          <p className="text-gray-500">No se pudo determinar un perfil.</p>
        )}
      </div>
    </div>
  );
};
