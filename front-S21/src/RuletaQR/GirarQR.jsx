import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

import "./RuletaQR.css";

const API_URL = import.meta.env.PROD
  ? ""
  : `http://${window.location.hostname}:3003`;

export function GirarQR() {
  const [participante, setParticipante] =
    useState(null);

  const [esperando, setEsperando] =
    useState(0);

  const [cargando, setCargando] =
    useState(true);

  const iniciandoRef = useRef(false);

  /*
   * En producción:
   * https://universidadsiglo21online.com/ruleta/qr/participar
   *
   * En desarrollo:
   * mantiene el mismo host/IP de la PC.
   */
  const participarUrl = `${window.location.protocol}//${window.location.host}/ruleta/qr/participar`;

  const consultarSiguiente =
    useCallback(async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/ruleta-qr/siguiente`,
        );

        setEsperando(data.esperando ?? 0);

        const siguiente =
          data.participante ?? null;

        if (!siguiente) {
          setParticipante(null);
          iniciandoRef.current = false;
          return;
        }

        /*
         * Si ya está jugando, simplemente
         * recuperamos ese participante.
         */
        if (
          siguiente.estado === "jugando"
        ) {
          setParticipante(siguiente);
          iniciandoRef.current = false;
          return;
        }

        /*
         * Encontramos al próximo participante
         * pendiente y le reservamos el turno.
         */
        if (
          siguiente.estado === "pendiente" &&
          !iniciandoRef.current
        ) {
          iniciandoRef.current = true;

          try {
            const respuesta =
              await axios.post(
                `${API_URL}/ruleta-qr/${siguiente.id}/iniciar`,
              );

            setParticipante(
              respuesta.data.participante,
            );
          } finally {
            iniciandoRef.current = false;
          }
        }
      } catch (error) {
        console.error(
          "Error consultando participante:",
          error,
        );
      } finally {
        setCargando(false);
      }
    }, []);

  useEffect(() => {
    consultarSiguiente();

    const interval = setInterval(
      consultarSiguiente,
      1000,
    );

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
      await axios.post(
        `${API_URL}/ruleta-qr/${participante.id}/finalizar`,
      );

      setParticipante(null);

      await consultarSiguiente();
    } catch (error) {
      console.error(
        "Error finalizando participante:",
        error,
      );
    }
  };

  if (cargando) {
    return (
      <div className="qr-screen-page">
        <div className="qr-screen-loading">
          Preparando ruleta...
        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * PARTICIPANTE HABILITADO
   * =====================================================
   */

  if (participante) {
    return (
      <div className="qr-screen-page">
        <div className="qr-ready">
          <div className="qr-ready-kicker">
            ¡YA PODÉS JUGAR!
          </div>

          <h1>
            ¡Listo,{" "}
            <span>
              {participante.nombre}
            </span>
            !
          </h1>

          <p>
            Tu ruleta está habilitada.
          </p>

          <div className="qr-ready-arrow">
            ↓
          </div>

          <button
            type="button"
            className="qr-ready-button"
            onClick={finalizarTurno}
          >
            TOCÁ PARA GIRAR
          </button>

          <p className="qr-dev-warning">
            Botón temporal de prueba. En el
            próximo paso acá aparecerá la
            ruleta real.
          </p>

          {esperando > 0 && (
            <div className="qr-waiting-count">
              {esperando}{" "}
              {esperando === 1
                ? "persona esperando"
                : "personas esperando"}
            </div>
          )}
        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * ESPERANDO PARTICIPANTE
   * =====================================================
   */

  return (
    <div className="qr-screen-page">
      <div className="qr-screen-layout">
        <div className="qr-screen-copy">
          <div className="qr-screen-kicker">
            UNIVERSIDAD SIGLO 21
          </div>

          <h1>
            ESCANEÁ
            <br />
            <span>+ GIRÁ</span>
            <br />
            + GANÁ
          </h1>

          <div className="qr-screen-steps">
            <div>
              <strong>1</strong>

              <span>
                Escaneá el QR
              </span>
            </div>

            <div>
              <strong>2</strong>

              <span>
                Completá tus datos
              </span>
            </div>

            <div>
              <strong>3</strong>

              <span>
                Girá la ruleta
              </span>
            </div>
          </div>
        </div>

        <div className="qr-code-card">
          <div className="qr-code-wrapper">
            <QRCodeSVG
              value={participarUrl}
              size={330}
              level="M"
              includeMargin
            />
          </div>

          <h2>
            Escaneá para participar
          </h2>

          <p>
            Completá tus datos desde tu
            celular.
          </p>

          {esperando > 0 && (
            <div className="qr-waiting-count">
              {esperando}{" "}
              {esperando === 1
                ? "persona esperando"
                : "personas esperando"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}