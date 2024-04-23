const { Router } = require('express');
const { sendEmailHandler } = require("../handlers/sendEmailHandler");
const { carrerasHandler } = require('../handlers/carrerasHandler');

const router = Router();

// Configurar los routers
router.post("/", sendEmailHandler);
router.get("/", carrerasHandler);

module.exports = router;