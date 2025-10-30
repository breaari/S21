import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTest2 } from "./TestContextH";
import imagenTest from "../assets/secundaria-deskk.png"; // ✅ solo una imagen
import { MdArrowOutward } from "react-icons/md";
import { NavbarSecundaria } from "./NavbarH";

export const InicioSecundaria = () => {
  const { nombre, setNombre } = useTest2();
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Descubrí tu carrera ideal | Universidad Siglo 21";
  }, []);

  const handleStartTest = () => {
    setTouched(true);
    if (!nombre.trim()) return;
    navigate("/secundaria/preguntas");
  };

  const showError = touched && !nombre.trim();

  return (
    <main className="min-h-screen">
      <NavbarSecundaria />
      <section className="text-center">
        <h1 className="font-bold text-[50px] text-grisoscuro2 leading-[1] mq980:text-[40px] px-2">
          DESCUBRÍ
        </h1>
        <h2 className="font-bold text-[50px] text-verdeclaro mb-4 leading-tight mq980:text-[40px] px-2">
          TU CARRERA IDEAL 🔍
        </h2>

        <p className="text-grisoscuro text-[18px] mb-4 px-[20%]">
          Elegí la opción que más se parezca a vos. Prometemos que no hay respuestas malas 😎.
        </p>

        <div className="text-start mb-10 px-[25%] mq980:px-[10%]">
          <label
            htmlFor="nombre"
            className="block mb-1 text-sm font-medium text-verdeclaro"
          >
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
                ${
                  showError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-verdeclaro"
                }`}
            />
            <button
              onClick={handleStartTest}
              disabled={!nombre.trim()}
              className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-md transition mq980:justify-center mq980:w-[60%] mq980:mx-auto
                ${
                  !nombre.trim()
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-verde text-white hover:bg-verdeoscuro"
                }`}
            >
              Comenzar test
              <MdArrowOutward size={20} />
            </button>
          </div>

          {showError && (
            <p className="text-red-500 text-sm mt-2">
              Este campo es requerido
            </p>
          )}
        </div>

        {/* ✅ Una sola imagen, válida para todos los dispositivos */}
        <div className="flex justify-center">
          <img
            src={imagenTest}
            alt="Ilustración de test vocacional"
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
};
