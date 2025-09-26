// import { useNavigate } from "react-router-dom";
// import { Navbar } from "./Navbar";
// import { useTest } from "./TestContext2";
// import Confetti from "react-confetti";
// import { useWindowSize } from "@uidotdev/usehooks";

// export const FinalVocacion = () => {
//   const navigate = useNavigate();
//   const { width, height } = useWindowSize();
//   const {
//     respuestas,
//     setNombre,
//     setRespuestas,
//     datosContacto,
//     setDatosContacto,
//   } = useTest();

//   const puntajeTotal = Object.values(respuestas).reduce(
//     (acc, val) => acc + val,
//     0
//   );

//   let titulo = "";
//   let descripcion = "";
//   let color = "";
//   let bgColor = "";

//   if (puntajeTotal >= 20) {
//     titulo = "🌟 Tu camino y tu vocación están en sintonía";
//     descripcion = (
//       <>
//         Estás en un proceso que te motiva, te representa y proyectás a futuro.
//         <br />
//         <br />
//         Podés fortalecer tu perfil con una especialización, una diplomatura o
//         cursos complementarios.
//       </>
//     );
//     color = "text-blue-700";
//     bgColor = "bg-blue-50";
//   } else if (puntajeTotal >= 15) {
//     titulo = "🔍 Estás cerca de tu vocación, pero hay aspectos por revisar";
//     descripcion = (
//       <>
//         Quizás haya áreas que podrías ajustar o explorar más a fondo para
//         alinearte con tus proyectos.
//         <br />
//         <br />
//         Te invitamos a conocer nuestras carreras de grado y pregrado, así como
//         certificaciones que pueden acercarte aún más a tu propósito.
//       </>
//     );
//     color = "text-yellow-700";
//     bgColor = "bg-yellow-50";
//   } else {
//     titulo = "🚧 Tu vocación está en otro lado";
//     descripcion = (
//       <>
//         Lo que hacés hoy no te representa del todo y eso impacta en tu
//         motivación y proyección.
//         <br />
//         <br />
//         Te invitamos a explorar nuestras propuestas académicas flexibles y a
//         medida: carreras cortas, certificaciones y cursos específicos. No
//         necesitás aprendizajes previos para comenzar a cambiar tu futuro!
//       </>
//     );
//     color = "text-red-600";
//     bgColor = "bg-red-50";
//   }

//   const handleFinalizar = () => {
//     setNombre("");
//     setRespuestas({});
//     setDatosContacto({
//       apellido: "",
//       correo: "",
//       telefono: "",
//       localidad: "",
//     });

//     // 🧹 Limpiar localStorage
//     localStorage.removeItem("nombre");
//     localStorage.removeItem("respuestas");
//     localStorage.removeItem("datosContacto");

//     navigate("/mivocacion");
//   };

//   return (
//     <div className="min-h-screen text-center bg-white">
//       <Navbar />
//       <Confetti
//         width={width}
//         height={height}
//         numberOfPieces={200}
//         recycle={false}
//       />
//       <div className="mq980:px-[5%]">
//         <h1 className="mb-4 font-bold text-verdeoscuro text-[32px] mq980:px-[10%]">
//           🎉¡Felicitaciones por animarte a descubrir tu vocación!🎉
//         </h1>

//         {/* 🧠 Sección de Resultado */}
//         <h2 className="text-[28px] font-extrabold text-verdeoscuro mb-8 mt-12">
//           🧠 Test Carrera vs. Vocación
//         </h2>

//         <div
//           className={`relative max-w-2xl mx-auto p-8 ${bgColor} border-l-4 border-verdeoscuro rounded-xl shadow-md mb-12`}
//         >
//           <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-verdeoscuro text-white text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wide">
//             Resultado
//           </span>
//           <h2 className={`text-xl font-semibold mb-4 ${color}`}>{titulo}</h2>
//           <p className="text-grisoscuro2 text-base leading-relaxed">
//             {descripcion}
//           </p>
//         </div>

//         {/* 🎓 Mensaje institucional */}
//         <div className="max-w-4xl flex flex-col items-center mx-auto mt-16 p-8 rounded-2xl shadow-md bg-gradient-to-br from-[#E8F9F1] to-[#F5FEFB] border border-verdeclaro">
//           <h3 className="text-[25px] font-bold text-verdeoscuro mb-4">
//             🚀 Potenciá tu futuro con Universidad Siglo 21
//           </h3>

//           <p className="text-grisoscuro mb-6 text-[17px] w-[80%]">
//             Tanto si ya encontraste tu camino como si estás en plena búsqueda,
//             te ofrecemos herramientas para impulsar tu desarrollo personal y
//             profesional.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
//             <div className="flex items-start gap-3">
//               <span className="text-verde text-xl">🎓</span>
//               <p>
//                 <strong>Carreras de grado y pregrado</strong>
//               </p>
//             </div>
//             <div className="flex items-start gap-3">
//               <span className="text-verde text-xl">📚</span>
//               <p>
//                 <strong>Especializaciones y formación continua</strong>
//               </p>
//             </div>
//             <div className="flex items-start gap-3">
//               <span className="text-verde text-xl">💻</span>
//               <p>
//                 <strong>Cursos 100% online y flexibles</strong>
//               </p>
//             </div>
//             <div className="flex items-start gap-3">
//               <span className="text-verde text-xl">🧭</span>
//               <p>
//                 <strong>Test vocacional gratuito</strong>
//               </p>
//             </div>
//           </div>

//           <p className="text-grisoscuro text-[16px]">
//             <strong>Explorá nuestras propuestas</strong> y empezá a diseñar un
//             futuro a tu medida.
//           </p>

//           <a
//             href="https://universidadsiglo21online.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mt-6 bg-verde text-white px-6 py-2 rounded-md font-semibold transition hover:bg-verdeoscuro"
//           >
//             Conocé más
//           </a>
//         </div>

//         <button
//           onClick={handleFinalizar}
//           className="bg-verde text-white font-semibold px-8 py-3 rounded-md my-10 transition hover:bg-verdeoscuro"
//         >
//           Finalizar
//         </button>
//       </div>
//     </div>
//   );
// };

import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useTest } from "./TestContext2";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

export const FinalVocacion = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const {
    respuestas,
    setNombre,
    setRespuestas,
    nombre,
    datosContacto,
    setDatosContacto,
  } = useTest();

  const datosIncompletos =
    !nombre ||
    Object.keys(respuestas).length === 0 ||
    !datosContacto?.correo;

  const puntajeTotal = Object.values(respuestas).reduce(
    (acc, val) => acc + val,
    0
  );

  let titulo = "";
  let descripcion = "";
  let color = "";
  let bgColor = "";

  if (puntajeTotal >= 20) {
    titulo = "🌟 Tu camino y tu vocación están en sintonía";
    descripcion = (
      <>
        Estás en un proceso que te motiva, te representa y proyectás a futuro.
        <br />
        <br />
        Podés fortalecer tu perfil con una especialización, una diplomatura o
        cursos complementarios.
      </>
    );
    color = "text-blue-700";
    bgColor = "bg-blue-50";
  } else if (puntajeTotal >= 15) {
    titulo = "🔍 Estás cerca de tu vocación, pero hay aspectos por revisar";
    descripcion = (
      <>
        Quizás haya áreas que podrías ajustar o explorar más a fondo para
        alinearte con tus proyectos.
        <br />
        <br />
        Te invitamos a conocer nuestras carreras de grado y pregrado, así como
        certificaciones que pueden acercarte aún más a tu propósito.
      </>
    );
    color = "text-yellow-700";
    bgColor = "bg-yellow-50";
  } else {
    titulo = "🚧 Tu vocación está en otro lado";
    descripcion = (
      <>
        Lo que hacés hoy no te representa del todo y eso impacta en tu
        motivación y proyección.
        <br />
        <br />
        Te invitamos a explorar nuestras propuestas académicas flexibles y a
        medida: carreras cortas, certificaciones y cursos específicos. No
        necesitás aprendizajes previos para comenzar a cambiar tu futuro!
      </>
    );
    color = "text-red-600";
    bgColor = "bg-red-50";
  }

  const handleFinalizar = () => {
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

    navigate("/mivocacion");
  };

  return (
    <div className="min-h-screen text-center bg-white">
      <Navbar />
      <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
      <div className="mq980:px-[5%]">
        <h1 className="mb-4 font-bold text-verdeoscuro text-[32px] mq980:px-[10%]">
          🎉¡Felicitaciones por animarte a descubrir tu vocación!🎉
        </h1>

        <h2 className="text-[28px] font-extrabold text-verdeoscuro mb-8 mt-12">
          🧠 Test Carrera vs. Vocación
        </h2>

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
                onClick={() => navigate("/mivocacion")}
                className="mt-4 bg-verde text-white px-6 py-2 rounded-md font-semibold transition hover:bg-verdeoscuro"
              >
                Ir al Test
              </button>
            </p>
          </div>
        ) : (
          <>
            <div className={`relative max-w-2xl mx-auto p-8 ${bgColor} border-l-4 border-verdeoscuro rounded-xl shadow-md mb-12`}>
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-verdeoscuro text-white text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wide">
                Resultado
              </span>
              <h2 className={`text-xl font-semibold mb-4 ${color}`}>{titulo}</h2>
              <p className="text-grisoscuro2 text-base leading-relaxed">{descripcion}</p>
            </div>

            {/* Mensaje institucional */}
            <div className="max-w-4xl flex flex-col items-center mx-auto mt-16 p-8 rounded-2xl shadow-md bg-gradient-to-br from-[#E8F9F1] to-[#F5FEFB] border border-verdeclaro">
              <h3 className="text-[25px] font-bold text-verdeoscuro mb-4">
                🚀 Potenciá tu futuro con Universidad Siglo 21
              </h3>
              <p className="text-grisoscuro mb-6 text-[17px] w-[80%]">
                Tanto si ya encontraste tu camino como si estás en plena búsqueda,
                te ofrecemos herramientas para impulsar tu desarrollo personal y
                profesional.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-verde text-xl">🎓</span>
                  <p><strong>Carreras de grado y pregrado</strong></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-verde text-xl">📚</span>
                  <p><strong>Especializaciones y formación continua</strong></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-verde text-xl">💻</span>
                  <p><strong>Cursos 100% online y flexibles</strong></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-verde text-xl">🧭</span>
                  <p><strong>Test vocacional gratuito</strong></p>
                </div>
              </div>
              <p className="text-grisoscuro text-[16px]">
                <strong>Explorá nuestras propuestas</strong> y empezá a diseñar un futuro a tu medida.
              </p>
              <a
                href="https://universidadsiglo21online.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-verde text-white px-6 py-2 rounded-md font-semibold transition hover:bg-verdeoscuro"
              >
                Conocé más
              </a>
            </div>

            <button
              onClick={handleFinalizar}
              className="bg-verde text-white font-semibold px-8 py-3 rounded-md my-10 transition hover:bg-verdeoscuro"
            >
              Finalizar
            </button>
          </>
        )}
      </div>
    </div>
  );
};
