import { useEffect, useRef, useState } from "react";
import "./Ruleta.css";

import ruletaImg from "../assets/ruleta.svg";
import logoColor from "../assets/logocolor.png";

import tickSound from "../assets/tic.mp3";
import winSound from "../assets/win.mp3";

import { Pregunta } from "./Pregunta";

const opciones = [
  "Verdadero o falso",
  "Multiple choice",
  "Aproximación",
  "Pregunta abierta",
  "Carrera misteriosa",
  "Desafío rápido",
  "Volvé a girar",
  "Doble chance",
  "Elegí a alguien",
];

const categoriasConPreguntas = [
  "Verdadero o falso",
  "Multiple choice",
  "Aproximación",
  "Pregunta abierta",
  "Carrera misteriosa",
  "Desafío rápido",
];

const categoriasEspeciales = [
  "Volvé a girar",
  "Doble chance",
  "Elegí a alguien",
];

const SECTOR = 360 / opciones.length;
const DURACION_GIRO = 4200;

/*
 * El diseño del SVG está desplazado dos sectores respecto
 * del punto de inicio usado por JavaScript.
 */
const AJUSTE_PUNTERO = -SECTOR * 2;

const normalizarAngulo = (angulo) => {
  return ((angulo % 360) + 360) % 360;
};

const obtenerClaseCategoria = (categoria) => {
  const clases = {
    "Verdadero o falso": "categoria-vf",
    "Multiple choice": "categoria-multiple",
    Aproximación: "categoria-aproximacion",
    "Pregunta abierta": "categoria-abierta",
    "Carrera misteriosa": "categoria-carrera",
    "Desafío rápido": "categoria-desafio",
  };

  return clases[categoria] ?? "";
};

export function Ruleta({
  preguntasPorCategoria = {},
}) {

  const [rotation, setRotation] = useState(0);
  const [girando, setGirando] = useState(false);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [resultadoEspecial, setResultadoEspecial] = useState(null);

  const ruletaRef = useRef(null);
  const rotationRef = useRef(0);
  const girandoRef = useRef(false);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const audioCtxRef = useRef(null);
  const tickBufferRef = useRef(null);
  const winBufferRef = useRef(null);
  const ultimoSectorRef = useRef(null);
  const sonidosListosRef = useRef(false);

  const ultimaPreguntaPorCategoriaRef = useRef({});

  useEffect(() => {
    ultimaPreguntaPorCategoriaRef.current = {};

    setCategoriaSeleccionada(null);
    setPreguntaActual(null);
    setMostrarPregunta(false);
    setResultadoEspecial(null);
  }, [preguntasPorCategoria]);

  const cargarBuffer = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No se pudo cargar el sonido: ${url}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return audioCtxRef.current.decodeAudioData(arrayBuffer);
  };

  const activarAudio = async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }
  };

  const reproducir = async (buffer, volume = 0.7) => {
    if (!buffer) return;

    try {
      await activarAudio();

      const source = audioCtxRef.current.createBufferSource();
      const gain = audioCtxRef.current.createGain();

      source.buffer = buffer;
      gain.gain.value = volume;

      source.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      source.start(0);
    } catch (error) {
      console.error("No se pudo reproducir el sonido:", error);
    }
  };

  const playTick = () => {
    reproducir(tickBufferRef.current, 0.55);
  };

  const playWin = () => {
    reproducir(winBufferRef.current, 0.85);
  };

  useEffect(() => {
    const prepararSonidos = async () => {
      try {
        audioCtxRef.current = new AudioContext();

        const [tickBuffer, winBuffer] = await Promise.all([
          cargarBuffer(tickSound),
          cargarBuffer(winSound),
        ]);

        tickBufferRef.current = tickBuffer;
        winBufferRef.current = winBuffer;
        sonidosListosRef.current = true;
      } catch (error) {
        console.error("No se pudieron preparar los sonidos:", error);

        /*
         * La ruleta puede seguir funcionando aunque fallen
         * los archivos de audio.
         */
        sonidosListosRef.current = true;
      }
    };

    prepararSonidos();

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);

      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const getCurrentAngle = () => {
    const element = ruletaRef.current;

    if (!element) return 0;

    const transform = window.getComputedStyle(element).transform;

    if (!transform || transform === "none") return 0;

    const matrix2D = transform.match(/matrix\((.+)\)/);

    if (matrix2D) {
      const values = matrix2D[1].split(",").map(Number);
      const [a, b] = values;

      let angle = Math.atan2(b, a) * (180 / Math.PI);

      if (angle < 0) {
        angle += 360;
      }

      return angle;
    }

    const matrix3D = transform.match(/matrix3d\((.+)\)/);

    if (matrix3D) {
      const values = matrix3D[1].split(",").map(Number);

      const a = values[0];
      const b = values[1];

      let angle = Math.atan2(b, a) * (180 / Math.PI);

      if (angle < 0) {
        angle += 360;
      }

      return angle;
    }

    return 0;
  };

  const escucharCrucesDeSector = () => {
    const angle = getCurrentAngle();
    const sectorActual = Math.floor(angle / SECTOR);

    if (
      ultimoSectorRef.current !== null &&
      sectorActual !== ultimoSectorRef.current
    ) {
      playTick();
    }

    ultimoSectorRef.current = sectorActual;

    if (girandoRef.current) {
      rafRef.current = requestAnimationFrame(escucharCrucesDeSector);
    }
  };

  const obtenerIndiceGanador = (rotacionFinal) => {
    const anguloNormalizado = normalizarAngulo(rotacionFinal);

    const anguloBajoPuntero = normalizarAngulo(
      360 - anguloNormalizado + AJUSTE_PUNTERO,
    );

    const indice = Math.floor(anguloBajoPuntero / SECTOR);

    return indice % opciones.length;
  };

  const obtenerPreguntaAleatoria = (categoria) => {
    const preguntasDisponibles =
      preguntasPorCategoria[categoria] ?? [];

    if (preguntasDisponibles.length === 0) {
      return null;
    }

    if (preguntasDisponibles.length === 1) {
      const unicaPregunta = preguntasDisponibles[0];

      ultimaPreguntaPorCategoriaRef.current[categoria] =
        unicaPregunta.id;

      return unicaPregunta;
    }

    const ultimaPreguntaId =
      ultimaPreguntaPorCategoriaRef.current[categoria];

    const preguntasSinLaUltima = preguntasDisponibles.filter(
      (pregunta) => pregunta.id !== ultimaPreguntaId,
    );

    const indiceAleatorio = Math.floor(
      Math.random() * preguntasSinLaUltima.length,
    );

    const preguntaSeleccionada =
      preguntasSinLaUltima[indiceAleatorio];

    ultimaPreguntaPorCategoriaRef.current[categoria] =
      preguntaSeleccionada.id;

    return preguntaSeleccionada;
  };

  const abrirPreguntaDeCategoria = (categoria) => {
    const preguntaSeleccionada =
      obtenerPreguntaAleatoria(categoria);

    setCategoriaSeleccionada(categoria);
    setPreguntaActual(preguntaSeleccionada);
    setResultadoEspecial(null);
    setMostrarPregunta(true);
  };

  const elegirCategoriaEspecial = (categoria) => {
    abrirPreguntaDeCategoria(categoria);
  };

  const abrirResultadoEspecial = (categoria) => {
    const resultados = {
      "Volvé a girar": {
        tipo: "volver-girar",
        titulo: "¡Volvé a girar!",
        descripcion:
          "Tenés una nueva oportunidad. Volvé a la ruleta y realizá otro giro.",
        textoBoton: "Volver a la ruleta",
      },

      "Doble chance": {
        tipo: "elegir-categoria",
        titulo: "¡Felicitaciones! Ganaste doble premio",
        descripcion:
          "Este comodín duplica tu premio, sin importar si la próxima respuesta es correcta o incorrecta. Ahora elegí la categoría que quieras responder.",
      },

      "Elegí a alguien": {
        tipo: "elegir-categoria",
        titulo: "¡Elegí a alguien!",
        descripcion:
          "Elegí a una persona para que responda por vos. La persona elegida también podrá seleccionar la categoría que quiera responder.",
      },
    };

    setCategoriaSeleccionada(categoria);
    setPreguntaActual(null);
    setResultadoEspecial(resultados[categoria]);
    setMostrarPregunta(true);
  };

  const procesarCategoriaGanadora = (categoria) => {
    if (categoriasEspeciales.includes(categoria)) {
      abrirResultadoEspecial(categoria);
      return;
    }

    abrirPreguntaDeCategoria(categoria);
  };

  const girarRuleta = async () => {
    if (
      girandoRef.current ||
      mostrarPregunta ||
      !sonidosListosRef.current
    ) {
      return;
    }

    await activarAudio();

    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);

    girandoRef.current = true;
    setGirando(true);

    /*
     * Evita que el puntero quede exactamente entre dos sectores.
     */
    const margenSector = Math.min(4, SECTOR * 0.1);

    const sectorAleatorio = Math.floor(
      Math.random() * opciones.length,
    );

    const posicionDentroDelSector =
      sectorAleatorio * SECTOR +
      margenSector +
      Math.random() * (SECTOR - margenSector * 2);

    const rotacionObjetivo = normalizarAngulo(
      360 - posicionDentroDelSector + AJUSTE_PUNTERO,
    );

    const rotacionActualNormalizada =
      normalizarAngulo(rotationRef.current);

    const desplazamientoHastaObjetivo = normalizarAngulo(
      rotacionObjetivo - rotacionActualNormalizada,
    );

    const vueltasCompletas = 360 * 6;

    const nuevaRotacion =
      rotationRef.current +
      vueltasCompletas +
      desplazamientoHastaObjetivo;

    rotationRef.current = nuevaRotacion;
    ultimoSectorRef.current = null;

    playTick();
    setRotation(nuevaRotacion);

    rafRef.current = requestAnimationFrame(
      escucharCrucesDeSector,
    );

    timerRef.current = setTimeout(() => {
      girandoRef.current = false;
      setGirando(false);

      cancelAnimationFrame(rafRef.current);
      playWin();

      const indiceGanador =
        obtenerIndiceGanador(nuevaRotacion);

      const categoriaGanadora = opciones[indiceGanador];

      procesarCategoriaGanadora(categoriaGanadora);
    }, DURACION_GIRO);
  };

  const volverALaRuleta = () => {
    setMostrarPregunta(false);
    setCategoriaSeleccionada(null);
    setPreguntaActual(null);
    setResultadoEspecial(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const elementoActivo = document.activeElement;
      const etiquetaActiva =
        elementoActivo?.tagName?.toLowerCase();

      const estaEscribiendo =
        etiquetaActiva === "input" ||
        etiquetaActiva === "textarea" ||
        etiquetaActiva === "select";

      if (estaEscribiendo || mostrarPregunta) {
        return;
      }

      if (
        event.key === "Enter" ||
        event.code === "Space"
      ) {
        event.preventDefault();
        girarRuleta();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [mostrarPregunta]);

  if (mostrarPregunta && resultadoEspecial) {
    return (
      <div className="ruleta-container">
        <div className="pregunta-pantalla">
          <div className="pregunta-card pregunta-card-especial">
            <span className="pregunta-categoria">
              {categoriaSeleccionada}
            </span>

            <h2 className="pregunta-titulo">
              {resultadoEspecial.titulo}
            </h2>

            <p className="resultado-especial-descripcion">
              {resultadoEspecial.descripcion}
            </p>

            {resultadoEspecial.tipo ===
            "elegir-categoria" ? (
              <>
                <h3 className="seleccion-categoria-titulo">
                  Elegí una categoría
                </h3>

                <div className="seleccion-categorias">
                  {categoriasConPreguntas.map(
                    (categoria) => (
                      <button
                        key={categoria}
                        type="button"
                        className={`seleccion-categoria-chip ${obtenerClaseCategoria(
                          categoria,
                        )}`}
                        onClick={() =>
                          elegirCategoriaEspecial(
                            categoria,
                          )
                        }
                      >
                        {categoria}
                      </button>
                    ),
                  )}
                </div>
              </>
            ) : (
              <button
                type="button"
                className="pregunta-boton pregunta-boton-principal"
                onClick={volverALaRuleta}
              >
                {resultadoEspecial.textoBoton}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (mostrarPregunta) {
    return (
      <div className="ruleta-container">
        <Pregunta
          categoria={categoriaSeleccionada}
          pregunta={preguntaActual}
          onVolver={volverALaRuleta}
        />
      </div>
    );
  }

  return (
    <div className="ruleta-container">

      <div
        className={`ruleta-stage ${
          girando ? "ruleta-stage-girando" : ""
        }`}
        role="button"
        tabIndex={0}
        aria-label={
          girando
            ? "La ruleta está girando"
            : "Girar la ruleta"
        }
        aria-disabled={girando}
        onClick={girarRuleta}
        onPointerDown={activarAudio}
      >
        <div className="puntero" />

        <div className="borde-luces">
          {opciones.map((opcion, index) => (
            <span
              key={opcion}
              style={{
                "--angle": `${
                  index * SECTOR + SECTOR / 2
                }deg`,
              }}
            />
          ))}
        </div>

        <img
          ref={ruletaRef}
          src={ruletaImg}
          alt="Ruleta de preguntas"
          className="ruleta-img"
          draggable="false"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        />

        <div className="centro-fijo">
          <img
            src={logoColor}
            alt="Siglo 21"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}