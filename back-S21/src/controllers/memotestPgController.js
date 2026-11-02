const crypto = require("crypto");
const db = require("../services/memotestRepository");

const registrarParticipante = async (datos = {}) => {
  const { nombre, apellido, email, telefono, estudiosUniversitarios,
    interesFormacion, areasInteres, tipoFormacion, origen = "directo" } = datos;
  if (!nombre?.trim() || !apellido?.trim() || !email?.trim() ||
      !telefono?.trim() || !estudiosUniversitarios || !interesFormacion || !tipoFormacion)
    throw new Error("Completá todos los campos obligatorios.");
  if (!Array.isArray(areasInteres) || !areasInteres.length)
    throw new Error("Seleccioná al menos un área de interés.");

  const existente = await db.buscarExistente({ email, telefono });
  if (existente) return { existente: true, participante: existente };

  const participante = await db.registrar({
    id: crypto.randomUUID(), nombre: nombre.trim(), apellido: apellido.trim(),
    email: email.trim().toLowerCase(), telefono: telefono.trim(),
    estudiosUniversitarios, interesFormacion, areasInteres, tipoFormacion, origen
  });
  return { existente: false, participante };
};

const iniciarJuego = async (id) => {
  const resultado = await db.iniciar(id);
  if (resultado.yaFinalizado) return resultado;
  return {
    ...resultado,
    participante: await db.buscarPorId(id),
    inicioJuego: new Date(resultado.inicioJuego).toISOString()
  };
};

const finalizarJuego = async (id, datos) => {
  const { nuevoFinalizado } = await db.finalizar(id, datos);
  const participante = await db.buscarPorId(id);
  return { ...participante, nuevoFinalizado };
};

module.exports = { registrarParticipante, iniciarJuego, finalizarJuego };
