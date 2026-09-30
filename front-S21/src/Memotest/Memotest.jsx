import { useEffect, useMemo, useRef, useState } from "react";

import axios from "axios";

import Confetti from "react-confetti";

import "./Memotest.css";

import logo from "../assets/logo-blanco-sin-fondo.png";

import carta01 from "../assets/carta-01.png";
import carta02 from "../assets/carta-02.png";
import carta03 from "../assets/carta-03.png";
import carta04 from "../assets/carta-04.png";
import carta05 from "../assets/carta-05.png";
import carta06 from "../assets/carta-06.png";

import reverso from "../assets/reverso.png";

const API_URL = import.meta.env.PROD
  ? ""
  : `http://${window.location.hostname}:3003`;

const TIEMPO_LIMITE = 30;

const AREAS = [
  "Tecnología",
  "Negocios y Administración",
  "Derecho",
  "Salud y Bienestar",
  "Diseño y Comunicación",
  "Educación",
  "Ambiente y Sustentabilidad",
  "Industria",
  "Otra",
  "Todavía no lo sé",
];

const IMAGENES = [carta01, carta02, carta03, carta04, carta05, carta06];

const mezclarCartas = () => {
  const cartas = IMAGENES.flatMap((imagen, index) => [
    {
      id: `${index}-a`,
      pareja: index,
      imagen,
    },
    {
      id: `${index}-b`,
      pareja: index,
      imagen,
    },
  ]);

  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  return cartas;
};

export function Memotest() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);

  const origen = params.get("source") || "directo";

  const [pantalla, setPantalla] = useState("formulario");

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",

    estudiosUniversitarios: "",
    interesFormacion: "",

    areasInteres: [],

    tipoFormacion: "",
  });

  const [participanteId, setParticipanteId] = useState(null);

  const [cartas, setCartas] = useState([]);

  const [seleccionadas, setSeleccionadas] = useState([]);

  const [parejasEncontradas, setParejasEncontradas] = useState([]);

  const [movimientos, setMovimientos] = useState(0);

  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_LIMITE);

  const [jugando, setJugando] = useState(false);

  const [resultado, setResultado] = useState(null);

  const [error, setError] = useState("");

  const [enviando, setEnviando] = useState(false);

  const bloqueoRef = useRef(false);

  /* =====================================================
     FORM
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const toggleArea = (area) => {
    setForm((prev) => {
      /*
       * "Todavía no lo sé" funciona de forma exclusiva.
       */
      if (area === "Todavía no lo sé") {
        return {
          ...prev,
          areasInteres: prev.areasInteres.includes(area) ? [] : [area],
        };
      }

      const sinNoSe = prev.areasInteres.filter(
        (item) => item !== "Todavía no lo sé",
      );

      return {
        ...prev,

        areasInteres: sinNoSe.includes(area)
          ? sinNoSe.filter((item) => item !== area)
          : [...sinNoSe, area],
      };
    });
  };

  const enviarFormulario = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !form.nombre ||
      !form.apellido ||
      !form.telefono ||
      !form.email ||
      !form.estudiosUniversitarios ||
      !form.interesFormacion ||
      !form.tipoFormacion ||
      form.areasInteres.length === 0
    ) {
      setError("Completá todos los campos antes de continuar.");

      return;
    }

    setEnviando(true);

    try {
      const { data } = await axios.post(`${API_URL}/memotest/participar`, {
        ...form,
        origen,
      });

      setParticipanteId(data.participante.id);

      localStorage.setItem("s21_memotest_id", data.participante.id);

      setPantalla("instrucciones");
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.yaParticipo) {
        setResultado(err.response.data.participante);

        setPantalla("ya-participo");

        return;
      }

      setError(
        err.response?.data?.error ||
          "No pudimos registrar tus datos. Intentá nuevamente.",
      );
    } finally {
      setEnviando(false);
    }
  };

  /* =====================================================
     INICIAR
  ===================================================== */

  const comenzarJuego = async () => {
    if (!participanteId) return;

    setError("");
    setEnviando(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/memotest/${participanteId}/iniciar`,
      );

      if (data.yaFinalizado) {
        setResultado(data.participante);

        setPantalla("resultado");

        return;
      }

      setCartas(mezclarCartas());
      setSeleccionadas([]);
      setParejasEncontradas([]);
      setMovimientos(0);

      setTiempoRestante(data.tiempoLimite || TIEMPO_LIMITE);

      bloqueoRef.current = false;

      setPantalla("juego");

      setJugando(true);
    } catch (err) {
      setError(err.response?.data?.error || "No pudimos iniciar el juego.");
    } finally {
      setEnviando(false);
    }
  };

  /* =====================================================
     CRONÓMETRO
  ===================================================== */

  useEffect(() => {
    if (pantalla !== "juego" || !jugando) {
      return;
    }

    if (tiempoRestante <= 0) {
      setJugando(false);

      finalizarJuego(false);

      return;
    }

    const timer = setTimeout(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pantalla, jugando, tiempoRestante]);

  /* =====================================================
     CARTAS
  ===================================================== */

  const seleccionarCarta = (carta) => {
    if (
      !jugando ||
      bloqueoRef.current ||
      seleccionadas.some((item) => item.id === carta.id) ||
      parejasEncontradas.includes(carta.pareja)
    ) {
      return;
    }

    const nuevaSeleccion = [...seleccionadas, carta];

    setSeleccionadas(nuevaSeleccion);

    if (nuevaSeleccion.length !== 2) {
      return;
    }

    setMovimientos((prev) => prev + 1);

    bloqueoRef.current = true;

    const [primera, segunda] = nuevaSeleccion;

    if (primera.pareja === segunda.pareja) {
      const nuevasParejas = [...parejasEncontradas, primera.pareja];

      setParejasEncontradas(nuevasParejas);

      setSeleccionadas([]);

      bloqueoRef.current = false;

      /*
       * Sexto par encontrado.
       */
      if (nuevasParejas.length === 6) {
        setJugando(false);

        /*
         * +1 porque setMovimientos
         * todavía es asincrónico.
         */
        finalizarJuego(true, movimientos + 1);
      }

      return;
    }

    setTimeout(() => {
      setSeleccionadas([]);

      bloqueoRef.current = false;
    }, 650);
  };

  /* =====================================================
     FINALIZAR
  ===================================================== */

  const finalizarJuego = async (
    completado,
    movimientosFinales = movimientos,
  ) => {
    if (!participanteId) return;

    /*
     * Previene doble POST por render/timer.
     */
    if (pantalla === "finalizando") {
      return;
    }

    setPantalla("finalizando");

    try {
      const { data } = await axios.post(
        `${API_URL}/memotest/${participanteId}/finalizar`,
        {
          completado,
          movimientos: movimientosFinales,
        },
      );

      setResultado(data.participante);

      setPantalla("resultado");
    } catch (err) {
      setError(err.response?.data?.error || "No pudimos guardar el resultado.");

      /*
       * No reabrimos el juego para evitar
       * una segunda oportunidad artificial.
       */
      setPantalla("error-final");
    }
  };

  /* =====================================================
     HELPERS
  ===================================================== */

  const estaVisible = (carta) =>
    seleccionadas.some((item) => item.id === carta.id) ||
    parejasEncontradas.includes(carta.pareja);

  /* =====================================================
     FORMULARIO
  ===================================================== */

  if (pantalla === "formulario") {
    return (
      <main className="memo-page">
        <section className="memo-shell">
          <div className="memo-card">
            <img className="memo-logo" src={logo} alt="Universidad Siglo 21" />
            <span className="memo-kicker">NB 21K MAR DEL PLATA</span>

            <h1 className="memo-main-title">
              <span className="memo-title-white">TU PRÓXIMO</span>
              <span className="memo-title-white">DESAFÍO</span>
              <span className="memo-title-green">EMPIEZA ACÁ</span>
            </h1>

            <p className="memo-intro">Completá tus datos para participar.</p>

            <form className="memo-form" onSubmit={enviarFormulario}>
              <div className="memo-grid-2">
                <label>
                  Nombre
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    autoComplete="given-name"
                    placeholder="Tu nombre"
                  />
                </label>

                <label>
                  Apellido
                  <input
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    autoComplete="family-name"
                    placeholder="Tu apellido"
                  />
                </label>
              </div>

              <label>
                Teléfono
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Tu teléfono"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="tuemail@ejemplo.com"
                />
              </label>

              <div className="memo-question">
                <p>¿Tenés estudios universitarios?</p>

                <div className="memo-options">
                  {[
                    "¡Sí! Completos 🙌",
                    "Sí, pero incompletos 📚",
                    "Aún no 🌱",
                  ].map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      className={
                        form.estudiosUniversitarios === opcion ? "selected" : ""
                      }
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          estudiosUniversitarios: opcion,
                        }))
                      }
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="memo-question">
                <p>
                  ¿Te gustaría seguir formándote para crecer profesionalmente?
                </p>

                <div className="memo-options">
                  {[
                    "¡Sí! 🚀",
                    "Lo estoy evaluando 🤔",
                    "No por el momento 🙂",
                  ].map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      className={
                        form.interesFormacion === opcion ? "selected" : ""
                      }
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          interesFormacion: opcion,
                        }))
                      }
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="memo-question">
                <p>De ser así, ¿qué áreas te interesan?</p>

                <div className="memo-options memo-options-wrap">
                  {AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      className={
                        form.areasInteres.includes(area) ? "selected" : ""
                      }
                      onClick={() => toggleArea(area)}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div className="memo-question">
                <p>¿Qué tipo de formación te interesa?</p>

                <div className="memo-options">
                  {[
                    "Tecnicatura",
                    "Licenciatura",
                    "Curso corto",
                    "Diplomatura",
                    "Todavía no lo sé",
                  ].map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      className={
                        form.tipoFormacion === opcion ? "selected" : ""
                      }
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          tipoFormacion: opcion,
                        }))
                      }
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="memo-error">{error}</p>}

              <button
                className="memo-primary"
                type="submit"
                disabled={enviando}
              >
                {enviando ? "REGISTRANDO..." : "COMENZAR DESAFÍO"}
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     INSTRUCCIONES
  ===================================================== */

  if (pantalla === "instrucciones") {
    return (
      <main className="memo-page memo-center">
        <section className="memo-challenge">
          <img className="memo-logo" src={logo} alt="Universidad Siglo 21" />

          <span className="memo-kicker">
            ¿QUÉ TAN ENTRENADA ESTÁ TU MEMORIA?
          </span>

          <h1>
            ENCONTRÁ LOS
            <br />
            <span>6 PARES</span>
          </h1>

          <p>Completá el desafío antes de que termine el tiempo.</p>

          <div className="memo-time-intro">
            <small>TENÉS</small>
            <strong>30</strong>
            <span>SEGUNDOS</span>
          </div>

          <p className="memo-prize-copy">
            Si completás el desafío a tiempo, obtenés un código para retirar un
            premio en nuestro stand.
          </p>

          {error && <p className="memo-error">{error}</p>}

          <button
            className="memo-primary"
            onClick={comenzarJuego}
            disabled={enviando}
          >
            {enviando ? "PREPARANDO..." : "EMPEZAR DESAFÍO"}
          </button>
        </section>
      </main>
    );
  }

  /* =====================================================
     JUEGO
  ===================================================== */

  if (pantalla === "juego") {
    return (
      <main className="memo-page memo-game-page">
        <section className="memo-game">
          <div className="memo-game-top">
            <img
              className="memo-game-logo"
              src={logo}
              alt="Universidad Siglo 21"
            />

            <p>ENCONTRÁ LOS 6 PARES</p>

            <div
              className={`memo-countdown ${
                tiempoRestante <= 10 ? "warning" : ""
              } ${tiempoRestante <= 5 ? "critical" : ""}`}
            >
              <small>TIEMPO</small>

              <strong>
                00:
                {String(tiempoRestante).padStart(2, "0")}
              </strong>
            </div>

            <div className="memo-progress">
              Pares encontrados <strong>{parejasEncontradas.length} / 6</strong>
            </div>
          </div>

          <div className="memo-board">
            {cartas.map((carta) => {
              const visible = estaVisible(carta);

              return (
                <button
                  key={carta.id}
                  type="button"
                  className={`memo-tile ${visible ? "flipped" : ""} ${
                    parejasEncontradas.includes(carta.pareja) ? "matched" : ""
                  }`}
                  onClick={() => seleccionarCarta(carta)}
                  disabled={!jugando}
                >
                  <span className="memo-tile-inner">
                    <span className="memo-tile-back">
                      <img src={reverso} alt="" />
                    </span>

                    <span className="memo-tile-front">
                      <img src={carta.imagen} alt="" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     FINALIZANDO
  ===================================================== */

  if (pantalla === "finalizando") {
    return (
      <main className="memo-page memo-center">
        <div className="memo-loading">
          <img className="memo-logo" src={logo} alt="Universidad Siglo 21" />

          <h2>Guardando tu resultado...</h2>
        </div>
      </main>
    );
  }

  /* =====================================================
     RESULTADO
  ===================================================== */

  if (pantalla === "resultado" && resultado) {
    return (
      <main className="memo-page memo-center">
        {resultado.ganador && <Confetti recycle={false} numberOfPieces={350} />}

        <section className="memo-result">
          <img className="memo-logo" src={logo} alt="Universidad Siglo 21" />

          {resultado.ganador ? (
            <>
              <span className="memo-kicker">¡DESAFÍO SUPERADO!</span>

              <h1>
                TENÉS UNA
                <br />
                <span>SORPRESA</span>
              </h1>

              <p>Hay un premio esperándote en nuestro stand.</p>

              <div className="memo-code">
                <small>TU CÓDIGO</small>

                <strong>{resultado.codigoPremio}</strong>
              </div>

              <p className="memo-result-copy">
                Presentá este código en el stand de Universidad Siglo 21 durante
                la acreditación o el día de la Maratón.
              </p>

              <div className="memo-secondary-message">
                Además, ya estás participando del sorteo especial.
              </div>
            </>
          ) : (
            <>
              <span className="memo-kicker">¡DESAFÍO COMPLETADO!</span>

              <h1>
                TODAVÍA TENÉS
                <br />
                <span>UNA OPORTUNIDAD</span>
              </h1>

              <p>El tiempo terminó, pero tu participación tiene premio.</p>

              <div className="memo-draw-message">
                <small>YA ESTÁS PARTICIPANDO DEL</small>

                <strong>SORTEO ESPECIAL</strong>
              </div>

              <p className="memo-result-copy">
                No necesitás hacer nada más. Tu participación ya quedó
                registrada.
              </p>
            </>
          )}
        </section>
      </main>
    );
  }

  /* =====================================================
     YA PARTICIPÓ
  ===================================================== */

  if (pantalla === "ya-participo") {
    return (
      <main className="memo-page memo-center">
        <section className="memo-result">
          <img className="memo-logo" src={logo} alt="Universidad Siglo 21" />

          <span className="memo-kicker">PARTICIPACIÓN REGISTRADA</span>

          <h1>
            YA PARTICIPASTE
            <br />
            <span>DEL DESAFÍO</span>
          </h1>

          <p>Esta experiencia permite una participación por persona.</p>

          {resultado?.ganador && resultado?.codigoPremio && (
            <div className="memo-code">
              <small>TU CÓDIGO DE PREMIO</small>

              <strong>{resultado.codigoPremio}</strong>

              <p>Recordá presentarlo en el stand de Universidad Siglo 21.</p>
            </div>
          )}

          {!resultado?.ganador && (
            <div className="memo-secondary-message">
              Ya estás participando del sorteo especial.
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="memo-page memo-center">
      <section className="memo-result">
        <img className="memo-logo" src={logo} alt="Universidad Siglo 21" />

        <h2>No pudimos guardar el resultado.</h2>

        <p>
          Acercate al stand de Universidad Siglo 21 para que podamos ayudarte.
        </p>
      </section>
    </main>
  );
}
