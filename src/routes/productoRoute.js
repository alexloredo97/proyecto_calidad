const express = require('express');
const router = express.Router();

const productoControlador = require('../controladores/productoControlador');
const sesionController = require('../controladores/sesionControlador');

router.get('/', sesionController.verificarSesionAdmin, productoControlador.list);
router.post('/add', sesionController.verificarSesionAdmin, productoControlador.add);
router.get('/delete/:id', sesionController.verificarSesionAdmin, productoControlador.delete);
router.post('/update/:id', sesionController.verificarSesionAdmin, productoControlador.update);

module.exports = router;