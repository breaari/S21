import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
import tickSound from "../assets/tic.mp3";
import winSound from "../assets/win.mp3";
import "./Ranking.css";

const API_URL = import.meta.env.PROD ? "" : `http://${window.location.hostname}:3003`;
const PAUSA_EN_PUESTO = 2800;
const DURACION_SCROLL = 850;
const DURACION_RETORNO = 900;
const formatoResultado = (p) =>
  `${p.tiempoSegundos.toFixed(1).replace(".", ",")} s · ${p.movimientos} movimientos`;

export function RankingMemotest() {
  const [jugadores, setJugadores] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [activo, setActivo] = useState(null);
  const [fase, setFase] = useState("reposo");
  const [estado, setEstado] = useState("Conectando...");
  const listaRef = useRef(null);
  const vistos = useRef(new Set());
  const inicializado = useRef(false);
  const audioCtx = useRef(null);
  const buffers = useRef({});
  const activoRef = useRef(false);
  const timersRef = useRef([]);

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

  // Animación sencilla: clasificación definitiva, viaje al puesto, pausa y regreso.
  // El listado nunca cambia de orden y no se anima una fila aparte.
  useEffect(() => {
    if (activoRef.current || !pendientes.length || !jugadores.length) return;
    const id = pendientes[0];
    setPendientes((prev) => prev.slice(1));
    if (!jugadores.some((p) => p.id === id)) return;
    activoRef.current = true;
    setActivo(id);
  }, [pendientes, jugadores]);

  useEffect(() => {
    if (!activo) return;
    const lista = listaRef.current;
    const fila = [...(lista?.querySelectorAll("[data-player]") || [])]
      .find((item) => item.dataset.player === activo);
    if (!lista || !fila) return;

    const programar = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    setFase("entrada");
    reproducir("tic");

    // Si el puesto ya se ve, no hay desplazamiento: la entrada se destaca
    // mediante una placa sobre la lista. Si no, hacemos un solo scroll directo.
    const destino = fila.offsetTop - lista.offsetTop -
      (lista.clientHeight - fila.clientHeight) / 2;
    lista.scrollTo({ top: Math.max(0, destino), behavior: "smooth" });

    programar(() => {
      setFase("llegada");
      reproducir("win");
    }, 750);

    programar(() => {
      setFase("regreso");
      lista.scrollTo({ top: 0, behavior: "smooth" });
    }, 3900);

    programar(() => {
      setActivo(null);
      setFase("reposo");
      activoRef.current = false;
    }, 4800);
  }, [activo]);

  useEffect(() => () => {
    timersRef.current.forEach(clearTimeout);
  }, []);

  const podio = jugadores.slice(0, 3);
  const nuevo = jugadores.find((p) => p.id === activo);

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
          {jugadores.map((p) => <div key={p.id} data-player={p.id}
            className={"ranking-fila " + (activo === p.id ? "ranking-destacado " + (fase === "llegada" ? "ranking-llegada" : "") : "")}>
            <b>{p.puesto}°</b><span>{p.nombre}</span><strong>{formatoResultado(p)}</strong>
          </div>)}
        </section>
        {nuevo && <div className={"ranking-anuncio ranking-anuncio-" + fase} role="status">
          <span>NUEVO TIEMPO REGISTRADO</span>
          <strong>{nuevo.nombre}</strong>
          <div className="ranking-anuncio-marca">PUESTO {nuevo.puesto}°</div>
          <small>{formatoResultado(nuevo)}</small>
        </div>}
      </div>
      <footer>LOS 3 MEJORES PUESTOS DEL RANKING GANAN PREMIO · UNIVERSIDAD SIGLO 21</footer>
    </main>
  );
}

