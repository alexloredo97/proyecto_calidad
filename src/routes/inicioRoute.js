const express = require('express');
const router = express.Router();

const inicioControlador = require('../controladores/inicioControlador');

router.get('/', inicioControlador.list);

module.exports = router;