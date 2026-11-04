import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
const rechargeFiles = import.meta.glob("../assets/recharge.{mp3,wav,ogg,m4a}", { eager: true, query: "?url", import: "default" });
const rechargeSound = Object.values(rechargeFiles)[0];
import "./Ranking.css";

const API_URL = import.meta.env.VITE_MEMOTEST_API_URL || "https://back.universidadsiglo21online.com";
const PAUSA_EN_PUESTO = 2000;
const DURACION_ASCENSO = 5000;
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
  const [filasVisibles, setFilasVisibles] = useState(5);
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
        // El asesor debe habilitarlo con un clic aunque Chrome permita audio.
        setEstadoAudio("pendiente");
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
          // Breve confirmación audible sin reproducir los 5 s completos.
          const fuente = ctx.createBufferSource();
          const volumen = ctx.createGain();
          fuente.buffer = buffers.current.recharge;
          volumen.gain.value = 0.55;
          fuente.connect(volumen);
          volumen.connect(ctx.destination);
          fuente.start(0, 0, Math.min(.4, fuente.buffer.duration));
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

  // Mostrar tantas filas COMPLETAS como entren, con una altura cercana a 58px.
  // No estirar cinco filas a toda la altura de una TV grande.
  useEffect(() => {
    const area = listaRef.current?.parentElement;
    if (!area) return;
    const calcular = () => {
      const alto = area.clientHeight;
      const gap = 6;
      // En celular, filas más compactas y legibles, sin estirarse a 5 grandes.
      const altoObjetivo = area.clientWidth <= 700 ? 48 : 58;
      setFilasVisibles(Math.max(1, Math.floor((alto + gap) / (altoObjetivo + gap))));
    };
    calcular();
    const observer = new ResizeObserver(calcular);
    observer.observe(area);
    return () => observer.disconnect();
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

  // La clasificación se ubica directamente cerca del puesto logrado.
  // El participante entra desde el BORDE INFERIOR VISIBLE, no desde el
  // final de una lista que puede tener cientos de personas.
  useLayoutEffect(() => {
    if (!activo || fase !== "inicio") return;
    const lista = listaRef.current;
    if (!lista) return;
    lista.scrollTop = 0;
    reproducir(); // Mantiene el sonido adelantado un segundo.
    const timer = setTimeout(() => setFase("subiendo"), 1000);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  useLayoutEffect(() => {
    if (!activo || fase !== "subiendo") return;
    const lista = listaRef.current;
    if (!lista) return;
    const posiciones = new Map();
    lista.querySelectorAll("[data-player]").forEach((fila) => {
      posiciones.set(fila.dataset.player, fila.offsetTop);
    });
    posicionesRef.current = posiciones;
    setFase("destino");
  }, [activo, fase]);

  useLayoutEffect(() => {
    if (!activo || fase !== "destino") return;
    const lista = listaRef.current;
    if (!lista) return;
    const anteriores = posicionesRef.current;
    const filas = [...lista.querySelectorAll("[data-player]")];
    if (!anteriores || !filas.length) return;
    const animaciones = [];
    filas.forEach((fila) => {
      const antes = anteriores.get(fila.dataset.player);
      if (antes === undefined) return;
      const delta = antes - fila.offsetTop;
      if (Math.abs(delta) <= 1) return;
      animaciones.push(fila.animate(
        [
          { transform: `translate3d(0, ${delta}px, 0)` },
          { transform: "translate3d(0, 0, 0)" }
        ],
        {
          // Solo el participante nuevo viaja durante los 5 segundos.
          // Los demás se acomodan rápido, sin trabar el listado.
          duration: fila.dataset.player === activo ? DURACION_ASCENSO : 650,
          easing: "cubic-bezier(.22,.75,.28,1)",
          fill: "none"
        }
      ));
    });
    const timer = setTimeout(() => setFase("pausa"), DURACION_ASCENSO + 50);
    return () => {
      clearTimeout(timer);
      animaciones.forEach((animacion) => animacion.cancel());
    };
  }, [activo, fase]);

  useEffect(() => {
    if (!activo || fase !== "pausa") return;
    const timer = setTimeout(() => setFase("regreso"), 2000);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  useEffect(() => {
    if (!activo || fase !== "regreso") return;
    // La vista vuelve al inicio mediante un fundido corto: no recorre
    // cientos de puestos ni desplaza miles de píxeles.
    const timer = setTimeout(() => {
      setActivo(null);
      setFase("reposo");
      activoRef.current = false;
      if (colaRef.current.length === 0) setJugadores(ultimoRankingRef.current);
    }, 700);
    return () => clearTimeout(timer);
  }, [activo, fase]);

  const podio = jugadores.slice(0, 5);
  // Mantener la lista completa en reposo, pero solo los puestos visibles
  // próximos al destino durante el ascenso (incluso con 600 participantes).
  const indiceDestino = jugadores.findIndex((p) => p.id === activo);
  const totalVisibles = Math.max(3, filasVisibles);
  const inicioVentana = activo && indiceDestino >= 0
    ? Math.max(0, Math.min(
        Math.max(0, jugadores.length - totalVisibles),
        indiceDestino - Math.floor(totalVisibles / 2)
      ))
    : 0;
  const ordenVisible = activo
    ? jugadores.slice(inicioVentana, inicioVentana + totalVisibles)
    : jugadores.slice(5);
  // Al ingresar, el participante ocupa la última fila visible,
  // no la última posición de toda la base de datos.
  if (activo && (fase === "inicio" || fase === "subiendo")) {
    const indice = ordenVisible.findIndex((p) => p.id === activo);
    if (indice !== -1) ordenVisible.push(...ordenVisible.splice(indice, 1));
  }
  const puestos = new Map(jugadores.map((p, i) => [p.id, i + 1]));

  return (
    <main className="ranking-page">
      <header className="ranking-header">
        <img src={logo} alt="Universidad Siglo 21" />
        <div className="ranking-estado-grupo"><span>NB 21K MAR DEL PLATA · <b>{estado}</b></span>{estadoAudio !== "listo" && <button type="button" className="ranking-audio-accion" onClick={() => habilitarAudioRef.current?.()} disabled={estadoAudio === "faltante" || estadoAudio === "error" || estadoAudio === "cargando"}>{estadoAudio === "faltante" ? "FALTA RECHARGE" : estadoAudio === "error" ? "AUDIO NO DISPONIBLE" : estadoAudio === "cargando" ? "CARGANDO AUDIO" : "ACTIVAR SONIDO"}</button>}</div>
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
      <div className={"ranking-area " + (fase === "regreso" ? "ranking-area-regreso" : "")}>
        <section className="ranking-lista" ref={listaRef} style={{ "--filas-visibles": filasVisibles }}>
          {!jugadores.length && <p className="ranking-vacio">¡El desafío está por comenzar!</p>}
          {!activo && jugadores.length > 0 && jugadores.length <= 5 && <p className="ranking-vacio">Los próximos participantes aparecerán aquí.</p>}
          {ordenVisible.map((p, i) => <div key={p.id} data-player={p.id}
            className={"ranking-fila " + (activo === p.id ? "ranking-destacado " + (fase === "pausa" ? "ranking-llegada" : "") : "")}>
            <b>{activo ? puestos.get(p.id) : i + 6}°</b><span>{p.nombre}</span><strong>{formatoResultado(p)}</strong>
          </div>)}
        </section>

      </div>
    </main>
  );
}

