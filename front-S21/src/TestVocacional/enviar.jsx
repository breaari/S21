import { useState } from "react";
import { Navbar } from "./Navbar";
import { useTest } from "./TestContext"; // 👈 Importar el contexto
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Enviar = () => {
  const { nombre, respuestas, setDatosContacto } = useTest();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    apellido: "",
    correo: "",
    telefono: "",
    localidad: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

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

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = () => {
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

    if (Object.keys(newErrors).length === 0) {
      if (!nombre.trim() || Object.keys(respuestas).length === 0) {
        alert("Por favor completá el test antes de enviar tus datos.");
        return;
      }

      setDatosContacto(form);
      setIsSending(true); // ⏳ comenzamos el envío

      axios
        .post("/send-test-results", {
          ...form,
          nombre,
          respuestas,
        })
        .then((response) => {
          console.log("📬 Datos enviados con éxito:", response.data);
          navigate("/testvocacional/gracias");
        })
        .catch((error) => {
          console.error("❌ Error al enviar los datos:", error);
          alert(
            "Hubo un problema al enviar tus datos. Por favor, intentá nuevamente."
          );
          setIsSending(false); // ❌ reactivamos el botón
        });
    }
  };

  return (
    <div className="min-h-screen text-center px-[5%] mq980:px-[0%]">
      <Navbar />
      <p className="mb-2 font-bold text-verdeclaro text-[25px]">
        ¡Muy bien, {nombre}!
      </p>
      <span className="text-sm text-grisoscuro2 block mb-4">
        ¡Terminaste el test! Ahora solo nos queda un paso más: completá los
        siguientes datos y recibí el informe en tu correo.
      </span>

      <div className="px-[20%] mq980:px-[5%]">
        {[
          {
            name: "apellido",
            label: "Apellido",
            placeholder: "Apellido*",
            type: "text",
          },
          {
            name: "correo",
            label: "Correo electrónico",
            placeholder: "Correo electrónico*",
            type: "email",
          },
          {
            name: "telefono",
            label: "Teléfono móvil",
            placeholder: "Ej: 2234567890*",
            type: "tel",
            pattern: "[0-9]*",
            inputMode: "numeric",
          },
          {
            name: "localidad",
            label: "Localidad",
            placeholder: "Localidad*",
            type: "text",
          },
        ].map(({ name, label, placeholder, type, pattern, inputMode }) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block mb-1 text-sm font-medium text-verdeclaro text-start"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              pattern={pattern}
              inputMode={inputMode}
              value={form[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
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
              : Object.values(errors).some((err) => err) ||
                Object.values(form).some((val) => val.trim() === "")
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-verdeoscuro"
          }`}
        >
          {isSending ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};
