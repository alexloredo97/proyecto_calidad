const express = require('express');
const router = express.Router();

const ventasControlador = require('../controladores/ventasControlador');

router.post('/ingresar', ventasControlador.ingresarVenta);
router.get('/miscompras', ventasControlador.listarVentasCliente);
router.get('/eliminar/:id', ventasControlador.eliminarVenta);
router.post('/modificar', ventasControlador.modificarVenta);

module.exports = router;