const express = require('express');
const router = express.Router();

const promocionControlador = require('../controladores/promocionControlador');
const sesionController = require('../controladores/sesionControlador');

router.get('/', sesionController.verificarSesionAdmin, promocionControlador.list);
router.post('/add', sesionController.verificarSesionAdmin, promocionControlador.add);
router.get('/delete/:id', sesionController.verificarSesionAdmin, promocionControlador.delete);
router.post('/update/:id', sesionController.verificarSesionAdmin, promocionControlador.update);

module.exports = router;