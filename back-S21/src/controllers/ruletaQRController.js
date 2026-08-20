const crypto = require("crypto");

const participantes = [];

const crearParticipante = ({
  nombre,
  apellido,
  correo,
  telefono,
  localidad,
}) => {
  if (
    !nombre?.trim() ||
    !apellido?.trim() ||
    !correo?.trim() ||
    !telefono?.trim() ||
    !localidad?.trim()
  ) {
    throw new Error("Faltan campos obligatorios");
  }

  const participante = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono.trim(),
    localidad: localidad.trim(),
    estado: "pendiente",
    creadoEn: new Date().toISOString(),
    iniciadoEn: null,
    finalizadoEn: null,
  };

  participantes.push(participante);

  console.log(
    `🎡 Nuevo participante: ${participante.nombre}`,
  );

  return participante;
};

const obtenerSiguienteParticipante = () => {
  const jugando = participantes.find(
    (participante) =>
      participante.estado === "jugando",
  );

  if (jugando) {
    return {
      participante: jugando,
      esperando: participantes.filter(
        (participante) =>
          participante.estado === "pendiente",
      ).length,
    };
  }

  const siguiente = participantes.find(
    (participante) =>
      participante.estado === "pendiente",
  );

  return {
    participante: siguiente || null,
    esperando: participantes.filter(
      (participante) =>
        participante.estado === "pendiente",
    ).length,
  };
};

const iniciarParticipante = (id) => {
  const participante = participantes.find(
    (item) => item.id === id,
  );

  if (!participante) {
    throw new Error("Participante no encontrado");
  }

  const otroJugando = participantes.find(
    (item) =>
      item.estado === "jugando" &&
      item.id !== id,
  );

  if (otroJugando) {
    throw new Error(
      "Ya existe un participante jugando",
    );
  }

  if (participante.estado === "finalizado") {
    throw new Error(
      "El participante ya finalizó",
    );
  }

  participante.estado = "jugando";

  if (!participante.iniciadoEn) {
    participante.iniciadoEn =
      new Date().toISOString();
  }

  return participante;
};

const finalizarParticipante = (id) => {
  const participante = participantes.find(
    (item) => item.id === id,
  );

  if (!participante) {
    throw new Error("Participante no encontrado");
  }

  participante.estado = "finalizado";
  participante.finalizadoEn =
    new Date().toISOString();

  return participante;
};

module.exports = {
  crearParticipante,
  obtenerSiguienteParticipante,
  iniciarParticipante,
  finalizarParticipante,
};