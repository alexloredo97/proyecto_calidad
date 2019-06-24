'use strict'
var Log = require('log');
var log = new Log('info');

function insertarEmpleado(req, res) {

    log.info("empleadoControlador.insertarEmpleado");

    var empleado = req.body;


    req.getConnection((err, conn) => {
        conn.query('call ingresar_empleado (?,?,?,?,?,?,?,?,?,?)', [
            empleado.dni,
            empleado.cargo,
            empleado.nombres,
            empleado.apellPat,
            empleado.apellMat,
            empleado.celular,
            empleado.direccion,
            empleado.usuario,
            empleado.contrasena,
            empleado.fechaNac,

        ], (err, row) => {
            if (err) {
                log.info("empleadoControlador.insertarEmpleado ERROR DE BD");
            } else {
                //res.redirect();
                log.info("empleadoControlador.insertarEmpleado EMPLEADO INSERTADO EN BD");
                res.status(200).send(empleado);
            }
        });
    });



}

function modificarEmpleado(req, res) {
    log.info("empleadoControlador.modificarEmpleado");

    var empleado = req.body;
    log.info("var empleado.nombres : " + empleado.nombres);

    req.getConnection((err, conn) => {
        conn.query('call modificar_datos_empleado (?,?,?,?,?,?,?,?,?,?)', [
            empleado.dni,
            empleado.cargo,
            empleado.nombres,
            empleado.apellPat,
            empleado.apellMat,
            empleado.celular,
            empleado.direccion,
            empleado.usuario,
            empleado.contrasena,
            empleado.fechaNac,

        ], (err, row) => {
            if (err) {
                log.info("empleadoControlador.modificarEmpleado ERROR DE BD");
            } else {
                //res.redirect();
                log.info("empleadoControlador.modificarEmpleado EMPLEADO MODIFICADO EN BD");
                res.status(200).send(empleado);
            }
        });
    });


}

function buscarEmpleado(req, res) {
    log.info("empleadoControlador.buscarEmpleado");

    var empleado = req.body;

    req.getConnection((err, conn) => {
        conn.query('call mostrar_empleado_unico (?)', [
            empleado.dni

        ], (err, row) => {
            if (err) {
                log.info("empleadoControlador.buscarEmpleado ERROR DE BD");
            } else {
                //res.redirect();
                log.info("empleadoControlador.buscarEmpleado EMPLEADO BUSCADO EN BD");
                res.status(200).send(row[0]);
            }
        });
    });
}

function listarEmpleados(req, res) {
    log.info("empleadoControlador.listarEmpleados");

    var empleado = req.body;

    req.getConnection((err, conn) => {
        conn.query('call mostrar_empleados()', [
            empleado.dni

        ], (err, row) => {
            if (err) {
                log.info("empleadoControlador.listarEmpleados ERROR DE BD");
            } else {
                //res.redirect();
                log.info("empleadoControlador.listarEmpleados EMPLEADOS LISTADOS EN BD");
                res.status(200).send(row[0]);
            }
        });
    });
}



function eliminarEmpleado(req, res) {
    log.info("empleadoControlador.eliminarEmpleado");

    var empleado = req.body;

    req.getConnection((err, conn) => {
        conn.query('call eliminar_empleado (?)', [
            empleado.dni

        ], (err, row) => {
            if (err) {
                log.info("empleadoControlador.eliminarEmpleado ERROR DE BD");
            } else {
                //res.redirect();
                log.info("empleadoControlador.eliminarEmpleado EMPLEADO ELIMINADO EN BD");
                res.status(200).send(empleado);
            }
        });
    });
}

function generarUsuario(req, res) {
    log.info("empleadoControlador.generarUsuario");

    var temp = req.body;
    var usuario = temp.nombres.charAt(0) + temp.apellPat.substring(0, 5) + temp.apellMat.charAt(0);
    res.status(200).send({ usuario });
    return usuario;
}

module.exports = {
    insertarEmpleado,
    modificarEmpleado,
    buscarEmpleado,
    listarEmpleados,
    eliminarEmpleado,
    generarUsuario
}