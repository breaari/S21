import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useTest } from "./TestContext"; // 👈 Importamos el contexto

export const Final = () => {
  const navigate = useNavigate();
  const {
    setNombre,
    setRespuestas,
    datosContacto,
    setDatosContacto,
  } = useTest();

  const handleFinalizar = () => {
    // ✅ Limpiar el contexto
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

    navigate("/testvocacional"); // Volver al inicio del test
  };

  return (
    <div className="min-h-screen text-center ">
      <Navbar />
      <p className="mb-2 font-bold text-verdeclaro text-[35px] mq980:px-[10%] mq980:mb-8">
        ¡Gracias por animarte a descubrir tu vocación!
      </p>
      <span className="text-grisoscuro2 block mb-4 px-[20%] mq980:px-[10%]">
        Ya tenés tu resultado, revisá en tu correo electrónico{" "}
        <strong>{datosContacto.correo}</strong>. Si no lo encontrás en tu bandeja de entrada, no olvides chequear la carpeta de correos no deseados o spam.
      </span>
      <button
        onClick={handleFinalizar}
        className="bg-verde text-center font-semibold text-white px-6 py-2 rounded-md my-12 transition hover:bg-verdeoscuro"
      >
        Finalizar
      </button>
    </div>
  );
};
