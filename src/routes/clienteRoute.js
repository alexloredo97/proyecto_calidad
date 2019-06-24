const express = require('express');
const router = express.Router();

const clienteControlador = require('../controladores/clienteControlador');
const sesionController = require('../controladores/sesionControlador');

router.get('/', sesionController.verificarSesionAdmin, clienteControlador.list);
router.post('/add', sesionController.verificarSesionAdmin, clienteControlador.add);
router.get('/delete/:id', sesionController.verificarSesionAdmin, clienteControlador.delete);
router.post('/update/:id', sesionController.verificarSesionAdmin, clienteControlador.update);

module.exports = router;