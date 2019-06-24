const express = require('express');
const router = express.Router();

const prodCliController = require('../controladores/prodCliControlador');

router.get('/productos', prodCliController.listarProductoParaCliente);


module.exports = router;