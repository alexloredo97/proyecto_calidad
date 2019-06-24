const controller = {};

controller.redireccionInicio = (req, res) => {
    res.redirect('/');
}

controller.registro = (req, res) => {
    res.render('registro.ejs');
    /*sess = req.session;
    if (sess.usuario == 'a' || sess.usuario == 'c') {
        res.redirect('/');
    }else{
        res.render('registro.ejs');
    }*/
}

controller.registrar = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('call ingresar_cliente (?,?,?,?,?,?,?,?,?)', [
            data.empresa,
            data.nombre,
            data.ape_pat,
            data.ape_mat,
            data.celular,
            data.correo,
            data.contrasena,
            data.fec_nac,
            data.telefono
        ], (err, row) => {
            if (err) {
                res.render('login.ejs', {
                    title: 'Error',
                    type: 'danger',
                    msg: 'Correo ya existente'
                });
            }else{
                req.flash('msj', 'Cuenta creada correctamente');
                res.redirect('/login');
            }
        });
    });
}

module.exports = controller;