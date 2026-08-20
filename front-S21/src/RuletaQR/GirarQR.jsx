import { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

import "./RuletaQR.css";

import { Ruleta } from "../Ruleta/Ruleta";
import { preguntasHighSchool } from "../Ruleta/preguntasHighschool";

const API_URL = import.meta.env.PROD
  ? ""
  : `http://${window.location.hostname}:3003`;

export function GirarQR() {
  const [participante, setParticipante] = useState(null);

  const [esperando, setEsperando] = useState(0);

  const [cargando, setCargando] = useState(true);

  const iniciandoRef = useRef(false);

  const [cola, setCola] = useState([]);
  /*
   * En producción:
   * https://universidadsiglo21online.com/ruleta/qr/participar
   *
   * En desarrollo:
   * mantiene el mismo host/IP de la PC.
   */
  const participarUrl = `${window.location.protocol}//${window.location.host}/ruleta/qr/participar`;

  const consultarSiguiente = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/ruleta-qr/siguiente`);

      setEsperando(data.esperando ?? 0);
      setCola(data.cola ?? []);
      const siguiente = data.participante ?? null;

      if (!siguiente) {
        setParticipante(null);
        iniciandoRef.current = false;
        return;
      }

      /*
       * Si ya está jugando, simplemente
       * recuperamos ese participante.
       */
      if (siguiente.estado === "jugando") {
        setParticipante(siguiente);
        iniciandoRef.current = false;
        return;
      }

      /*
       * Encontramos al próximo participante
       * pendiente y le reservamos el turno.
       */
      if (siguiente.estado === "pendiente" && !iniciandoRef.current) {
        iniciandoRef.current = true;

        try {
          const respuesta = await axios.post(
            `${API_URL}/ruleta-qr/${siguiente.id}/iniciar`,
          );

          setParticipante(respuesta.data.participante);
        } finally {
          iniciandoRef.current = false;
        }
      }
    } catch (error) {
      console.error("Error consultando participante:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    consultarSiguiente();

    const interval = setInterval(consultarSiguiente, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [consultarSiguiente]);

  /*
   * POR AHORA usamos este botón para probar
   * el circuito completo.
   *
   * Después lo reemplazamos por la ruleta.
   */
  const finalizarTurno = async () => {
    if (!participante) return;

    try {
      await axios.post(`${API_URL}/ruleta-qr/${participante.id}/finalizar`);
      setParticipante(null);

      await consultarSiguiente();
    } catch (error) {
      console.error("Error finalizando participante:", error);
    }
  };

  if (cargando) {
    return (
      <div className="qr-screen-page">
        <div className="qr-screen-loading">Preparando ruleta...</div>
      </div>
    );
  }

  /*
   * =====================================================
   * PARTICIPANTE HABILITADO
   * =====================================================
   */

  /*
   * =====================================================
   * ESPERANDO PARTICIPANTE
   * =====================================================
   */

  return (
  <div className="qr-game-page">
    <main className="qr-game-wheel">
      <Ruleta
        preguntasPorCategoria={
          preguntasHighSchool
        }
        habilitada={Boolean(participante)}
        onFinalizarParticipacion={
          finalizarTurno
        }
      />
    </main>

    <aside className="qr-game-sidebar">
      <div className="qr-sidebar-header">
        <h1>
          ESCANEÁ + GIRÁ + GANÁ
        </h1>

        <p>
          Completá tus datos para participar.
        </p>
      </div>

      <div className="qr-sidebar-code">
        <QRCodeSVG
          value={participarUrl}
          size={220}
          level="M"
          includeMargin
        />
      </div>

      <div className="qr-current-player">
        <span className="qr-panel-label">
          TURNO ACTUAL
        </span>

        {participante ? (
          <>
            <strong>
              {participante.nombre}
            </strong>

            <div className="qr-player-ready">
              <span />
              LISTO PARA GIRAR
            </div>

            <button
              type="button"
              className="qr-skip-button"
              onClick={finalizarTurno}
            >
              Saltar turno
            </button>
          </>
        ) : (
          <p>
            Esperando participante...
          </p>
        )}
      </div>

      <div className="qr-sidebar-queue">
        <span className="qr-panel-label">
          PRÓXIMOS
        </span>

        {cola.length === 0 ? (
          <p>No hay personas esperando.</p>
        ) : (
          <div className="qr-queue-list">
            {cola
              .slice(0, 6)
              .map((persona) => (
                <div
                  key={persona.id}
                  className="qr-queue-person"
                >
                  <span>
                    {persona.posicion}
                  </span>

                  <strong>
                    {persona.nombre}
                  </strong>
                </div>
              ))}

            {cola.length > 6 && (
              <p className="qr-queue-more">
                + {cola.length - 6} más
              </p>
            )}
          </div>
        )}
      </div>
    </aside>
  </div>
);
}