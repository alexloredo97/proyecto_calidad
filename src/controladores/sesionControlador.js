const controller = {};

controller.redireccionInicio = (req, res) => {
    res.redirect('/');
}

controller.iniciarSesion = (req, res) => {
    sess = req.session;

    var user = req.body.user;
    var pass = req.body.pass;

    req.getConnection((err, conn) => {
        if (!validarEmail(user)) {

            conn.query('call login_empleado (?,?)', [
                user,
                pass
            ], (err, row) => {
                if (row[0].length) {
                    sess.usuario = 'a';
                    if (row[0].codigo_rol == 1) {
                        sess.admin = 1;

                    }
                    res.redirect('back');
                } else {
                    res.render('login.ejs', {
                        title: 'Error',
                        type: 'danger',
                        msg: 'Usuario o contraseña inválidos'
                    });
                }
            });

        } else {
            conn.query('call login_cliente (?,?)', [
                user,
                pass
            ], (err, row) => {
                if (row[0].length) {
                    sess.usuario = 'c';
                    sess.nombre = row[0][0].NOMBRES;
                    sess.data = row[0][0];
                    res.redirect('back');
                } else {
                    res.render('login.ejs', {
                        title: 'Error',
                        type: 'danger',
                        msg: 'Usuario o contraseña inválidos'
                    });
                }
            });
        }
    });
}

controller.verificarSesionAdmin = (req, res, next) => {
    sess = req.session;
    if (sess.usuario == 'a') {
        next();
    } else if (sess.usuario == 'c') {
        res.redirect('/');
    } else {
        res.render('login.ejs', {
            title: 'Alerta',
            type: 'warning',
            msg: 'Ingrese como administrador'
        });
    }
}

controller.verificarSesion = (req, res, next) => {
    sess = req.session;
    if (sess.usuario == 'a' || sess.usuario == 'c') {
        next();
    } else {
        res.render('login.ejs');
    }
}

controller.cerrarSesion = (req, res, next) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}

function validarEmail(valor) {
    emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


    if (emailRegex.test(valor)) {
        return true;
    } else {
        return false;
    }
}

module.exports = controller;