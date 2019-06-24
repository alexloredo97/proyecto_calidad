'use strict'
var Log = require('log');
var log = new Log('info');

function listarProductoParaCliente(req, res) {
    log.info("Peticion : controlador.listarProductoParaCliente");

    res.status(200).send({ mensaje: "correcto" });
}

module.exports = {
    listarProductoParaCliente
};