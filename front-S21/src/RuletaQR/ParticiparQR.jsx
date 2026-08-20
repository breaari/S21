import { useState } from "react";
import axios from "axios";
import "./RuletaQR.css";
import logoBlanco from "../assets/logo-blanco-sin-fondo.png";

const API_URL = import.meta.env.PROD
  ? ""
  : `http://${window.location.hostname}:3003`;

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

    const camposCompletos = Object.values(form).every((valor) => valor.trim());

    if (!camposCompletos) {
      setError("Completá todos los campos.");
      return;
    }

    setEnviando(true);
    setError("");

    try {
      await axios.post(`${API_URL}/ruleta-qr/participar`, form);

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
      <div className="qr-mobile-page qr-success-page">
        <div className="qr-mobile-shell">
          <div className="qr-mobile-brand-outside">
            <img src={logoBlanco} alt="Universidad Siglo 21" />
          </div>

          <div className="qr-mobile-card qr-success-card">
            <div className="qr-success-icon">✓</div>

            <div className="qr-mobile-kicker">REGISTRO COMPLETADO</div>

            <h1 className="qr-success-title">
              ¡LISTO,
              <br />
              <span>{form.nombre.toUpperCase()}!</span>
            </h1>

            <p className="qr-success-copy">Ya estás en la fila para jugar.</p>

            <div className="qr-success-status">
              <span className="qr-success-status-dot" />

              <div>
                <strong>Esperá tu turno</strong>

                <p>
                  Tu nombre aparecerá en la pantalla cuando la ruleta esté lista
                  para vos.
                </p>
              </div>
            </div>

            <p className="qr-success-footer">Podés cerrar esta pantalla.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-mobile-page">
      <div className="qr-mobile-shell">
        <div className="qr-mobile-brand-outside">
          <img src={logoBlanco} alt="Universidad Siglo 21" />
        </div>
        <div className="qr-mobile-card">
          <div className="qr-mobile-kicker">RULETA SIGLO 21</div>

          <h1 className="qr-mobile-title">
            ESCANEÁ.
            <br />
            <span>GIRÁ. GANÁ.</span>
          </h1>

          <p className="qr-mobile-description">
            Completá tus datos y quedás en la fila para participar.
          </p>

          <form className="qr-mobile-form" onSubmit={handleSubmit}>
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
                placeholder="2235501021"
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

            {error && <p className="qr-form-error">{error}</p>}

            <button type="submit" disabled={enviando}>
              {enviando ? "REGISTRANDO..." : "QUIERO PARTICIPAR"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
