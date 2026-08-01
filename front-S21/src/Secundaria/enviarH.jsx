import { useState } from "react";
import { NavbarSecundaria } from "./NavbarH";
import { useTest2 } from "./TestContextH";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EnviarSecundaria = () => {
  const { nombre, respuestas, setDatosContacto } = useTest2();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    apellido: "",
    correo: "",
    telefono: "",
    localidad: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  // --- Validaciones ---
  const validate = (field, value) => {
    switch (field) {
      case "apellido":
        if (!value.trim()) return "Campo requerido.";
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(value)) return "Solo letras.";
        if (value.length > 30) return "Máximo 30 caracteres.";
        return "";
      case "correo":
        if (!value.trim()) return "Campo requerido.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido.";
        return "";
      case "telefono":
        if (!value.trim()) return "Campo requerido.";
        if (!/^\d+$/.test(value)) return "Solo números sin 0 ni 15.";
        if (value.length !== 10) return "Debe tener exactamente 10 dígitos.";
        return "";
      case "localidad":
        if (!value.trim()) return "Campo requerido.";
        if (value.length > 50) return "Máximo 50 caracteres.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "apellido" && value.length > 30) ||
      (name === "telefono" && value.length > 10) ||
      (name === "localidad" && value.length > 50)
    )
      return;

    setForm({ ...form, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validate(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  // --- PERFIL CALCULATION (copiado de finalH.jsx) ---
  const calcularPerfil = () => {
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
    const perfilGanadorNum = candidatos.length === 1
      ? Number(candidatos[0])
      : Math.min(...candidatos.map(Number));

    const perfiles = {
      1: {
        carreras:
          "Abogacía • Lic. en Criminología y Seguridad • Tec. en Investigación de la Escena del Crimen",
      },
      2: {
        carreras:
          "Lic. en Recursos Humanos • Contador Público • Lic. en Finanzas",
      },
      3: {
        carreras:
          "Lic. en Diseño y Animación Digital • Tec. en Marketing y Publicidad",
      },
      4: {
        carreras:
          "Lic. en Criminología • Tec. en Hidrocarburos y Geociencia",
      },
      5: {
        carreras:
          "Lic. en Psicología • Lic. en Recursos Humanos",
      },
    };

    const perfil = perfiles[perfilGanadorNum] || {};
    return perfil.carreras || "";
  };

  // --- Envío final ---
  const handleSubmit = async () => {
    const newErrors = {};
    Object.entries(form).forEach(([field, value]) => {
      const error = validate(field, value);
      if (error) newErrors[field] = error;
    });

    setTouched({
      apellido: true,
      correo: true,
      telefono: true,
      localidad: true,
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (!nombre.trim() || Object.keys(respuestas).length === 0) {
      alert("Por favor completá el test antes de enviar tus datos.");
      return;
    }

    setDatosContacto(form);
    setIsSending(true);

    const carreras = calcularPerfil();

    try {
      const payload = {
        ...form,
        nombre,
        respuestas,
        carreras,
      };

      const { data } = await axios.post("/send-secundaria-results", payload);
      console.log("✅ Datos enviados con éxito:", data);
      navigate("/secundaria/gracias");
    } catch (error) {
      console.error("❌ Error al enviar los datos:", error);
      alert("Hubo un problema al enviar tus datos. Por favor, intentá nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen text-center px-[5%] mq980:px-[0%]">
      <NavbarSecundaria />
      <p className="mb-2 font-bold text-verdeclaro text-[25px]">
        ¡Muy bien, {nombre}!
      </p>
      <span className="text-sm text-grisoscuro2 block mb-4">
        ¡Terminaste el test! Ahora solo nos queda un paso más: completá los
        siguientes datos y visualizá los resultados!
      </span>

      <div className="px-[20%] mq980:px-[5%]">
        {["apellido", "correo", "telefono", "localidad"].map((name) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block mb-1 text-sm font-medium text-verdeclaro text-start"
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <input
              id={name}
              name={name}
              type={name === "correo" ? "email" : "text"}
              value={form[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={`${name.charAt(0).toUpperCase() + name.slice(1)}*`}
              className={`w-full border px-4 py-2 rounded-md outline-none transition
                ${
                  errors[name]
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-verdeclaro"
                }`}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1 text-start">
                {errors[name]}
              </p>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={isSending}
          className={`bg-verde text-center font-semibold text-white px-6 py-4 rounded-md my-8 transition ${
            isSending
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-verdeoscuro"
          }`}
        >
          {isSending ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};
