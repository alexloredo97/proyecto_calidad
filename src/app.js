const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
//flash
const flash = require('express-flash');
const session = require('express-session');

//Importing Routes
const inicioRoute = require('./routes/inicioRoute');
const productoRoute = require('./routes/productoRoute');
const servicioRoute = require('./routes/servicioRoute');
const promocionRoute = require('./routes/promocionRoute');
const prodCliRoute = require('./routes/prodCliRoute');
const clienteRoute = require('./routes/clienteRoute');
const empleadoRoute = require('./routes/empleadoRoute');
const sesionRoute = require('./routes/sesionRoute');
const registroRoute = require('./routes/registroRoute');
const perfilRoute = require('./routes/perfilRoute');
const consultaRoute = require('./routes/consultasRouter');
const ventasRoute = require('./routes/ventasRoute');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

//Middlewares
app.use(morgan('dev'));
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'deservis'
}, 'single'));
app.use(express.urlencoded({ extended: false }));
//flash
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

//Routes
app.use('/', inicioRoute);
app.use('/producto', productoRoute);
app.use('/servicio', servicioRoute);
app.use('/promocion', promocionRoute);
app.use('/deservisa', prodCliRoute);
app.use('/cliente', clienteRoute);
app.use('/empleados', empleadoRoute);
app.use('/login', sesionRoute);
app.use('/registro', registroRoute);
app.use('/perfil', perfilRoute);
app.use('/consulta', consultaRoute);
app.use('/ventas', ventasRoute);

//Static Files
app.use(express.static(path.join(__dirname, 'publico')));

//Start
app.listen(app.get('port'), () => {
    console.log('Port 3000');
})