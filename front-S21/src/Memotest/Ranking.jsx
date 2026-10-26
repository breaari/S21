import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
import tickSound from "../assets/tic.mp3";
import winSound from "../assets/win.mp3";
import "./Ranking.css";

const API_URL = import.meta.env.PROD ? "" : `http://${window.location.hostname}:3003`;
const DURACION_TOTAL = 5000;
const SUBIDA_INICIO = 400;
const SUBIDA_FIN = 4100;
const DESTACADO_FIN = 4600;
const formatoResultado = (p) =>
  `${p.tiempoSegundos.toFixed(1).replace(".", ",")} s · ${p.movimientos} movimientos`;
// Avance lineal: no se frena antes de llegar al puesto definitivo.
const suavizar = (x) => x;

export function RankingMemotest() {
  const [jugadores, setJugadores] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [activo, setActivo] = useState(null);
  const [estado, setEstado] = useState("Conectando...");
  const listaRef = useRef(null);
  const flotanteRef = useRef(null);
  const vistos = useRef(new Set());
  const inicializado = useRef(false);
  const audioCtx = useRef(null);
  const buffers = useRef({});
  const activoRef = useRef(false);
  const animacionRef = useRef(null);

  const reproducir = (tipo) => {
    const ctx = audioCtx.current;
    const buffer = buffers.current[tipo];
    if (!ctx || ctx.state !== "running" || !buffer) return;
    const fuente = ctx.createBufferSource();
    const volumen = ctx.createGain();
    fuente.buffer = buffer;
    volumen.gain.value = tipo === "tic" ? 0.48 : 0.75;
    fuente.connect(volumen);
    volumen.connect(ctx.destination);
    fuente.start();
  };

  // Intentamos preparar los sonidos; si autoplay está bloqueado, la primera
  // interacción sobre la página habilita el audio sin controles visibles.
  useEffect(() => {
    let cancelado = false;
    const preparar = async () => {
      try {
        const Contexto = window.AudioContext || window.webkitAudioContext;
        if (!Contexto) return;
        if (!audioCtx.current) audioCtx.current = new Contexto();
        const ctx = audioCtx.current;
        if (ctx.state === "suspended") await ctx.resume();
        if (buffers.current.tic || cancelado) return;
        const cargar = async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Audio no disponible");
          return ctx.decodeAudioData(await response.arrayBuffer());
        };
        const [tic, win] = await Promise.all([cargar(tickSound), cargar(winSound)]);
        if (!cancelado) buffers.current = { tic, win };
      } catch (error) { console.warn("Audio del ranking:", error); }
    };
    preparar();
    window.addEventListener("pointerdown", preparar);
    window.addEventListener("keydown", preparar);
    return () => {
      cancelado = true;
      window.removeEventListener("pointerdown", preparar);
      window.removeEventListener("keydown", preparar);
    };
  }, []);

  const cargar = useCallback(async (anunciar = false) => {
    const { data } = await axios.get(`${API_URL}/memotest/ranking`, { timeout: 15000 });
    const nuevos = data.ranking.filter((p) => !vistos.current.has(p.id));
    data.ranking.forEach((p) => vistos.current.add(p.id));
    setJugadores(data.ranking);
    setEstado("EN VIVO");
    if (inicializado.current && anunciar && nuevos.length) {
      setPendientes((anteriores) => [...anteriores, ...nuevos.map((p) => p.id)]);
    }
    inicializado.current = true;
  }, []);

  useEffect(() => {
    let cerrada = false;
    let eventos;
    const conectar = async () => {
      try { await cargar(false); } catch { setEstado("Sin conexión"); }
      if (cerrada) return;
      eventos = new EventSource(`${API_URL}/memotest/ranking/eventos`);
      eventos.onopen = () => cargar(true).catch(() => setEstado("Reconectando..."));
      eventos.addEventListener("finalizado", () => cargar(true).catch(() => setEstado("Reconectando...")));
      eventos.onerror = () => setEstado("Reconectando...");
    };
    conectar();
    const revision = setInterval(() => cargar(true).catch(() => setEstado("Reconectando...")), 15000);
    return () => { cerrada = true; eventos?.close(); clearInterval(revision); };
  }, [cargar]);

  useEffect(() => {
    if (activoRef.current || !pendientes.length || !jugadores.length) return;
    const id = pendientes[0];
    const participante = jugadores.find((p) => p.id === id);
    setPendientes((anteriores) => anteriores.slice(1));
    if (!participante) return;
    activoRef.current = true;
    setActivo(id);

    const lista = listaRef.current;
    // Esperamos al render de la fila flotante, sin reordenar el listado real.
    setTimeout(() => {
      const area = listaRef.current;
      const elemento = flotanteRef.current;
      if (!area || !elemento) { activoRef.current = false; setActivo(null); return; }
      const n = jugadores.length;
      const destino = Math.max(0, participantesIndex(jugadores, id));
      const filas = [...area.querySelectorAll(".ranking-fila")];
      const paso = filas.length > 1 ? filas[1].offsetTop - filas[0].offsetTop : 56;
      const inicioScroll = area.scrollHeight - area.clientHeight;
      const maxScroll = Math.max(0, inicioScroll);
      let ultimoPaso = n - 1;
      const inicio = performance.now();
      const dibujar = (ahora) => {
        const t = Math.min(DURACION_TOTAL, ahora - inicio);
        const avance = Math.max(0, Math.min(1, (t - SUBIDA_INICIO) / (SUBIDA_FIN - SUBIDA_INICIO)));
        const indiceVisual = (n - 1) - (n - 1 - destino) * suavizar(avance);
        const pasoActual = Math.floor(indiceVisual + .00001);
        if (pasoActual < ultimoPaso) {
          // Un tic por puesto superado; la cadencia se adapta al recorrido.
          for (let i = ultimoPaso; i > pasoActual; i--) reproducir("tic");
          ultimoPaso = pasoActual;
        }
        const yAbsoluta = indiceVisual * paso;
        // Seguimiento continuo: la cámara acompaña al participante durante todo el recorrido.
        const scrollObjetivo = Math.max(0, Math.min(maxScroll, (yAbsoluta - area.clientHeight * .52) * .72));
        // Scroll y fila flotante comparten un solo frame: evita tirones.
        area.scrollTop = scrollObjetivo;
        elemento.style.transform = `translate3d(0,${yAbsoluta - scrollObjetivo}px,0)`;
        elemento.querySelector(".ranking-flotante-puesto").textContent = `${Math.floor(indiceVisual + 1)}°`;
        elemento.style.opacity = t < 170 ? String(t / 170) : "1";

        if (t >= SUBIDA_FIN && !animacionRef.current?.premio) {
          reproducir("win");
          animacionRef.current.premio = true;
          elemento.classList.add("ranking-flotante-final");
        }
        if (t >= DESTACADO_FIN) {
          const retorno = (t - DESTACADO_FIN) / (DURACION_TOTAL - DESTACADO_FIN);
          area.scrollTop = Math.max(0, scrollObjetivo * (1 - retorno));
          elemento.style.opacity = String(1 - retorno);
        }
        if (t < DURACION_TOTAL) {
          animacionRef.current.id = requestAnimationFrame(dibujar);
        } else {
          setActivo(null);
          activoRef.current = false;
          animacionRef.current = null;
          area.scrollTop = 0;
        }
      };
      animacionRef.current = { id: requestAnimationFrame(dibujar), premio: false };
    }, 30);
  }, [pendientes, jugadores, activo]);

  useEffect(() => () => {
    if (animacionRef.current?.id) cancelAnimationFrame(animacionRef.current.id);
  }, []);

  const podio = jugadores.slice(0, 3);
  const destacado = jugadores.find((p) => p.id === activo);

  return (
    <main className="ranking-page">
      <header className="ranking-header">
        <img src={logo} alt="Universidad Siglo 21" />
        <span>NB 21K MAR DEL PLATA · <b>{estado}</b></span>
      </header>
      <h1>MEMORIA <span>CONTRARRELOJ</span></h1>
      <p className="ranking-subtitle">UNA CARRERA DE AGILIDAD MENTAL HACIA EL PODIO</p>
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
      <div className="ranking-area">
        <section className="ranking-lista" ref={listaRef}>
          {!jugadores.length && <p className="ranking-vacio">¡El desafío está por comenzar!</p>}
          {jugadores.map((p) => <div key={p.id} className={`ranking-fila ${activo === p.id ? "ranking-fila-oculta" : ""}`}>
            <b>{p.puesto}°</b><span>{p.nombre}</span><strong>{formatoResultado(p)}</strong>
          </div>)}
        </section>
        {destacado && <div className="ranking-flotante" ref={flotanteRef}>
          <b className="ranking-flotante-puesto">{jugadores.length}°</b>
          <span>{destacado.nombre}</span><strong>{formatoResultado(destacado)}</strong>
        </div>}
      </div>
      <footer>LOS 3 MEJORES PUESTOS DEL RANKING GANAN PREMIO · UNIVERSIDAD SIGLO 21</footer>
    </main>
  );
}

function participantesIndex(jugadores, id) {
  return jugadores.findIndex((p) => p.id === id);
}
