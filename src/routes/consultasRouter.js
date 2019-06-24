const express = require('express');
const router = express.Router();

const consultaControlador = require("../controladores/consultasControlador");

router.post('/', consultaControlador.ingresarConsulta);
router.get('/', consultaControlador.verConsultasCliente);
router.get('/admin', consultaControlador.atenderConsultas);
router.post('/responder', consultaControlador.responderConsultas);

module.exports = router;