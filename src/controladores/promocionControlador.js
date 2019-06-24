const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('call mostrar_promocion()', (err, rows) => {
            promociones = rows[0];
            conn.query('call mostrar_productos()', (err, rows) => {
                productos = rows[0];
                conn.query('call mostrar_servicios()', (err, rows) => {
                    servicios = rows[0];
                    var aux, cod;
                    res.render('promocionVista', {
                        promociones: promociones,
                        productos: productos,
                        servicios: servicios,
                        aux: aux,
                        cod: cod
                    });
                });
            });
        });
    });
};

controller.add = (req, res) => {
    const data = req.body;
    const id_pro_ser = data.id_pro_ser;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO PROMOCION (NOMBREPROM, DESCRIPCION,DESC_XUNIDAD,FECHAINICIO,FECHAFIN) ' +
            'VALUES (?,?,?,?,?)', [
                data.nombre,
                data.detalle,
                data.descuento,
                data.date_ini,
                data.date_fin
            ], (err, row) => {
                console.log(row);
                const id_row = row.insertId;
                conn.query('update product_servi set fk_cod_promocion = ' + id_row + ' where cod_prod_serv = ' + id_pro_ser, (err, row) => {
                    req.flash('msj', 'Promocion agregada correctamente');
                    res.redirect('/Promocion');
                });
            });
    });
};
controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('call eliminar_promocion(?)', [id], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Promocion eliminada correctamente');
            res.redirect('/promocion');
        })
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('call modificar_promocion(?,?,?,?,?,?)', [
            id,
            data.nombre,
            data.detalle,
            data.descuento,
            data.date_ini,
            data.date_fin
        ], (err, row) => {
            if (err) {
                res.json(err);
            };
            req.flash('msj', 'Promocion modificado correctamente');
            res.redirect('/promocion');
        })
    });
};
module.exports = controller;