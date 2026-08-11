import { useEffect, useState } from "react";
import logoBlanco from "../assets/logo-blanco-sin-fondo.png";

export function Pregunta({ categoria, pregunta, onVolver }) {
  const [respuesta, setRespuesta] = useState("");
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const [respuestasAproximacion, setRespuestasAproximacion] = useState([
    "",
    "",
  ]);

  const [resultado, setResultado] = useState(null);

  const [desafioIniciado, setDesafioIniciado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(5);
  const [desafioFinalizado, setDesafioFinalizado] = useState(false);

  useEffect(() => {
    setRespuesta("");
    setRespuestaSeleccionada(null);
    setRespuestasAproximacion(["", ""]);
    setResultado(null);

    setDesafioIniciado(false);
    setTiempoRestante(5);
    setDesafioFinalizado(false);
  }, [pregunta]);

  useEffect(() => {
    if (!desafioIniciado || desafioFinalizado) {
      return;
    }

    if (tiempoRestante <= 0) {
      setDesafioFinalizado(true);
      return;
    }

    const timer = setTimeout(() => {
      setTiempoRestante((actual) => actual - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [desafioIniciado, desafioFinalizado, tiempoRestante]);

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

  const normalizarTexto = (texto = "") => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,;:¿?¡!()]/g, "")
      .trim()
      .replace(/\s+/g, " ");
  };

  const comprobarVerdaderoFalso = (valor) => {
    if (resultado) return;

    setRespuestaSeleccionada(valor);

    const esCorrecta = valor === pregunta.respuestaCorrecta;

    setResultado({
      esCorrecta,
      titulo: esCorrecta ? "¡Respuesta correcta!" : "Respuesta incorrecta",
      detalle: pregunta.explicacion,
    });
  };

  const comprobarMultipleChoice = () => {
    if (!respuestaSeleccionada || resultado) return;

    const esCorrecta =
      respuestaSeleccionada === pregunta.respuestaCorrecta;

    setResultado({
      esCorrecta,
      titulo: esCorrecta ? "¡Respuesta correcta!" : "Respuesta incorrecta",
      detalle: pregunta.explicacion,
    });
  };

  const actualizarRespuestaAproximacion = (index, valor) => {
    if (resultado && !resultado.esError) return;

    setRespuestasAproximacion((actuales) =>
      actuales.map((respuestaActual, i) =>
        i === index ? valor : respuestaActual,
      ),
    );
  };

  const agregarRespuestaAproximacion = () => {
    if (resultado && !resultado.esError) return;

    setRespuestasAproximacion((actuales) => {
      if (actuales.length >= 4) {
        return actuales;
      }

      return [...actuales, ""];
    });
  };

  const comprobarAproximacion = () => {
    if (resultado && !resultado.esError) return;

    const respuestasNumericas = respuestasAproximacion.map((valor) =>
      valor === "" ? null : Number(valor),
    );

    const hayRespuestasInvalidas = respuestasNumericas.some(
      (valor) => valor === null || Number.isNaN(valor),
    );

    if (hayRespuestasInvalidas) {
      setResultado({
        esCorrecta: false,
        esError: true,
        titulo: "Completá todas las respuestas",
        detalle: "Cada participante o equipo debe ingresar un número.",
      });

      return;
    }

    const resultados = respuestasNumericas.map((valor, index) => ({
      participante: index + 1,
      respuesta: valor,
      diferencia: Math.abs(valor - pregunta.respuestaCorrecta),
    }));

    const menorDiferencia = Math.min(
      ...resultados.map((item) => item.diferencia),
    );

    const ganadores = resultados.filter(
      (item) => item.diferencia === menorDiferencia,
    );

    const hayRespuestaExacta = menorDiferencia === 0;

    let titulo;

    if (ganadores.length > 1) {
      titulo = hayRespuestaExacta
        ? "¡Hay empate con la respuesta exacta!"
        : "¡Hay empate!";
    } else if (hayRespuestaExacta) {
      titulo = `¡El equipo ${ganadores[0].participante} acertó exactamente!`;
    } else {
      titulo = `¡El equipo ${ganadores[0].participante} estuvo más cerca!`;
    }

    setResultado({
      esCorrecta: true,
      titulo,
      detalle: pregunta.explicacion,
      respuestaCorrecta: pregunta.respuestaCorrecta,
      unidad: pregunta.unidad,
    });
  };

  const comprobarCarreraMisteriosa = async () => {
    if (!respuesta.trim() || resultado) return;

    const respuestaNormalizada = normalizarTexto(respuesta);

    const coincideLocalmente = pregunta.respuestasAceptadas.some(
      (respuestaAceptada) =>
        normalizarTexto(respuestaAceptada) === respuestaNormalizada,
    );

    if (coincideLocalmente) {
      setResultado({
        esCorrecta: true,
        titulo: "¡Respuesta correcta!",
        detalle: pregunta.explicacion,
        respuestaCorrecta: pregunta.respuestaCorrecta,
      });

      return;
    }

    try {
      setResultado({
        esCorrecta: false,
        esCargando: true,
        titulo: "Analizando respuesta...",
      });

      const response = await fetch(
        "https://back.universidadsiglo21online.com/validar-carrera",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            respuestaUsuario: respuesta,
            respuestaCorrecta: pregunta.respuestaCorrecta,
            respuestasAceptadas: pregunta.respuestasAceptadas,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "No se pudo validar la respuesta.",
        );
      }

      setResultado({
        esCorrecta: data.correcta,
        titulo: data.correcta
          ? "¡Respuesta correcta!"
          : "Respuesta incorrecta",
        detalle: data.correcta
          ? pregunta.explicacion
          : data.motivo ||
            "La respuesta no identifica la carrera esperada.",
        respuestaCorrecta: pregunta.respuestaCorrecta,
      });
    } catch (error) {
      console.error("Error validando con IA:", error);

      setResultado({
        esCorrecta: false,
        esError: true,
        titulo: "No se pudo validar la respuesta",
        detalle:
          "Revisá que el backend esté encendido e intentá nuevamente.",
      });
    }
  };

  const registrarRespuestaAbierta = () => {
    if (resultado) return;

    setResultado({
      esCorrecta: true,
      titulo: "Para reflexionar",
      detalle: pregunta.reflexion,
    });
  };

  const iniciarDesafio = () => {
    if (desafioIniciado || resultado) return;

    setTiempoRestante(5);
    setDesafioIniciado(true);
    setDesafioFinalizado(false);
  };

  const validarDesafio = (cumplido) => {
    if (resultado) return;

    setResultado({
      esCorrecta: cumplido,
      titulo: cumplido
        ? "¡Desafío cumplido!"
        : "Desafío no cumplido",
      detalle: pregunta.explicacion,
    });
  };

  const limpiarErrorAproximacion = () => {
    if (resultado?.esError) {
      setResultado(null);
    }
  };

  const renderContenido = () => {
    switch (pregunta.tipo) {
      case "verdadero-falso":
        return (
          <div className="pregunta-opciones pregunta-opciones-dos">
            <button
              type="button"
              className={`pregunta-opcion ${
                respuestaSeleccionada === true
                  ? "pregunta-opcion-seleccionada"
                  : ""
              }`}
              onClick={() => comprobarVerdaderoFalso(true)}
              disabled={Boolean(resultado)}
            >
              Verdadero
            </button>

            <button
              type="button"
              className={`pregunta-opcion ${
                respuestaSeleccionada === false
                  ? "pregunta-opcion-seleccionada"
                  : ""
              }`}
              onClick={() => comprobarVerdaderoFalso(false)}
              disabled={Boolean(resultado)}
            >
              Falso
            </button>
          </div>
        );

      case "multiple-choice":
        return (
          <>
            <div className="pregunta-opciones">
              {pregunta.opciones.map((opcion) => (
                <button
                  key={opcion.id}
                  type="button"
                  className={`pregunta-opcion ${
                    respuestaSeleccionada === opcion.id
                      ? "pregunta-opcion-seleccionada"
                      : ""
                  }`}
                  onClick={() => {
                    if (!resultado) {
                      setRespuestaSeleccionada(opcion.id);
                    }
                  }}
                  disabled={Boolean(resultado)}
                >
                  <span className="pregunta-opcion-letra">
                    {opcion.id.toUpperCase()}
                  </span>

                  <span>{opcion.texto}</span>
                </button>
              ))}
            </div>

            {!resultado && (
              <button
                type="button"
                className="pregunta-boton pregunta-boton-principal"
                onClick={comprobarMultipleChoice}
                disabled={!respuestaSeleccionada}
              >
                Comprobar respuesta
              </button>
            )}
          </>
        );

      case "aproximacion":
        return (
          <>
            <div className="aproximacion-respuestas">
              {respuestasAproximacion.map((valor, index) => (
                <label key={index} className="aproximacion-campo">
                  <span>Equipo {index + 1}</span>

                  <div className="aproximacion-input-wrapper">
                    <input
                      type="number"
                      value={valor}
                      placeholder="Ingresá un número"
                      onChange={(event) => {
                        limpiarErrorAproximacion();

                        actualizarRespuestaAproximacion(
                          index,
                          event.target.value,
                        );
                      }}
                      disabled={Boolean(
                        resultado && !resultado.esError,
                      )}
                    />

                    {pregunta.unidad && (
                      <span className="aproximacion-unidad">
                        {pregunta.unidad}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {!resultado || resultado.esError ? (
              <div className="pregunta-acciones">
                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-secundario"
                  onClick={agregarRespuestaAproximacion}
                  disabled={respuestasAproximacion.length >= 4}
                >
                  {respuestasAproximacion.length >= 4
                    ? "Máximo 4 equipos"
                    : "Agregar equipo"}
                </button>

                <button
                  type="button"
                  className="pregunta-boton pregunta-boton-principal"
                  onClick={comprobarAproximacion}
                >
                  Comprobar respuestas
                </button>
              </div>
            ) : null}
          </>
        );

      case "pregunta-abierta":
        return (
          <>
            <p className="pregunta-oral-indicacion">
              Respondé la consigna en voz alta.
            </p>

            {!resultado && (
              <button
                type="button"
                className="pregunta-boton pregunta-boton-principal"
                onClick={registrarRespuestaAbierta}
              >
                Ver reflexión
              </button>
            )}
          </>
        );

      case "carrera-misteriosa":
        return (
          <>
            <div className="carrera-pistas">
              {pregunta.pistas.map((pista, index) => (
                <div key={index} className="carrera-pista">
                  <span>{index + 1}</span>
                  <p>{pista}</p>
                </div>
              ))}
            </div>

            <input
              type="text"
              className="pregunta-input"
              value={respuesta}
              placeholder="Escribí el nombre de la carrera"
              onChange={(event) =>
                setRespuesta(event.target.value)
              }
              disabled={Boolean(resultado)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  comprobarCarreraMisteriosa();
                }
              }}
            />

            {!resultado && (
              <button
                type="button"
                className="pregunta-boton pregunta-boton-principal"
                onClick={comprobarCarreraMisteriosa}
                disabled={!respuesta.trim()}
              >
                Comprobar respuesta
              </button>
            )}
          </>
        );

      case "desafio-rapido":
        return (
          <>
            {!desafioIniciado && !resultado && (
              <>
                <p className="desafio-indicacion">
                  Cuando estés listo, iniciá el desafío.
                  Vas a tener 5 segundos.
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
                    segundos
                  </span>
                </div>
              )}

            {desafioFinalizado && !resultado && (
              <>
                <div className="desafio-tiempo-finalizado">
                  ¡Tiempo!
                </div>

                <p className="desafio-indicacion">
                  ¿Pudiste completar el desafío?
                </p>

                <div className="pregunta-opciones pregunta-opciones-dos">
                  <button
                    type="button"
                    className="pregunta-opcion"
                    onClick={() => validarDesafio(true)}
                  >
                    Desafío cumplido
                  </button>

                  <button
                    type="button"
                    className="pregunta-opcion"
                    onClick={() => validarDesafio(false)}
                  >
                    No cumplido
                  </button>
                </div>
              </>
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
          <div
            className={`pregunta-resultado ${
              resultado.esCargando
                ? "pregunta-resultado-cargando"
                : resultado.esError
                  ? "pregunta-resultado-error"
                  : resultado.esCorrecta
                    ? "pregunta-resultado-correcto"
                    : "pregunta-resultado-incorrecto"
            }`}
          >
            <h3>{resultado.titulo}</h3>

            {resultado.respuestaCorrecta !==
              undefined && (
              <p>
                <strong>Respuesta correcta:</strong>{" "}
                {resultado.respuestaCorrecta}{" "}
                {resultado.unidad ?? ""}
              </p>
            )}

            <p>{resultado.detalle}</p>
          </div>
        )}

        {resultado && !resultado.esError && (
          <button
            type="button"
            className="pregunta-boton pregunta-boton-principal"
            onClick={onVolver}
          >
            Volver a la ruleta
          </button>
        )}

        <img
          src={logoBlanco}
          alt="Universidad Siglo 21"
          className="pregunta-logo pregunta-logo-inferior"
        />
      </div>
    </div>
  );
}