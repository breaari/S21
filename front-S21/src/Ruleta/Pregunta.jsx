import { useEffect, useMemo, useRef, useState } from "react";
import logoBlanco from "../assets/logo-blanco-sin-fondo.png";

export function Pregunta({ categoria, pregunta, onVolver }) {
  const [resultado, setResultado] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const [respuestaAproximacion, setRespuestaAproximacion] = useState("");
  const [desafioIniciado, setDesafioIniciado] = useState(false);
  const [desafioFinalizado, setDesafioFinalizado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [aproximaciones, setAproximaciones] = useState([
    { nombre: "Grupo 1", valor: "" },
    { nombre: "Grupo 2", valor: "" },
  ]);
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
    setRespuestaSeleccionada(null);
    setRespuestaAproximacion("");
    setAproximaciones([
      { nombre: "Grupo 1", valor: "" },
      { nombre: "Grupo 2", valor: "" },
    ]);
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
  }, [desafioIniciado, desafioFinalizado, tiempoRestante, pregunta]);

  /* =========================================================
     RESULTADOS
  ========================================================= */

  const responderVerdaderoFalso = (respuesta) => {
    if (resultado) return;

    const esCorrecta = respuesta === pregunta.respuestaCorrecta;

    setRespuestaSeleccionada(respuesta);

    setResultado({
      esCorrecta,
      titulo: esCorrecta ? "¡CORRECTO!" : "INCORRECTO",
      detalle: pregunta.explicacion,
    });
  };

  const responderMultipleChoice = (opcionId) => {
    if (resultado) return;

    const esCorrecta = opcionId === pregunta.respuestaCorrecta;

    const opcionCorrecta = pregunta.opciones?.find(
      (opcion) => opcion.id === pregunta.respuestaCorrecta,
    );

    setRespuestaSeleccionada(opcionId);

    setResultado({
      esCorrecta,

      titulo: esCorrecta ? "¡CORRECTO!" : "INCORRECTO",

      respuestaCorrecta: opcionCorrecta
        ? `${opcionCorrecta.id.toUpperCase()}. ${opcionCorrecta.texto}`
        : null,

      detalle: pregunta.explicacion,
    });
  };

  const evaluarAproximacion = () => {
    if (resultado) return;

    const respuestasValidas = aproximaciones.filter(
      (grupo) => grupo.valor !== "" && !Number.isNaN(Number(grupo.valor)),
    );

    if (respuestasValidas.length < 2) {
      return;
    }

    const correcta = Number(pregunta.respuestaCorrecta);

    const resultados = respuestasValidas.map((grupo) => ({
      ...grupo,
      valor: Number(grupo.valor),
      diferencia: Math.abs(Number(grupo.valor) - correcta),
    }));

    const menorDiferencia = Math.min(
      ...resultados.map((grupo) => grupo.diferencia),
    );

    const ganadores = resultados.filter(
      (grupo) => grupo.diferencia === menorDiferencia,
    );

    setResultado({
      esCorrecta: true,
      tipo: "aproximacion",
      resultados,
      ganadores,
      respuestaCorrecta: pregunta.respuestaCorrecta,
      unidad: pregunta.unidad,
      detalle: pregunta.explicacion,
    });
  };

  const revelarPreguntaAbierta = () => {
    if (resultado) return;

    setResultado({
      esCorrecta: true,
      titulo: "¡PARTICIPACIÓN COMPLETADA!",
      detalle: pregunta.reflexion,
    });
  };
  const revelarCarreraMisteriosa = () => {
    if (resultado) return;

    setResultado({
      esperandoEvaluacion: true,

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

  const evaluarCarreraMisteriosa = (esCorrecta) => {
    setResultado((actual) => ({
      ...actual,
      esperandoEvaluacion: false,
      esCorrecta,

      titulo: esCorrecta ? "¡CORRECTO!" : "INCORRECTO",

      respuestaCorrecta: pregunta.respuestaCorrecta,
    }));
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
        return (
          <>
            {!resultado && (
              <div className="pregunta-opciones pregunta-opciones-dos">
                <button
                  type="button"
                  className="pregunta-opcion pregunta-opcion-seleccionable"
                  onClick={() => responderVerdaderoFalso(true)}
                >
                  Verdadero
                </button>

                <button
                  type="button"
                  className="pregunta-opcion pregunta-opcion-seleccionable"
                  onClick={() => responderVerdaderoFalso(false)}
                >
                  Falso
                </button>
              </div>
            )}
          </>
        );
      case "multiple-choice":
        return (
          <>
            {!resultado && (
              <div className="pregunta-opciones">
                {pregunta.opciones.map((opcion) => (
                  <button
                    type="button"
                    key={opcion.id}
                    className="pregunta-opcion pregunta-opcion-seleccionable"
                    onClick={() => responderMultipleChoice(opcion.id)}
                  >
                    <span className="pregunta-opcion-letra">
                      {opcion.id.toUpperCase()}
                    </span>

                    <span>{opcion.texto}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        );

      case "aproximacion":
        return (
          <>
            {!resultado && (
              <>
                <div className="aproximacion-grupos">
                  {aproximaciones.map((grupo, index) => (
                    <div className="aproximacion-grupo" key={index}>
                      <strong>{grupo.nombre}</strong>

                      <input
                        type="number"
                        value={grupo.valor}
                        placeholder={`Respuesta ${grupo.nombre}`}
                        onChange={(event) => {
                          const nuevos = [...aproximaciones];

                          nuevos[index] = {
                            ...nuevos[index],
                            valor: event.target.value,
                          };

                          setAproximaciones(nuevos);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={evaluarAproximacion}
                >
                  Comparar respuestas
                </button>
              </>
            )}
          </>
        );

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
      if (event.key !== "Enter" && event.code !== "Space") {
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
          <span className="pregunta-categoria">{categoria}</span>

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
                  onClick={responderVerdaderoFalso}
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
              <div className="pregunta-opciones">
                {pregunta.opciones.map((opcion) => (
                  <button
                    type="button"
                    key={opcion.id}
                    className="pregunta-opcion pregunta-opcion-seleccionable"
                    onClick={() => responderMultipleChoice(opcion.id)}
                  >
                    <span className="pregunta-opcion-letra">
                      {opcion.id.toUpperCase()}
                    </span>

                    <span>{opcion.texto}</span>
                  </button>
                ))}
              </div>
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
                  <span className="respuesta-oral-icono">?</span>

                  <div>
                    <strong>Cada equipo dice un número</strong>

                    <p>Cuando todos hayan respondido, revelá la respuesta.</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={evaluarAproximacion}
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
                    <div key={index} className="carrera-pista">
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
                  Cuando estés listo, presioná el botón. Vas a tener{" "}
                  {duracionDesafio} segundos.
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

            {desafioIniciado && !desafioFinalizado && !resultado && (
              <div className="desafio-contador">
                <span className="desafio-contador-numero">
                  {tiempoRestante}
                </span>

                <span className="desafio-contador-texto">
                  {tiempoRestante === 1 ? "segundo" : "segundos"}
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
        <span className="pregunta-categoria">{categoria}</span>

        <h2 className="pregunta-titulo">{pregunta.pregunta}</h2>

        {renderContenido()}
        {resultado?.tipo === "aproximacion" && (
          <div className="aproximacion-resultado">
            <h3>
              Respuesta correcta: {resultado.respuestaCorrecta}{" "}
              {resultado.unidad ?? ""}
            </h3>

            {resultado.resultados.map((grupo, index) => (
              <p key={index}>
                <strong>{grupo.nombre}:</strong> {grupo.valor}
                {" — "}
                diferencia: {grupo.diferencia}
              </p>
            ))}

            <h3>
              {resultado.ganadores.length === 1
                ? `🏆 ${resultado.ganadores[0].nombre} estuvo más cerca`
                : `EMPATE: ${resultado.ganadores
                    .map((grupo) => grupo.nombre)
                    .join(" y ")}`}
            </h3>
          </div>
        )}
        {resultado && (
          <div
            className={`pregunta-resultado ${
              resultado.esCorrecta
                ? "pregunta-resultado-correcto"
                : "pregunta-resultado-incorrecto"
            }`}
          >
            <h3>{resultado.titulo}</h3>

            {resultado.respuestaCorrecta && (
              <p>
                <strong>Respuesta correcta:</strong>{" "}
                {resultado.respuestaCorrecta}
                {resultado.unidad ? ` ${resultado.unidad}` : ""}
              </p>
            )}

            <p>{resultado.detalle}</p>

            {resultado.esperandoEvaluacion && (
              <div className="carrera-evaluacion">
                <p>¿Respondió correctamente?</p>

                <div className="carrera-evaluacion-botones">
                  <button
                    type="button"
                    onClick={() => evaluarCarreraMisteriosa(true)}
                  >
                    ✓ Sí, respondió correctamente
                  </button>

                  <button
                    type="button"
                    onClick={() => evaluarCarreraMisteriosa(false)}
                  >
                    ✕ No, respondió incorrectamente
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {resultado && !resultado.esperandoEvaluacion && (
          <button
            type="button"
            className="pregunta-boton pregunta-boton-principal"
            onClick={onVolver}
          >
            Finalizar participación
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
