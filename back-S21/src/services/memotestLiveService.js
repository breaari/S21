const clientes = new Set();
let secuencia = 0;

const emitirFinalizacion = (id) => {
  secuencia += 1;
  const mensaje = `id: ${secuencia}\nevent: finalizado\ndata: ${JSON.stringify({ id })}\n\n`;
  for (const res of clientes) res.write(mensaje);
};

const conectarRanking = (req, res) => {
  res.set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.flushHeaders();
  res.write(": conectado\n\n");
  clientes.add(res);
  const latido = setInterval(() => res.write(": ping\n\n"), 20000);
  req.on("close", () => { clearInterval(latido); clientes.delete(res); });
};

module.exports = { emitirFinalizacion, conectarRanking };
