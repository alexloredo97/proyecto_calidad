var Log = require('log');
var log = new Log('info');

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('call mostrar_productos()', (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('productoVista', {
                data: rows[0]
            });
        });
    });
};

controller.add = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('call ingresar_producto (?,?,?,?,?,?)', [
            data.nombre,
            data.descripcion,
            data.detalle,
            data.imagen,
            data.precio_base,
            data.tipo_producto
        ], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Producto agregado correctamente');
            res.redirect('/producto');
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
            req.flash('msj', 'Producto eliminado correctamente');
            res.redirect('/producto');
        })
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;


    log.info("data.imagen: " + data.imagen);


    req.getConnection((err, conn) => {
        conn.query('call modificar_producto(?,?,?,?,?,?,?)', [
            id,
            data.nombre,
            data.descripcion,
            data.detalle,
            data.imagen,
            data.tipo_producto,
            data.precio_base
        ], (err, row) => {


            if (err) {
                //res.json(err);
                log.info("error al modificar producto");;
            }
            req.flash('msj', 'producto modificado correctamente');
            res.redirect('/producto');


        })

    });
};

module.exports = controller;