const { Router } = require('express');
const {  
    sendEmailHandler, 
 } = require("../handlers/sendEmailHandler")

const router = Router();

// Configurar los routers
router.post("/sendEmail", sendEmailHandler);

module.exports = router;