const controller = {};

controller.list = (req, res) => {
    sess = req.session;
    var productos = [];
    var servicios = [];
    var promocion = [];
    req.getConnection((err, conn) => {
        conn.query('call mostrar_productos()', (err, rows) => {
            productos = rows[0];
            conn.query('call mostrar_servicios()', (err, rows) => {
                servicios = rows[0];
                conn.query('select CODPROMOC as codigo, pro.NOMBREPROM as nombre, pro.DESCRIPCION as detalle, ' +
                    'pro.DESC_XUNIDAD as descuento, pro.codpromoc AS codigopro, pro.FECHAINICIO as date_ini, pro.FECHAFIN as date_fin ' +
                    'from promocion pro WHERE pro.estado =1 and CODPROMOC!=1', (err, rows) => {
                        promociones = rows;
                        res.render('inicioVista', {
                            sess,
                            productos: productos,
                            servicios: servicios,
                            promociones: promociones
                        });
                    });
            });
        });
    });
};

module.exports = controller;