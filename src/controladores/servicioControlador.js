var Log = require('log');
var log = new Log('info');

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('call mostrar_servicios()', (err, rows) => {
            if (err) {
                res.json(err);
            }

            res.render('servicioVista', {
                data: rows[0]
            });
        });
    });
};

controller.add = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('call ingresar_servicio (?,?,?,?,?,?)', [
            data.nombre,
            data.descripcion,
            data.detalle,
            data.imagen,
            data.tipo_servicio,
            data.precio

        ], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Servicio agregado correctamente');
            res.redirect('/servicio');
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('call eliminar_product_servi(?)', [id], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Servicio eliminado correctamente');
            res.redirect('/servicio');
        })
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    log.info(data.imagen);

    req.getConnection((err, conn) => {
        conn.query('call modificar_servicio(?,?,?,?,?,?,?)', [
            id,
            data.nombre,
            data.descripcion,
            data.detalle,
            data.imagen,
            data.tipo_servicio,
            data.precio
        ], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Servicio modificado correctamente');
            res.redirect('/servicio');
        })
    });
};

module.exports = controller;