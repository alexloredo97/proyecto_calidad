const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('call mostrar_clientes()', (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('clienteVista', {
                data: rows[0]
            });
        });
    });
};

controller.add = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('call ingresar_cliente (?,?,?,?,?,?,?,?,?)', [
            data.empresa,
            data.nombres,
            data.apell_paterno,
            data.apell_materno,
            data.celular,
            data.correo,
            data.contrasena,
            data.fecha_nac,
            data.telefono

        ], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Cliente agregado correctamente');
            res.redirect('/cliente');
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    req.getConnection((err, conn) => {
        conn.query('call eliminar_cliente(?)', [id], (err, row) => {
            if (err) {
                res.json(err);
            }
            req.flash('msj', 'Cliente eliminado correctamente');
            res.redirect('/cliente');
        })
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;



    req.getConnection((err, conn) => {
        conn.query('call modificar_datos_cliente(?,?,?,?,?,?,?,?,?)', [
            id,
            data.empresa,
            data.nombres,
            data.apellPat,
            data.apellMat,
            data.celular,
            data.correo,
            data.contraseña,
            data.fechaNac,
            data.telefono,

        ], (err, row) => {


            if (err) {
                //res.json(err);
                log.info("error al modificar cliente");;
            }
            req.flash('msj', 'cliente modificado correctamente');
            res.redirect('/cliente');


        })

    });
};

module.exports = controller;