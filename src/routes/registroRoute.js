const express = require('express');
const router = express.Router();

const registroController = require('../controladores/registroControlador');

router.get('/', registroController.registro);
router.post('/', registroController.registrar);

module.exports = router;