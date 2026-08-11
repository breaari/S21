import { useNavigate } from "react-router-dom";
import logoBlanco from "../assets/logo-blanco-sin-fondo.png";
import "./SeleccionRuleta.css";

export function SeleccionRuleta() {
  const navigate = useNavigate();

  return (
    <main className="seleccion-ruleta">
      <div className="seleccion-ruleta-fondo" />

      <section className="seleccion-ruleta-card">
        <img
          src={logoBlanco}
          alt="Universidad Siglo 21"
          className="seleccion-ruleta-logo"
        />

        <div className="seleccion-ruleta-contenido">
          <span className="seleccion-ruleta-etiqueta">
            Antes de empezar
          </span>

          <h1>¿En qué etapa estás?</h1>

          <p className="seleccion-ruleta-subtitulo">
            Elegí la opción que mejor te represente.
            La ruleta va a adaptar las preguntas especialmente para vos.
          </p>

          <div className="seleccion-ruleta-opciones">
            <button
              type="button"
              className="seleccion-ruleta-opcion"
              onClick={() => navigate("/ruleta/students")}
            >
              <div className="seleccion-ruleta-opcion-icono">
                🎓
              </div>

              <div className="seleccion-ruleta-opcion-texto">
                <strong>Ya estudio en Siglo 21</strong>

                <span>
                  Poné a prueba cuánto conocés sobre tu vida universitaria.
                </span>
              </div>

              <div className="seleccion-ruleta-flecha">
                →
              </div>
            </button>

            <button
              type="button"
              className="seleccion-ruleta-opcion"
              onClick={() => navigate("/ruleta/highschool")}
            >
              <div className="seleccion-ruleta-opcion-icono">
                🚀
              </div>

              <div className="seleccion-ruleta-opcion-texto">
                <strong>Estoy eligiendo mi carrera</strong>

                <span>
                  Descubrí carreras, profesiones y posibilidades para tu futuro.
                </span>
              </div>

              <div className="seleccion-ruleta-flecha">
                →
              </div>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}