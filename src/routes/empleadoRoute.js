const express = require('express');
const router = express.Router();

const EmpleadoController = require('../controladores/empleadoControlador');

router.post('/insertar', EmpleadoController.insertarEmpleado);
router.post('/modificar', EmpleadoController.modificarEmpleado);
router.post('/buscar', EmpleadoController.buscarEmpleado);
router.get('/listar', EmpleadoController.listarEmpleados);
router.post('/eliminar', EmpleadoController.eliminarEmpleado);
router.post('/generarusuario', EmpleadoController.generarUsuario);



module.exports = router;