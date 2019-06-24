const express = require('express');
const router = express.Router();

const sesionController = require('../controladores/sesionControlador');

router.post('/', sesionController.iniciarSesion);
router.get('/', sesionController.verificarSesion, sesionController.redireccionInicio);
router.get('/logout', sesionController.cerrarSesion);

module.exports = router;