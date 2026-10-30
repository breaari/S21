const {
  registrarParticipante,
  iniciarJuego,
  finalizarJuego,
} = require("../controllers/memotestController");
const { obtenerRanking, invalidarRanking } = require("../services/memotestRankingService");
const { emitirFinalizacion, conectarRanking } = require("../services/memotestLiveService");

/* =========================================================
   REGISTRAR
========================================================= */

const registrarMemotestHandler = async (
  req,
  res,
) => {
  try {
    const resultado =
      await registrarParticipante(req.body);

    /*
     * Participante existente.
     */
    if (resultado.existente) {
      const { participante } = resultado;

      if (participante.estado === "FINALIZADO") {
        return res.status(409).json({
          ok: false,
          yaParticipo: true,
          mensaje:
            "Ya participaste de este desafío.",
          participante,
        });
      }

      /*
       * Si comenzó pero no terminó, permitimos
       * recuperar esa misma participación.
       */
      return res.status(200).json({
        ok: true,
        recuperado: true,
        participante,
      });
    }

    return res.status(201).json({
      ok: true,
      participante: {
        id: resultado.participante.id,
        nombre: resultado.participante.nombre,
      },
    });
  } catch (error) {
    console.error(
      "Error registrar memotest:",
      error,
    );

    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

/* =========================================================
   INICIAR
========================================================= */

const iniciarMemotestHandler = async (
  req,
  res,
) => {
  try {
    const resultado = await iniciarJuego(
      req.params.id,
    );

    return res.status(200).json({
      ok: true,
      ...resultado,
    });
  } catch (error) {
    console.error(
      "Error iniciar memotest:",
      error,
    );

    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

/* =========================================================
   FINALIZAR
========================================================= */

const finalizarMemotestHandler = async (
  req,
  res,
) => {
  try {
    const participante =
      await finalizarJuego(
        req.params.id,
        req.body,
      );

    if (participante.nuevoFinalizado) {
      invalidarRanking();
      emitirFinalizacion(participante.id);
    }
    return res.status(200).json({
      ok: true,
      participante,
    });
  } catch (error) {
    console.error(
      "Error finalizar memotest:",
      error,
    );

    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

const rankingMemotestHandler = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    return res.json({ ok: true, ranking: await obtenerRanking() });
  } catch (error) {
    console.error('Error ranking memotest:', error);
    return res.status(500).json({ ok: false, error: 'No se pudo obtener el ranking.' });
  }
};

module.exports = {
  rankingMemotestHandler,
  conectarRanking,
  registrarMemotestHandler,
  iniciarMemotestHandler,
  finalizarMemotestHandler,
};