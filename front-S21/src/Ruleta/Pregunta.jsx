import { useEffect, useMemo, useRef, useState } from "react";
import logoBlanco from "../assets/logo-blanco-sin-fondo.png";

export function Pregunta({ categoria, pregunta, onVolver }) {
  const [resultado, setResultado] = useState(null);

  const [desafioIniciado, setDesafioIniciado] = useState(false);
  const [desafioFinalizado, setDesafioFinalizado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  const bloqueadoRef = useRef(false);

  /* =========================================================
     DURACIÓN AUTOMÁTICA DEL DESAFÍO
     Busca "5 segundos", "10 segundos", "15 segundos", etc.
  ========================================================= */

const duracionDesafio = useMemo(() => {
  if (pregunta?.segundos) {
    return pregunta.segundos;
  }

  return 5;
}, [pregunta]);

  /* =========================================================
     RESET AL CAMBIAR DE PREGUNTA
  ========================================================= */

  useEffect(() => {
    setResultado(null);

    setDesafioIniciado(false);
    setDesafioFinalizado(false);
    setTiempoRestante(duracionDesafio);

    bloqueadoRef.current = false;
  }, [pregunta, duracionDesafio]);

  /* =========================================================
     CONTADOR DESAFÍO RÁPIDO
  ========================================================= */

  useEffect(() => {
    if (!desafioIniciado || desafioFinalizado) {
      return;
    }

    if (tiempoRestante <= 0) {
      setDesafioFinalizado(true);

      setResultado({
        esCorrecta: true,
        titulo: "¡Tiempo!",
        detalle: pregunta.explicacion,
      });

      return;
    }

    const timer = setTimeout(() => {
      setTiempoRestante((actual) => actual - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    desafioIniciado,
    desafioFinalizado,
    tiempoRestante,
    pregunta,
  ]);

  /* =========================================================
     RESULTADOS
  ========================================================= */

  const revelarVerdaderoFalso = () => {
    if (resultado) return;

    setResultado({
      esCorrecta: true,
      titulo: pregunta.respuestaCorrecta
        ? "VERDADERO"
        : "FALSO",
      detalle: pregunta.explicacion,
    });
  };

  const revelarMultipleChoice = () => {
    if (resultado) return;

    const opcionCorrecta = pregunta.opciones?.find(
      (opcion) => opcion.id === pregunta.respuestaCorrecta,
    );

    setResultado({
      esCorrecta: true,
      titulo: opcionCorrecta
        ? ` ${opcionCorrecta.id.toUpperCase()}. ${opcionCorrecta.texto}`
        : "Respuesta correcta",
      detalle: pregunta.explicacion,
    });
  };

  const revelarAproximacion = () => {
    if (resultado) return;

    setResultado({
      esCorrecta: true,
      // titulo: "La respuesta es:",
      detalle: pregunta.explicacion,
      respuestaCorrecta: pregunta.respuestaCorrecta,
      unidad: pregunta.unidad,
    });
  };

  const revelarPreguntaAbierta = () => {
    if (resultado) return;

    setResultado({
      esCorrecta: true,
      titulo: "Para reflexionar",
      detalle: pregunta.reflexion,
    });
  };

  const revelarCarreraMisteriosa = () => {
    if (resultado) return;

    setResultado({
      esCorrecta: true,
      titulo: pregunta.respuestaCorrecta,
      detalle: pregunta.explicacion,
    });
  };

  const iniciarDesafio = () => {
    if (desafioIniciado || resultado) return;

    setTiempoRestante(duracionDesafio);
    setDesafioIniciado(true);
    setDesafioFinalizado(false);
  };

  /* =========================================================
     ENTER = SIGUIENTE ACCIÓN
  ========================================================= */

  const avanzar = () => {
    if (!pregunta || bloqueadoRef.current) return;

    /*
     * Si ya se mostró un resultado,
     * ENTER vuelve a la ruleta.
     *
     * En desafío rápido, no permitimos continuar
     * mientras el contador todavía está corriendo.
     */
    if (resultado) {
      if (
        pregunta.tipo === "desafio-rapido" &&
        desafioIniciado &&
        !desafioFinalizado
      ) {
        return;
      }

      onVolver();
      return;
    }

    switch (pregunta.tipo) {
      case "verdadero-falso":
        revelarVerdaderoFalso();
        break;

      case "multiple-choice":
        revelarMultipleChoice();
        break;

      case "aproximacion":
        revelarAproximacion();
        break;

      case "pregunta-abierta":
        revelarPreguntaAbierta();
        break;

      case "carrera-misteriosa":
        revelarCarreraMisteriosa();
        break;

      case "desafio-rapido":
        if (!desafioIniciado) {
          iniciarDesafio();
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key !== "Enter" &&
        event.code !== "Space"
      ) {
        return;
      }

      /*
       * Evita repetición si el botón físico
       * mantiene ENTER presionado unos milisegundos.
       */
      if (event.repeat) {
        return;
      }

      event.preventDefault();

      avanzar();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  /* =========================================================
     SIN PREGUNTA
  ========================================================= */

  if (!pregunta) {
    return (
      <div className="pregunta-pantalla">
        <div className="pregunta-card">
          <span className="pregunta-categoria">
            {categoria}
          </span>

          <h2 className="pregunta-titulo">
            No hay preguntas disponibles en esta categoría.
          </h2>

          <button
            type="button"
            className="pregunta-boton pregunta-boton-principal"
            onClick={onVolver}
          >
            Volver a la ruleta
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     CONTENIDO SEGÚN TIPO
  ========================================================= */

  const renderContenido = () => {
    switch (pregunta.tipo) {
      /* -----------------------------------------------------
         VERDADERO / FALSO
      ----------------------------------------------------- */

      case "verdadero-falso":
        return (
          <>
            {!resultado && (
              <>
                <div className="pregunta-opciones pregunta-opciones-dos">
                  <div className="pregunta-opcion pregunta-opcion-oral">
                    Verdadero
                  </div>

                  <div className="pregunta-opcion pregunta-opcion-oral">
                    Falso
                  </div>
                </div>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={revelarVerdaderoFalso}
                >
                  Ver respuesta
                </button>
              </>
            )}
          </>
        );

      /* -----------------------------------------------------
         MULTIPLE CHOICE
      ----------------------------------------------------- */

      case "multiple-choice":
        return (
          <>
            {!resultado && (
              <>
                <div className="pregunta-opciones">
                  {pregunta.opciones.map((opcion) => (
                    <div
                      key={opcion.id}
                      className="pregunta-opcion pregunta-opcion-oral"
                    >
                      <span className="pregunta-opcion-letra">
                        {opcion.id.toUpperCase()}
                      </span>

                      <span>{opcion.texto}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={revelarMultipleChoice}
                >
                  Ver respuesta
                </button>
              </>
            )}
          </>
        );

      /* -----------------------------------------------------
         APROXIMACIÓN
      ----------------------------------------------------- */

      case "aproximacion":
        return (
          <>
            {!resultado && (
              <>
                <div className="respuesta-oral-box">
                  <span className="respuesta-oral-icono">
                    ?
                  </span>

                  <div>
                    <strong>
                      Cada equipo dice un número
                    </strong>

                    <p>
                      Cuando todos hayan respondido,
                      revelá la respuesta.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={revelarAproximacion}
                >
                  Ver respuesta
                </button>
              </>
            )}
          </>
        );

      /* -----------------------------------------------------
         PREGUNTA ABIERTA
      ----------------------------------------------------- */

      case "pregunta-abierta":
        return (
          <>
            {!resultado && (
              <>
                <p className="pregunta-oral-indicacion">
                  Respondé la consigna en voz alta.
                </p>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={revelarPreguntaAbierta}
                >
                  Ver reflexión
                </button>
              </>
            )}
          </>
        );

      /* -----------------------------------------------------
         CARRERA MISTERIOSA
      ----------------------------------------------------- */

      case "carrera-misteriosa":
        return (
          <>
            {!resultado && (
              <>
                <div className="carrera-pistas">
                  {pregunta.pistas.map((pista, index) => (
                    <div
                      key={index}
                      className="carrera-pista"
                    >
                      <span>{index + 1}</span>
                      <p>{pista}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={revelarCarreraMisteriosa}
                >
                  Descubrir carrera
                </button>
              </>
            )}
          </>
        );

      /* -----------------------------------------------------
         DESAFÍO RÁPIDO
      ----------------------------------------------------- */

      case "desafio-rapido":
        return (
          <>
            {!desafioIniciado && !resultado && (
              <>
                <p className="desafio-indicacion">
                  Cuando estés listo, presioná el botón.
                  Vas a tener {duracionDesafio} segundos.
                </p>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={iniciarDesafio}
                >
                  Empezar desafío
                </button>
              </>
            )}

            {desafioIniciado &&
              !desafioFinalizado &&
              !resultado && (
                <div className="desafio-contador">
                  <span className="desafio-contador-numero">
                    {tiempoRestante}
                  </span>

                  <span className="desafio-contador-texto">
                    {tiempoRestante === 1
                      ? "segundo"
                      : "segundos"}
                  </span>
                </div>
              )}
          </>
        );

      default:
        return (
          <p className="pregunta-error">
            Este tipo de pregunta todavía no está configurado.
          </p>
        );
    }
  };

  return (
    <div className="pregunta-pantalla">
      <div className="pregunta-card">
        <span className="pregunta-categoria">
          {categoria}
        </span>

        <h2 className="pregunta-titulo">
          {pregunta.pregunta}
        </h2>

        {renderContenido()}

        {resultado && (
          <div className="pregunta-resultado pregunta-resultado-correcto">
            <h3>{resultado.titulo}</h3>

            {resultado.respuestaCorrecta !== undefined && (
              <p>
                <strong>Respuesta:</strong>{" "}
                {resultado.respuestaCorrecta}{" "}
                {resultado.unidad ?? ""}
              </p>
            )}

            <p>{resultado.detalle}</p>
          </div>
        )}

        {resultado && (
          <button
            type="button"
            className="pregunta-boton pregunta-boton-principal"
            onClick={onVolver}
          >
            Volver a la ruleta
          </button>
        )}

        {/* <div className="enter-ayuda">
          <span className="enter-ayuda-tecla">
            ENTER
          </span>

          <span>
            {resultado
              ? "para volver a la ruleta"
              : pregunta.tipo === "desafio-rapido" &&
                  desafioIniciado
                ? "esperá a que termine el tiempo"
                : "para continuar"}
          </span>
        </div> */}

        <img
          src={logoBlanco}
          alt="Universidad Siglo 21"
          className="pregunta-logo pregunta-logo-inferior"
        />
      </div>
    </div>
  );
}