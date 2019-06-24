const express = require('express');
const router = express.Router();

const perfilControlador = require('../controladores/perfilControlador');

router.get('/', perfilControlador.verPerfil);
router.post('/', perfilControlador.modificar);


module.exports = router;