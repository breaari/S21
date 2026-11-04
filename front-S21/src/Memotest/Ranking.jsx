import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
const rechargeFiles = import.meta.glob("../assets/recharge.{mp3,wav,ogg,m4a}", { eager: true, query: "?url", import: "default" });
const rechargeSound = Object.values(rechargeFiles)[0];
import "./Ranking.css";

const API_URL = import.meta.env.VITE_MEMOTEST_API_URL || "https://back.universidadsiglo21online.com";
const PAUSA_EN_PUESTO = 2000;
const DURACION_ASCENSO = 5000;
const DURACION_SCROLL = 850;
const DURACION_RETORNO = 900;
const formatoResultado = (p) =>
  `${p.tiempoSegundos.toFixed(1).replace(".", ",")} s · ${p.movimientos} movimientos`;

export function RankingMemotest() {
  const [jugadores, setJugadores] = useState([]);
  const ultimoRankingRef = useRef([]);
  const colaRef = useRef([]);
  const [pendientes, setPendientes] = useState([]);
  const [activo, setActivo] = useState(null);
  const [fase, setFase] = useState("reposo");
  const posicionesRef = useRef(null);
  const [estado, setEstado] = useState("Conectando...");
  const [estadoAudio, setEstadoAudio] = useState(rechargeSound ? "cargando" : "faltante");
  const listaRef = useRef(null);
  const vistos = useRef(new Set());
  const inicializado = useRef(false);
  const audioCtx = useRef(null);
  const buffers = useRef({});
  const activoRef = useRef(false);


  // Preparar el archivo una sola vez y solicitar permiso de reproducción
  // cuando el navegador lo necesite (especialmente en pantallas de TV).
  const habilitarAudioRef = useRef(null);
  const reproducir = () => {
    const ctx = audioCtx.current;
    const buffer = buffers.current.recharge;
    if (!ctx || ctx.state !== "running" || !buffer) {
      if (rechargeSound && ctx?.state !== "running") setEstadoAudio("bloqueado");
      return;
    }
    const fuente = ctx.createBufferSource();
    const volumen = ctx.createGain();
    fuente.buffer = buffer;
    volumen.gain.value = 0.75;
    fuente.connect(volumen);
    volumen.connect(ctx.destination);
    fuente.start(0);
  };

  useEffect(() => {
    if (!rechargeSound) {
      setEstadoAudio("faltante");
      return;
    }
    let cancelado = false;
    const preparar = async () => {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) { setEstadoAudio("error"); return; }
        const ctx = audioCtx.current || new AudioContextClass();
        audioCtx.current = ctx;
        const response = await fetch(rechargeSound);
        if (!response.ok) throw new Error("No se pudo cargar recharge");
        const buffer = await ctx.decodeAudioData(await response.arrayBuffer());
        if (cancelado) return;
        buffers.current.recharge = buffer;
        setEstadoAudio(ctx.state === "running" ? "listo" : "bloqueado");
      } catch (error) {
        console.warn("Audio del ranking:", error);
        if (!cancelado) setEstadoAudio("error");
      }
    };
    habilitarAudioRef.current = async () => {
      try {
        // resume() se ejecuta directamente desde el clic: los navegadores
        // suelen bloquear audio iniciado por SSE o por un temporizador.
        const ctx = audioCtx.current;
        if (!ctx || !buffers.current.recharge) return;
        if (ctx.state !== "running") await ctx.resume();
        if (ctx.state === "running") {
          reproducir(); // Una prueba real de los parlantes, no solo cambiar el estado.
          setEstadoAudio("listo");
        } else {
          setEstadoAudio("bloqueado");
        }
      } catch (error) {
        console.warn("Activación de audio:", error);
        setEstadoAudio("bloqueado");
      }
    };
    preparar();
    return () => { cancelado = true; habilitarAudioRef.current = null; };
  }, []);

  const cargar = useCallback(async (anunciar = false) => {
    const { data } = await axios.get(`${API_URL}/memotest/ranking`, { timeout: 15000 });
    const ranking = Array.isArray(data.ranking) ? data.ranking : [];
    const nuevos = ranking.filter((p) => !vistos.current.has(p.id));
    ranking.forEach((p) => vistos.current.add(p.id));
    ultimoRankingRef.current = ranking;
    setEstado("EN VIVO");

    if (!inicializado.current) {
      inicializado.current = true;
      setJugadores(ranking);
      return;
    }
    if (anunciar && nuevos.length) {
      const ids = nuevos.map((p) => p.id);
      colaRef.current.push(...ids);
      setPendientes([...colaRef.current]);
    } else if (!activoRef.current && colaRef.current.length === 0) {
      setJugadores(ranking);
    }
    // Durante una presentación, se conserva el listado en pantalla.
    // Las siguientes llegadas quedan en cola, sin alterar el podio.
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

  // Las incorporaciones se procesan en orden de llegada, una por vez.
  useEffect(() => {
    if (activoRef.current || !pendientes.length) return;
    const id = colaRef.current.shift();
    if (!id) return;
    setPendientes([...colaRef.current]);
    const ranking = ultimoRankingRef.current.filter(
      (p) => !colaRef.current.includes(p.id)
    );
    if (!ranking.some((p) => p.id === id)) return;
    activoRef.current = true;
    setJugadores(ranking);
    setActivo(id);
    setFase("inicio");
  }, [pendientes, activo]);

  useEffect(() => {
    if (!activo || fase !== "inicio") return;
    const lista = listaRef.current;
    if (!lista) return;
    // Mostrar la llegada al último lugar ANTES del cambio de posición.
    lista.scrollTop = lista.scrollHeight;
    // El sonido comienza un segundo antes del desplazamiento.
    reproducir();
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
    const timer = setTimeout(() => setFase("regreso"), 2000);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  useEffect(() => {
    if (!activo || fase !== "regreso") return;
    listaRef.current?.scrollTo({ top:0, behavior:"smooth" });
    const timer = setTimeout(() => {
      setActivo(null);
      setFase("reposo");
      activoRef.current = false;
      if (colaRef.current.length === 0) setJugadores(ultimoRankingRef.current);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  const podio = jugadores.slice(0, 5);
  // Durante la llegada se muestra la lista completa para que el nuevo jugador
  // pueda incorporarse desde el final, incluso si alcanza el top cinco.
  // En reposo, el listado comienza en el puesto seis.
  const ordenVisible = activo ? [...jugadores] : jugadores.slice(5);
  if (activo && (fase === "inicio" || fase === "subiendo")) {
    const indice = ordenVisible.findIndex((p) => p.id === activo);
    if (indice !== -1) ordenVisible.push(...ordenVisible.splice(indice, 1));
  }

  return (
    <main className="ranking-page">
      <header className="ranking-header">
        <img src={logo} alt="Universidad Siglo 21" />
        <div className="ranking-estado-grupo"><span>NB 21K MAR DEL PLATA · <b>{estado}</b></span>{<button type="button" className="ranking-audio-accion" onClick={() => habilitarAudioRef.current?.()} disabled={estadoAudio === "faltante" || estadoAudio === "error"}>{estadoAudio === "faltante" ? "FALTA RECHARGE" : estadoAudio === "error" ? "AUDIO NO DISPONIBLE" : estadoAudio === "cargando" ? "PREPARANDO AUDIO" : estadoAudio === "listo" ? "PROBAR SONIDO" : "ACTIVAR Y PROBAR SONIDO"}</button>}</div>
      </header>
      <h1>MEMORIA <span>CONTRARRELOJ</span></h1>
      <p className="ranking-subtitle">UNA CARRERA DE AGILIDAD MENTAL HACIA EL PODIO</p>
      <section className="ranking-podio ranking-top-cinco" aria-label="Cinco puestos premiados">
        {[3, 1, 0, 2, 4].map((indice) => {
          const jugador = podio[indice];
          return <div className={`ranking-podio-slot puesto-${indice + 1} ${activo === jugador?.id ? "ranking-podio-activo" : ""}`} key={indice}>
            <div className="ranking-medalla">{indice + 1}°</div>
            <strong>{jugador?.nombre || "Tu nombre acá"}</strong>
            <small>{jugador ? formatoResultado(jugador) : "Esperando participante"}</small>
            <div className="ranking-escalon">{indice + 1}° PREMIO</div>
          </div>;
        })}
      </section>
      <div className="ranking-list-title">
        <strong>CLASIFICACIÓN GENERAL</strong><span>{jugadores.length} PARTICIPANTES</span>
      </div>
      <div className="ranking-area">
        <section className="ranking-lista" ref={listaRef}>
          {!jugadores.length && <p className="ranking-vacio">¡El desafío está por comenzar!</p>}
          {!activo && jugadores.length > 0 && jugadores.length <= 5 && <p className="ranking-vacio">Los próximos participantes aparecerán aquí.</p>}
          {ordenVisible.map((p, i) => <div key={p.id} data-player={p.id}
            className={"ranking-fila " + (activo === p.id ? "ranking-destacado " + (fase === "pausa" ? "ranking-llegada" : "") : "")}>
            <b>{activo ? i + 1 : i + 6}°</b><span>{p.nombre}</span><strong>{formatoResultado(p)}</strong>
          </div>)}
        </section>

      </div>
    </main>
  );
}

