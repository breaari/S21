import { useState } from "react";
import axios from "axios";
import "./RuletaQR.css";

export function ParticiparQR() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    localidad: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const camposCompletos = Object.values(form).every(
      (valor) => valor.trim(),
    );

    if (!camposCompletos) {
      setError("Completá todos los campos.");
      return;
    }

    setEnviando(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:3003/ruleta-qr/participar",
        form,
      );

      setCompletado(true);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          "No pudimos registrar tus datos. Intentá nuevamente.",
      );
    } finally {
      setEnviando(false);
    }
  };

  if (completado) {
    return (
      <div className="qr-mobile-page">
        <div className="qr-mobile-card qr-success-card">
          <div className="qr-success-icon">✓</div>

          <h1>¡Listo!</h1>

          <p className="qr-success-name">
            {form.nombre}
          </p>

          <p>
            Ya estás participando.
          </p>

          <p className="qr-success-highlight">
            Acercate a la ruleta y esperá tu turno.
          </p>

          <span>
            Podés cerrar esta pantalla.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-mobile-page">
      <div className="qr-mobile-card">
        <div className="qr-mobile-kicker">
          UNIVERSIDAD SIGLO 21
        </div>

        <h1 className="qr-mobile-title">
          ESCANEÁ + GIRÁ + GANÁ
        </h1>

        <p className="qr-mobile-description">
          Completá tus datos para habilitar tu
          participación en la ruleta.
        </p>

        <form
          className="qr-mobile-form"
          onSubmit={handleSubmit}
        >
          <label>
            Nombre
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              autoComplete="given-name"
            />
          </label>

          <label>
            Apellido
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              placeholder="Tu apellido"
              autoComplete="family-name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="nombre@email.com"
              autoComplete="email"
            />
          </label>

          <label>
            Teléfono
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="223..."
              autoComplete="tel"
              inputMode="numeric"
            />
          </label>

          <label>
            Localidad
            <input
              type="text"
              name="localidad"
              value={form.localidad}
              onChange={handleChange}
              placeholder="Tu localidad"
              autoComplete="address-level2"
            />
          </label>

          {error && (
            <p className="qr-form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
          >
            {enviando
              ? "REGISTRANDO..."
              : "QUIERO PARTICIPAR"}
          </button>
        </form>
      </div>
    </div>
  );
}