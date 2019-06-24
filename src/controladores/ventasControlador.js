var Log = require('log');
var log = new Log('info');

function ingresarVenta(req, res) {
    const data = req.body;
    var codigo_venta;
    var cantidad = data.codigoPro.length;
    //res.json(data);
    req.getConnection((err, conn) => {
        conn.query('call ingresar_venta(?);', [
            data.codigoCli
        ], (err, row) => {
            if (err) {
                //res.json(err);
                log.info("error al ingresar en tabla venta");;
            }
            codigo_venta = row[0][0].CODVENTA_FAC;
            console.log("codigo de venta " + codigo_venta);


            for (var i = 0; i < cantidad; i++) {
                conn.query('call ingresar_detalle_venta(?,?,?,?);', [
                    codigo_venta,
                    data.codigoPro[i],
                    data.ventaAdicional[i],
                    data.cantidad[i]
                ], (err, row) => {
                    if (err) {

                        log.info("error al ingresar en tabla articulos_consulta");;
                    }
                });
            }
            req.flash('msj', 'Pedido agregado correctamente, presione aceptar para imprimir.');
            res.redirect('/');
        });

    });



}

function listarVentasCliente(req, res) {
    //res.json();
    sess = req.session;
    data = sess.data;
    var ventas = [];
    var detalle_ventas = [];
    req.getConnection((err, conn) => {
        conn.query('call venta_por_cliente(?)', [data.CODCLIENTE], (err, rows) => {
            if (err) {
                res.json(err);
            }
            ventas = rows[0];

            conn.query('call detalle_venta_cliente(?)', [data.CODCLIENTE], (err, rows_d) => {
                if (err) {
                    res.json(err);
                }
                detalle_ventas = rows_d[0];


                res.render('ventasVista', {
                    sess,
                    ventas: ventas,
                    detalle_ventas: detalle_ventas
                });

            });

        });
    });
}

function modificarVenta(req, res) {
    const data = req.body;
    var cantidad = data.cantidad.length; //para saber la cantidad de productos y servicios
    var codigo_venta = data.codigoVenta;
    //res.json(data);
    //console.log(cantidad);
    console.log(data);
    req.getConnection((err, conn) => {
        for (var i = 0; i < cantidad; i++) {
            conn.query('call modificar_venta_cliente(?,?,?,?);', [
                codigo_venta,
                data.codigoPro[i],
                data.cantidad[i],
                data.ventaAdicional[i]
            ], (err, row) => {
                if (err) {

                    log.info("error al ingresar en tabla articulos_consulta");;
                }

            });
        }
        req.flash('msj', 'Pedido modificado correctamente.');
        res.redirect('/ventas/miscompras');
    });

}

function eliminarVenta(req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('call eliminar_venta(?)', [id], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Compra eliminada correctamente');
            res.redirect('/ventas/miscompras');
        })
    });
}

module.exports = {
    ingresarVenta,
    listarVentasCliente,
    eliminarVenta,
    modificarVenta
}