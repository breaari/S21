import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
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
  const posicionInicial = useRef(null);

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

  // Los nuevos jugadores entran desde el último lugar y ascienden de una vez.
  useEffect(() => {
    if (animacion || !pendientes.length || !jugadores.length) return;
    const id = pendientes[0];
    const jugador = jugadores.find((p) => p.id === id);
    setPendientes((actual) => actual.slice(1));
    if (jugador) setAnimacion({ id, fase: "inicio" });
  }, [animacion, pendientes, jugadores]);

  useEffect(() => {
    if (!animacion || animacion.fase !== "inicio") return;
    const lista = listaRef.current;
    lista?.scrollTo({ top: lista.scrollHeight, behavior: "instant" });
    const timer = setTimeout(() => {
      const fila = document.getElementById(`ranking-${animacion.id}`);
      posicionInicial.current = fila?.getBoundingClientRect() || null;
      setAnimacion({ id: animacion.id, fase: "subiendo" });
    }, 280);
    return () => clearTimeout(timer);
  }, [animacion]);

  useEffect(() => {
    if (!animacion || animacion.fase !== "subiendo") return;
    const fila = document.getElementById(`ranking-${animacion.id}`);
    const lista = listaRef.current;
    if (fila && lista) {
      const destino = fila.getBoundingClientRect();
      const origen = posicionInicial.current;
      lista.scrollTo({
        top: fila.offsetTop - lista.offsetTop - lista.clientHeight / 2 + fila.clientHeight / 2,
        behavior: "smooth",
      });
      if (origen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        fila.animate([
          { transform: `translateY(${origen.top - destino.top}px) scale(1.035)`, filter: "brightness(1.5)" },
          { transform: "translateY(0) scale(1)", filter: "brightness(1)" }
        ], { duration: 950, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
    }
    const timer = setTimeout(() => setAnimacion({ id: animacion.id, fase: "destino" }), 1000);
    return () => clearTimeout(timer);
  }, [animacion]);

  useEffect(() => {
    if (!animacion || animacion.fase !== "destino") return;
    const timer = setTimeout(() => {
      setAnimacion(null);
      listaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
    return () => clearTimeout(timer);
  }, [animacion]);

  const destacados = jugadores.slice(0, 3);
  const visibles = [...jugadores];
  if (animacion) {
    const posicionReal = visibles.findIndex((p) => p.id === animacion.id);
    if (posicionReal !== -1) {
      const [jugador] = visibles.splice(posicionReal, 1);
      visibles.splice(animacion.fase === "inicio" ? visibles.length : posicionReal, 0, jugador);
    }
  }

  return (
    <main className="ranking-page">
      <header className="ranking-header">
        <img src={logo} alt="Universidad Siglo 21" />
        <span>NB 21K MAR DEL PLATA · <b>{estado}</b></span>
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
