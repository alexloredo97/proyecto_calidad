var Log = require('log');
var log = new Log('info');

function ingresarConsulta(req, res) {
    const data = req.body;
    var codigo_consulta;
    var cantidad = data.codigoPro.length;
    req.getConnection((err, conn) => {
        conn.query('call ingresar_consulta(?);', [
            data.codigoCli
        ], (err, row) => {
            if (err) {
                //res.json(err);
                log.info("error al ingresar en tabla consulta");;
            }
            codigo_consulta = row[0][0].codigo_consulta;
            console.log("codigo de consulta " + codigo_consulta);

            for (var i = 0; i < cantidad; i++) {
                conn.query('call agregar_prod_a_consulta(?,?,?);', [
                    codigo_consulta,
                    data.codigoPro[i],
                    data.consulta[i]
                ], (err, row) => {
                    if (err) {

                        log.info("error al ingresar en tabla articulos_consulta");;
                    }
                });
            }
            req.flash('msj', 'Consultas agregadas correctamente');
            res.redirect('/');
        });

    });

}

/*function verConsultasCliente(req, res) {
    sess = req.session;
    data = sess.data;
    var productos = [];
    var servicios = [];
    console.log(data);
    //call listar_productos_por_consulta((select CODCONSULTA from consulta where fk_cliente_codcliente = 1));
    req.getConnection((err, conn) => {
        conn.query('call mostrar_productos()', (err, rows) => {
            productos = rows[0];
            conn.query('call mostrar_servicios()', (err, rows) => {
                servicios = rows[0];
                conn.query('select CODCONSULTA from consulta where fk_cliente_codcliente = ?', [data.CODCLIENTE],
                    (err, row) => {
                        cod = row[0].CODCONSULTA
                        conn.query('call listar_productos_por_consulta(?)', [cod], (err, row) => {
                            console.log(row[0]);

                            res.render('consultaVista', {
                                productos: productos,
                                servicios: servicios,
                                consultas: row[0]
                            });
                        })
                    })
            })
        })
    })
}*/
function verConsultasCliente(req, res) {
    sess = req.session;
    data = sess.data;
    req.getConnection((err, conn) => {
        conn.query('call leer_consulta_cliente(?)', [data.CODCLIENTE], (err, rows) => {
            val = null;
            if (rows) {
                val = rows[0]
            }
            res.render('consultaVista', {
                consultas: val
            });
        })
    })
}

function atenderConsultas(req, res) {
    var productos = [];
    var servicios = [];
    req.getConnection((err, conn) => {
        conn.query('call mostrar_productos()', (err, rows) => {
            productos = rows[0];
            conn.query('call mostrar_servicios()', (err, rows) => {
                servicios = rows[0];
                conn.query('call mostrar_articulos_consulta()', (err, rows) => {
                    consultas = rows[0];
                    
                    console.log(consultas);
                    
                    res.render('consultaAdminVista', {
                        productos: productos,
                        servicios: servicios,
                        consultas: consultas
                    });
                })
            })
        })
    })
}

function responderConsultas(req, res) {
    const data = req.body;
    console.log(data.consulta);
    console.log(data.producto);
    console.log(data.respuesta);

    req.getConnection((err, conn) => {
        conn.query('call responder_prod_de_consulta(?,?,?)', [data.consulta, data.producto, data.respuesta],
            (err, rows) => {
                console.log(rows);
                req.flash('msj', 'Consultas respondida correctamente');
                res.redirect('/consulta/admin')
            })
    })
}

module.exports = {
    ingresarConsulta,
    verConsultasCliente,
    atenderConsultas,
    responderConsultas
}