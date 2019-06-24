const express = require('express');
const router = express.Router();

const servicioControlador = require('../controladores/servicioControlador');
const sesionController = require('../controladores/sesionControlador');

router.get('/', sesionController.verificarSesionAdmin, servicioControlador.list);
router.post('/add', sesionController.verificarSesionAdmin, servicioControlador.add);
router.get('/delete/:id', sesionController.verificarSesionAdmin, servicioControlador.delete);
router.post('/update/:id', sesionController.verificarSesionAdmin, servicioControlador.update);

module.exports = router;