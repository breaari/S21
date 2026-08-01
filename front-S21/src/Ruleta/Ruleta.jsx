import { useEffect, useRef, useState } from "react";
import "./Ruleta.css";

import ruletaImg from "../assets/ruleta.svg";
import logoColor from "../assets/logocolor.png";

import tickSound from "../assets/tic.mp3";
import winSound from "../assets/win.mp3";

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

const SECTOR = 360 / opciones.length;
const DURACION_GIRO = 4200;

export function Ruleta() {
  const [rotation, setRotation] = useState(0);
  const [girando, setGirando] = useState(false);

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

  const cargarBuffer = async (url) => {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    return await audioCtxRef.current.decodeAudioData(arrayBuffer);
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

    await activarAudio();

    const source = audioCtxRef.current.createBufferSource();
    const gain = audioCtxRef.current.createGain();

    source.buffer = buffer;
    gain.gain.value = volume;

    source.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    source.start(0);
  };

  const playTick = () => {
    reproducir(tickBufferRef.current, 0.55);
  };

  const playWin = () => {
    reproducir(winBufferRef.current, 0.85);
  };

  useEffect(() => {
    const prepararSonidos = async () => {
      audioCtxRef.current = new AudioContext();

      const [tickBuffer, winBuffer] = await Promise.all([
        cargarBuffer(tickSound),
        cargarBuffer(winSound),
      ]);

      tickBufferRef.current = tickBuffer;
      winBufferRef.current = winBuffer;
      sonidosListosRef.current = true;
    };
    prepararSonidos();

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  const getCurrentAngle = () => {
    const el = ruletaRef.current;
    if (!el) return 0;

    const transform = window.getComputedStyle(el).transform;
    if (!transform || transform === "none") return 0;

    const values = transform.match(/matrix\((.+)\)/);
    if (!values) return 0;

    const [a, b] = values[1].split(",").map(parseFloat);
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    if (angle < 0) angle += 360;

    return angle;
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

  const girarRuleta = async () => {
    if (girandoRef.current || !sonidosListosRef.current) return;

    await activarAudio();

    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);

    girandoRef.current = true;
    setGirando(true);

    const vueltas = 360 * 6;
    const extra = Math.floor(Math.random() * 360);
    const nuevaRotacion = rotationRef.current + vueltas + extra;

    rotationRef.current = nuevaRotacion;
    ultimoSectorRef.current = null;

    playTick();
    setRotation(nuevaRotacion);

    requestAnimationFrame(() => {
      escucharCrucesDeSector();
    });

    timerRef.current = setTimeout(() => {
      playWin();

      girandoRef.current = false;
      setGirando(false);
      cancelAnimationFrame(rafRef.current);
    }, DURACION_GIRO);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        girarRuleta();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="ruleta-container">
      <div
        className="ruleta-stage"
        role="button"
        tabIndex={0}
        onClick={girarRuleta}
        onPointerDown={activarAudio}
      >
        <div className="puntero" />

        <div className="borde-luces">
          {opciones.map((_, i) => (
            <span
              key={i}
              style={{
                "--angle": `${i * SECTOR + SECTOR / 2}deg`,
              }}
            />
          ))}
        </div>

        <img
          ref={ruletaRef}
          src={ruletaImg}
          alt="Ruleta"
          className="ruleta-img"
          draggable="false"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        />

        <div className="centro-fijo">
          <img src={logoColor} alt="Siglo 21" draggable="false" />
        </div>
      </div>
    </div>
  );
}
