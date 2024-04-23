const { Router } = require('express');
const { sendEmailHandler } = require("../handlers/sendEmailHandler");
const { carrerasHandler } = require('../handlers/carrerasHandler');

const router = Router();

// Configurar los routers
router.post("/sendEmail", sendEmailHandler);
router.get("/carreras", carrerasHandler);

module.exports = router;