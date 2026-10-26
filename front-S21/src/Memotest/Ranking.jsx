import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
import tickSound from "../assets/tic.mp3";
import winSound from "../assets/win.mp3";
import "./Ranking.css";

const API_URL = import.meta.env.PROD ? "" : `http://${window.location.hostname}:3003`;
const formatoResultado = (p) =>
  `${p.tiempoSegundos.toFixed(1).replace(".", ",")} s · ${p.movimientos} movimientos`;

export function RankingMemotest() {
  const [jugadores, setJugadores] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [animacion, setAnimacion] = useState(null);
  const [estado, setEstado] = useState("Conectando...");


  const listaRef = useRef(null);
  const vistos = useRef(new Set());
  const inicializado = useRef(false);
  const anterioresRef = useRef(null);
  const audioCtx = useRef(null);
  const buffers = useRef({});

  const activarSonido = async () => {
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      await audioCtx.current.resume();
      const cargar = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se pudo cargar el audio");
        return audioCtx.current.decodeAudioData(await response.arrayBuffer());
      };
      const [tic, win] = await Promise.all([cargar(tickSound), cargar(winSound)]);
      buffers.current = { tic, win };

    } catch (error) {
      console.error("No se pudo activar el sonido del ranking:", error);

    }
  };

  const reproducir = (tipo) => {
    if (!audioCtx.current || audioCtx.current.state !== "running" || !buffers.current[tipo]) return;
    const source = audioCtx.current.createBufferSource();
    const gain = audioCtx.current.createGain();
    source.buffer = buffers.current[tipo];
    gain.gain.value = tipo === "tic" ? 0.48 : 0.72;
    source.connect(gain);
    gain.connect(audioCtx.current.destination);
    source.start();
  };

  // Intentamos preparar el audio al abrir; los navegadores que bloquean autoplay
  // lo desbloquearán en la primera interacción, sin botón visible.
  useEffect(() => {
    activarSonido();
    const desbloquear = () => activarSonido();
    window.addEventListener("pointerdown", desbloquear, { once: true });
    window.addEventListener("keydown", desbloquear, { once: true });
    return () => {
      window.removeEventListener("pointerdown", desbloquear);
      window.removeEventListener("keydown", desbloquear);
    };
  }, []);

  const cargar = useCallback(async (anunciar = false) => {
    const { data } = await axios.get(`${API_URL}/memotest/ranking`, { timeout: 15000 });
    const nuevos = data.ranking.filter((p) => !vistos.current.has(p.id));
    data.ranking.forEach((p) => vistos.current.add(p.id));
    setJugadores(data.ranking);
    setEstado("EN VIVO");
    if (inicializado.current && anunciar && nuevos.length) {
      setPendientes((prev) => [...prev, ...nuevos.map((p) => p.id)]);
    }
    inicializado.current = true;
  }, []);

  useEffect(() => {
    let cerrado = false;
    let fuente;
    const comenzar = async () => {
      try { await cargar(false); } catch { setEstado("Sin conexión"); }
      if (cerrado) return;
      fuente = new EventSource(`${API_URL}/memotest/ranking/eventos`);
      fuente.onopen = () => cargar(true).catch(() => setEstado("Reconectando..."));
      fuente.addEventListener("finalizado", () => cargar(true).catch(() => setEstado("Reconectando...")));
      fuente.onerror = () => setEstado("Reconectando...");
    };
    comenzar();
    const revision = setInterval(() => cargar(true).catch(() => setEstado("Reconectando...")), 15000);
    return () => { cerrado = true; fuente?.close(); clearInterval(revision); };
  }, [cargar]);

  useEffect(() => {
    if (animacion || !pendientes.length || !jugadores.length) return;
    const id = pendientes[0];
    const jugador = jugadores.find((p) => p.id === id);
    setPendientes((actual) => actual.slice(1));
    if (jugador) {
      setAnimacion({ id, indice: jugadores.length - 1, destino: jugador.puesto - 1, fase: "inicio" });
    }
  }, [animacion, pendientes, jugadores]);

  // FLIP: animar las posiciones reales de las filas, sin saltos de layout.
  useLayoutEffect(() => {
    if (!anterioresRef.current) return;
    const anteriores = anterioresRef.current;
    anterioresRef.current = null;
    const filas = listaRef.current?.querySelectorAll("[data-ranking-id]") || [];
    filas.forEach((fila) => {
      const anterior = anteriores.get(fila.dataset.rankingId);
      if (anterior == null) return;
      const distancia = anterior - fila.offsetTop;
      if (Math.abs(distancia) < 1) return;
      fila.animate(
        [{ transform: `translateY(${distancia}px)` }, { transform: "translateY(0)" }],
        { duration: 225, easing: "cubic-bezier(.2,.7,.25,1)" },
      );
    });
  }, [animacion?.indice]);

  useEffect(() => {
    if (!animacion) return;
    const lista = listaRef.current;
    if (animacion.fase === "inicio") {
      lista?.scrollTo({ top: lista.scrollHeight, behavior: "instant" });
      const timer = setTimeout(() => setAnimacion((actual) => actual && { ...actual, fase: "ascenso" }), 350);
      return () => clearTimeout(timer);
    }
    if (animacion.fase === "ascenso") {
      if (animacion.indice > animacion.destino) {
        const timer = setTimeout(() => {
          const antes = new Map();
          lista?.querySelectorAll("[data-ranking-id]").forEach((fila) =>
            antes.set(fila.dataset.rankingId, fila.offsetTop),
          );
          anterioresRef.current = antes;
          reproducir("tic");
          setAnimacion((actual) => actual && {
            ...actual,
            indice: Math.max(actual.destino, actual.indice - 1),
          });
        }, 210);
        return () => clearTimeout(timer);
      }
      reproducir("win");
      const timer = setTimeout(() => setAnimacion((actual) => actual && { ...actual, fase: "final" }), 1100);
      return () => clearTimeout(timer);
    }
    if (animacion.fase === "final") {
      const timer = setTimeout(() => {
        setAnimacion(null);
        lista?.scrollTo({ top: 0, behavior: "smooth" });
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [animacion]);

  // Mantener al jugador visible a medida que asciende.
  useEffect(() => {
    if (!animacion || animacion.fase !== "ascenso") return;
    const lista = listaRef.current;
    const fila = document.getElementById(`ranking-${animacion.id}`);
    if (!lista || !fila) return;
    const centro = fila.offsetTop - lista.offsetTop - (lista.clientHeight - fila.clientHeight) / 2;
    if (fila.offsetTop - lista.offsetTop < lista.scrollTop + lista.clientHeight * 0.25) {
      lista.scrollTo({ top: Math.max(0, centro), behavior: "smooth" });
    }
  }, [animacion?.indice, animacion?.fase, animacion?.id]);

  const podio = jugadores.slice(0, 3);
  const visibles = [...jugadores];
  if (animacion) {
    const posicionReal = visibles.findIndex((p) => p.id === animacion.id);
    if (posicionReal !== -1) {
      const [jugador] = visibles.splice(posicionReal, 1);
      visibles.splice(animacion.indice, 0, jugador);
    }
  }

  return (
    <main className="ranking-page">
      <header className="ranking-header">
        <img src={logo} alt="Universidad Siglo 21" />
        <div className="ranking-toolbar">
          <span>NB 21K MAR DEL PLATA · <b>{estado}</b></span>

        </div>
      </header>
      <h1>EN LA PISTA Y EN LA <span>MENTE</span></h1>
      <p className="ranking-subtitle">LA VELOCIDAD TAMBIÉN SE ENTRENA CON LA MENTE</p>
      <section className="ranking-podio">
        {[1, 0, 2].map((indice) => {
          const jugador = podio[indice];
          return <div className={`ranking-podio-slot puesto-${indice + 1}`} key={indice}>
            <div className="ranking-medalla">{indice + 1}°</div>
            <strong>{jugador?.nombre || "Tu nombre acá"}</strong>
            <small>{jugador ? formatoResultado(jugador) : "Esperando participantes"}</small>
            <div className="ranking-escalon">{indice === 0 ? "PRIMER PUESTO" : indice === 1 ? "SEGUNDO PUESTO" : "TERCER PUESTO"}</div>
          </div>;
        })}
      </section>
      <div className="ranking-list-title">
        <strong>CLASIFICACIÓN GENERAL</strong><span>{jugadores.length} PARTICIPANTES</span>
      </div>
      <section className="ranking-lista" ref={listaRef}>
        {!jugadores.length && <p className="ranking-vacio">¡El desafío está por comenzar!</p>}
        {visibles.map((p, indice) => <div
          key={p.id} id={`ranking-${p.id}`} data-ranking-id={p.id}
          className={`ranking-fila ${animacion?.id === p.id ? "ranking-destacado ranking-ascendiendo" : ""}`}
        >
          <b>{animacion?.id === p.id ? indice + 1 : p.puesto}°</b>
          <span>{p.nombre}</span>
          <strong>{formatoResultado(p)}</strong>
        </div>)}
      </section>
      <footer>LOS 3 MEJORES PUESTOS DEL RANKING GANAN PREMIO · UNIVERSIDAD SIGLO 21</footer>
    </main>
  );
}
