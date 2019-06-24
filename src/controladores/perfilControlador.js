const controller = {};

controller.verPerfil = (req, res) => {
    sess = req.session;
    data = sess.data;

    req.getConnection((err, conn) => {
        conn.query('call mostrar_cliente_unico(?)', [
            data.CODCLIENTE
        ], (err, row) => {
            if (err) {
                res.json(err);
            } else {
                sess.nombre = row[0][0].NOMBRES;
                res.render('perfilVista',{
                    data: row[0][0]
                });
            }
        });
    });
}

controller.modificar = (req, res) => {
    var cliente = req.body;

    req.getConnection((err, conn) => {
        conn.query('call modificar_datos_cliente (?,?,?,?,?,?,?,?,?,?)', [
            cliente.codigo,
            cliente.empresa,
            cliente.nombre,
            cliente.ape_pat,
            cliente.ape_mat,
            cliente.celular,
            cliente.correo,
            cliente.contrasena,
            cliente.fec_nac,
            cliente.telefono
        ], (err, row) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/perfil');
            }
        });
    });
}

module.exports = controller;