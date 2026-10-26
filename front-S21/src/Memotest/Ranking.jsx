import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
import tic from "../assets/tic.mp3";
import win from "../assets/win.mp3";
import "./Ranking.css";

const API_URL = import.meta.env.PROD ? "" : `http://${window.location.hostname}:3003`;
const formatoResultado = (p) => `${p.tiempoSegundos.toFixed(1).replace(".", ",")} s · ${p.movimientos} movimientos`;

export function RankingMemotest() {
  const [jugadores, setJugadores] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [animacion, setAnimacion] = useState(null);
  const [estado, setEstado] = useState("Conectando...");
  const listaRef = useRef(null);
  const vistos = useRef(new Set());
  const inicializado = useRef(false);
  const audioTic = useRef(null);
  const audioWin = useRef(null);
  const [sonidoActivo, setSonidoActivo] = useState(false);
  const sonar = (ref) => {
    const audio = ref.current;
    if (!audio || !sonidoActivo) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

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
      fuente.onopen = () => { cargar(true).catch(() => setEstado("Reconectando...")); };
      fuente.addEventListener("finalizado", () => cargar(true).catch(() => setEstado("Reconectando...")));
      fuente.onerror = () => setEstado("Reconectando...");
    };
    comenzar();
    // Recupera eventos que pudieran perderse al desconectarse.
    const revision = setInterval(() => cargar(true).catch(() => setEstado("Reconectando...")), 15000);
    return () => { cerrado = true; fuente?.close(); clearInterval(revision); };
  }, [cargar]);

  // Al llegar una partida, la fila comienza abajo y sube puesto por puesto.
  useEffect(() => {
    if (animacion || !pendientes.length || !jugadores.length) return;
    const id = pendientes[0];
    const jugador = jugadores.find((p) => p.id === id);
    setPendientes((actual) => actual.slice(1));
    if (jugador) setAnimacion({ id, indice: jugadores.length - 1, destino: jugador.puesto - 1, fase: "inicio" });
  }, [animacion, pendientes, jugadores]);

  useEffect(() => {
    if (!animacion) return;
    const lista = listaRef.current;
    const fila = document.getElementById(`ranking-${animacion.id}`);
    if (animacion.fase === "inicio") {
      lista?.scrollTo({ top: lista.scrollHeight, behavior: "instant" });
      const timer = setTimeout(() => setAnimacion((actual) => actual && { ...actual, fase: "ascenso" }), 350);
      return () => clearTimeout(timer);
    }
    if (animacion.fase === "ascenso") {
      if (fila && lista) {
        const objetivo = fila.offsetTop - lista.offsetTop - lista.clientHeight / 2 + fila.clientHeight / 2;
        lista.scrollTo({ top: objetivo, behavior: "smooth" });
      }
      if (animacion.indice > animacion.destino) {
        sonar(audioTic);
        const timer = setTimeout(() => setAnimacion((actual) => actual && {
          ...actual, indice: Math.max(actual.destino, actual.indice - 1),
        }), 95);
        return () => clearTimeout(timer);
      }
      sonar(audioWin);
      const timer = setTimeout(() => setAnimacion((actual) => actual && { ...actual, fase: "final" }), 1250);
      return () => clearTimeout(timer);
    }
    if (animacion.fase === "final") {
      const timer = setTimeout(() => {
        setAnimacion(null);
        lista?.scrollTo({ top: 0, behavior: "smooth" });
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [animacion, sonidoActivo]);

  const destacados = jugadores.slice(0, 3);
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
      <audio ref={audioTic} src={tic} preload="auto" />
      <audio ref={audioWin} src={win} preload="auto" />
      <header className="ranking-header">
        <img src={logo} alt="Universidad Siglo 21" />
        <div className="ranking-toolbar"><span>NB 21K MAR DEL PLATA · <b>{estado}</b></span><button type="button" className="ranking-sound-button" onClick={() => { setSonidoActivo((actual) => !actual); }}>{sonidoActivo ? "SONIDO ACTIVADO" : "ACTIVAR SONIDO"}</button></div>
      </header>
      <h1>EL DESAFÍO DE <span>MEMORIA</span></h1>
      <p className="ranking-subtitle">MENOS TIEMPO GANA · MOVIMIENTOS DESEMPATAN</p>
      <section className="ranking-podio">
        {[1, 0, 2].map((indice) => {
          const jugador = destacados[indice];
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
          key={p.id} id={`ranking-${p.id}`}
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
