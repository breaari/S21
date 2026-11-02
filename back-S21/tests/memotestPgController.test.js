const test = require("node:test");
const assert = require("node:assert/strict");
const repoPath = require.resolve("../src/services/memotestRepository");
const controllerPath = require.resolve("../src/controllers/memotestPgController");

// Unit tests with a mocked repository: no database or Google Sheets writes.
const calls = [];
const example = {
  id: "00000000-0000-4000-8000-000000000001",
  nombre: "Prueba", apellido: "Local", email: "test@example.invalid",
  telefono: "2494000000", estado: "REGISTRADO",
};
const mock = {
  buscarExistente: async () => null,
  registrar: async (value) => { calls.push(["registrar", value]); return { ...example, ...value }; },
  iniciar: async () => ({ yaFinalizado: false, inicioJuego: "2026-10-30T13:00:00.000Z" }),
  buscarPorId: async () => example,
  finalizar: async () => ({ nuevoFinalizado: true }),
};
require.cache[repoPath] = {
  id: repoPath, filename: repoPath, loaded: true, exports: mock
};
delete require.cache[controllerPath];
const controller = require(controllerPath);

const input = {
  nombre: " Prueba ", apellido: " Local ", email: " Test@Example.invalid ",
  telefono: "2494000000", estudiosUniversitarios: "NO",
  interesFormacion: "SI", areasInteres: ["Tecnología"],
  tipoFormacion: "Carrera", origen: "directo"
};

test("rechaza registro incompleto y no escribe", async () => {
  calls.length = 0;
  await assert.rejects(() => controller.registrarParticipante({ ...input, email: "" }),
    /campos obligatorios/i);
  assert.equal(calls.length, 0);
});

test("registra datos normalizados y conserva respuesta del frontend", async () => {
  calls.length = 0;
  const result = await controller.registrarParticipante(input);
  assert.equal(result.existente, false);
  assert.equal(result.participante.nombre, "Prueba");
  assert.equal(result.participante.email, "test@example.invalid");
  assert.match(result.participante.id, /^[0-9a-f-]{36}$/);
  assert.equal(calls.length, 1);
});

test("recupera participante sin duplicarlo", async () => {
  calls.length = 0;
  mock.buscarExistente = async () => ({ ...example, estado: "JUGANDO" });
  const result = await controller.registrarParticipante(input);
  assert.equal(result.existente, true);
  assert.equal(result.participante.id, example.id);
  assert.equal(calls.length, 0);
  mock.buscarExistente = async () => null;
});

test("iniciar conserva inicioJuego ISO y participante", async () => {
  const result = await controller.iniciarJuego(example.id);
  assert.equal(result.yaFinalizado, false);
  assert.equal(result.participante.id, example.id);
  assert.equal(result.inicioJuego, "2026-10-30T13:00:00.000Z");
});

test("finalización devuelve estado de nuevoFinalizado sin duplicar señal", async () => {
  const result = await controller.finalizarJuego(example.id, {
    movimientos: 8, completado: true
  });
  assert.equal(result.nuevoFinalizado, true);
  assert.equal(result.id, example.id);
  mock.finalizar = async () => ({ nuevoFinalizado: false });
  const repeated = await controller.finalizarJuego(example.id, {
    movimientos: 8, completado: true
  });
  assert.equal(repeated.nuevoFinalizado, false);
});
