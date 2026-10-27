import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
const rechargeFiles = import.meta.glob("../assets/recharge.{mp3,wav,ogg,m4a}", { eager: true, query: "?url", import: "default" });
const rechargeSound = Object.values(rechargeFiles)[0];
import "./Ranking.css";

const API_URL = import.meta.env.PROD ? "" : `http://${window.location.hostname}:3003`;
const PAUSA_EN_PUESTO = 2000;
const DURACION_ASCENSO = 5000;
const DURACION_SCROLL = 850;
const DURACION_RETORNO = 900;
const formatoResultado = (p) =>
  `${p.tiempoSegundos.toFixed(1).replace(".", ",")} s · ${p.movimientos} movimientos`;

export function RankingMemotest() {
  const [jugadores, setJugadores] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [activo, setActivo] = useState(null);
  const [fase, setFase] = useState("reposo");
  const posicionesRef = useRef(null);
  const [estado, setEstado] = useState("Conectando...");
  const listaRef = useRef(null);
  const vistos = useRef(new Set());
  const inicializado = useRef(false);
  const audioCtx = useRef(null);
  const buffers = useRef({});
  const activoRef = useRef(false);


  const reproducir = (tipo) => {
    const ctx = audioCtx.current;
    const buffer = buffers.current[tipo];
    if (!ctx || ctx.state !== "running" || !buffer) return;
    const fuente = ctx.createBufferSource();
    const volumen = ctx.createGain();
    fuente.buffer = buffer;
    volumen.gain.value = 0.65;
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
        if (buffers.current.recharge || cancelado || !rechargeSound) return;
        const cargar = async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Audio no disponible");
          return ctx.decodeAudioData(await response.arrayBuffer());
        };
        const recharge = await cargar(rechargeSound);
        if (!cancelado) buffers.current = { recharge };
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

  // Una incorporación: comienza al final, se mueve a su posición y se detiene.
  useEffect(() => {
    if (activoRef.current || !pendientes.length || !jugadores.length) return;
    const id = pendientes[0];
    setPendientes((prev) => prev.slice(1));
    if (!jugadores.some((p) => p.id === id)) return;
    activoRef.current = true;
    setActivo(id);
    setFase("inicio");
  }, [pendientes, jugadores]);

  useEffect(() => {
    if (!activo || fase !== "inicio") return;
    const lista = listaRef.current;
    if (!lista) return;
    // Mostrar la llegada al último lugar ANTES del cambio de posición.
    lista.scrollTop = lista.scrollHeight;
    // El sonido comienza un segundo antes del desplazamiento.
    reproducir("recharge");
    const timer = setTimeout(() => setFase("subiendo"), 1000);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  useLayoutEffect(() => {
    if (!activo || fase !== "subiendo") return;
    const lista = listaRef.current;
    if (!lista) return;
    const posiciones = new Map();
    lista.querySelectorAll("[data-player]").forEach((fila) =>
      posiciones.set(fila.dataset.player, fila.offsetTop)
    );
    // La fila estaba última; guardamos su ubicación y cambiamos el orden real.
    posicionesRef.current = posiciones;
    setFase("destino");
  }, [activo, fase]);

  useLayoutEffect(() => {
    if (!activo || fase !== "destino") return;
    const lista = listaRef.current;
    if (!lista) return;
    const nuevaFila = lista.querySelector('[data-player="' + activo + '"]');
    const anteriores = posicionesRef.current;
    if (!nuevaFila || !anteriores) return;
    lista.querySelectorAll("[data-player]").forEach((fila) => {
      const antes = anteriores.get(fila.dataset.player);
      if (antes === undefined) return;
      const despues = fila.offsetTop;
      const delta = antes - despues;
      if (Math.abs(delta) > 1) {
        fila.animate([
          { transform: "translateY(" + delta + "px)" },
          { transform: "translateY(0px)" }
        ], { duration: DURACION_ASCENSO, easing: "cubic-bezier(.25,.75,.3,1)" });
      }
    });
    const target = nuevaFila.offsetTop - lista.offsetTop -
      (lista.clientHeight - nuevaFila.clientHeight) / 2;
    lista.scrollTo({ top: Math.max(0,target), behavior: "smooth" });
    const pausa = setTimeout(() => setFase("pausa"), DURACION_ASCENSO + 50);
    return () => clearTimeout(pausa);
  }, [activo, fase]);

  useEffect(() => {
    if (!activo || fase !== "pausa") return;
    const timer = setTimeout(() => setFase("regreso"), 2800);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  useEffect(() => {
    if (!activo || fase !== "regreso") return;
    listaRef.current?.scrollTo({ top:0, behavior:"smooth" });
    const timer = setTimeout(() => {
      setActivo(null);
      setFase("reposo");
      activoRef.current = false;
    }, 1000);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  const podio = jugadores.slice(0, 3);
  const ordenVisible = [...jugadores];
  if (activo && (fase === "inicio" || fase === "subiendo")) {
    const indice = ordenVisible.findIndex((p) => p.id === activo);
    if (indice !== -1) ordenVisible.push(...ordenVisible.splice(indice, 1));
  }

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
          {ordenVisible.map((p, i) => <div key={p.id} data-player={p.id}
            className={"ranking-fila " + (activo === p.id ? "ranking-destacado " + (fase === "pausa" ? "ranking-llegada" : "") : "")}>
            <b>{i+1}°</b><span>{p.nombre}</span><strong>{formatoResultado(p)}</strong>
          </div>)}
        </section>

      </div>
      <footer>LOS 3 MEJORES PUESTOS DEL RANKING GANAN PREMIO · UNIVERSIDAD SIGLO 21</footer>
    </main>
  );
}

