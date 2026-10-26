import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
import "./Ranking.css";

const API_URL = import.meta.env.PROD ? "" : `http://${window.location.hostname}:3003`;
const DURACION_AVISO = 6500;
const formatoTiempo = (p) => `${p.tiempoSegundos.toFixed(1).replace(".", ",")} s`;
const formatoResultado = (p) => `${p.movimientos} movimientos · ${formatoTiempo(p)}`;

export function RankingMemotest() {
  const [jugadores, setJugadores] = useState([]);
  const [destacado, setDestacado] = useState(null);
  const [estado, setEstado] = useState("Conectando...");
  const listaRef = useRef(null);
  const vistos = useRef(new Set());
  const cola = useRef([]);
  const activo = useRef(null);
  const timeout = useRef(null);
  const iniciado = useRef(false);

  const cargar = useCallback(async (anunciar = false) => {
    const { data } = await axios.get(`${API_URL}/memotest/ranking`, { timeout: 15000 });
    const nuevos = data.ranking.filter((p) => !vistos.current.has(p.id));
    data.ranking.forEach((p) => vistos.current.add(p.id));
    setJugadores(data.ranking);
    setEstado("EN VIVO");
    if (iniciado.current && anunciar) cola.current.push(...nuevos);
    iniciado.current = true;
  }, []);

  useEffect(() => {
    let cerrado = false;
    let fuente;
    const comenzar = async () => {
      try { await cargar(false); } catch { setEstado("Sin conexión"); }
      if (cerrado) return;
      fuente = new EventSource(`${API_URL}/memotest/ranking/eventos`);
      fuente.onopen = () => { cargar(true).catch(() => setEstado("Reconectando...")); };
      fuente.addEventListener("finalizado", () => {
        cargar(true).catch(() => setEstado("Reconectando..."));
      });
      fuente.onerror = () => setEstado("Reconectando...");
    };
    comenzar();
    return () => {
      cerrado = true;
      fuente?.close();
      clearTimeout(timeout.current);
    };
  }, [cargar]);

  useEffect(() => {
    if (activo.current || !cola.current.length) return;
    const proximo = cola.current.shift();
    activo.current = proximo.id;
    setDestacado(proximo.id);
    timeout.current = setTimeout(() => {
      activo.current = null;
      setDestacado(null);
    }, DURACION_AVISO);
  }, [jugadores, destacado]);

  useEffect(() => {
    if (!destacado) {
      listaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const timer = setTimeout(() => {
      const elemento = document.getElementById(`ranking-${destacado}`);
      elemento?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);
    return () => clearTimeout(timer);
  }, [destacado]);

  const podio = jugadores.slice(0, 3);
  const jugadorActivo = jugadores.find((p) => p.id === destacado);
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
        {jugadores.length === 0 && <p className="ranking-vacio">¡El desafío está por comenzar!</p>}
        {jugadores.map((p) => <div
          key={p.id} id={`ranking-${p.id}`}
          className={`ranking-fila ${destacado === p.id ? "ranking-destacado" : ""}`}
        >
          <b>{p.puesto}°</b><span>{p.nombre}</span>
          <strong>{formatoResultado(p)}</strong>
        </div>)}
      </section>
      {jugadorActivo && <div className="ranking-alerta" key={jugadorActivo.id} role="status">
        <div className="ranking-alerta-etiqueta">¡NUEVA PARTICIPACIÓN!</div>
        <strong>{jugadorActivo.nombre}</strong>
        <div>¡LLEGÓ AL PUESTO <b>#{jugadorActivo.puesto}</b>!</div>
        <small>{formatoResultado(jugadorActivo)}</small>
      </div>}
      <footer>UNIVERSIDAD SIGLO 21 · CORRÉ HACIA TU PRÓXIMA META</footer>
    </main>
  );
}
