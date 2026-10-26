const { obtenerFilas } = require("./memotestSheetsService");

// Solo datos públicos. Nunca exponer email, teléfono ni código de premio.
const obtenerRanking = async () => {
  const filas = await obtenerFilas();
  const participantes = filas.filter((fila) => fila[12] === "FINALIZADO" && fila[2]).map((fila) => ({
    id: fila[2],
    nombre: [fila[3], fila[4]].filter(Boolean).join(" ").trim(),
    tiempoMs: Number(fila[15]) || 0,
    tiempoSegundos: Number(fila[16]) || 0,
    movimientos: Number(fila[17]) || 0,
    completado: fila[18] === "SI",
    finJuego: fila[14] || "",
  }));
  participantes.sort((a, b) =>
    Number(b.completado) - Number(a.completado) ||
    a.movimientos - b.movimientos ||
    a.tiempoMs - b.tiempoMs ||
    a.finJuego.localeCompare(b.finJuego) ||
    a.id.localeCompare(b.id)
  );
  return participantes.map((p, i) => ({ ...p, puesto: i + 1 }));
};

module.exports = { obtenerRanking };
