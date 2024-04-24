var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adopciones = require('./adopciones');
var incidencias = require('./incidencias');
var mascotas = require('./mascotas');
var reportes = require('./reportes');
var token = require('./token');
var usuarios = require('./usuarios');
var vacunas = require('./vacunas');

//comentario xd
// otro comentario xd

var app = express();
// Iniciar el servidor Express
app.listen(8000, function() {
  console.log('Servidor en funcionamiento en el puerto 8000');
});

// Configurar el middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Configurar las rutas en json

app.get('/adopciones', (req, res) => {
  res.json(adopciones);
});

app.get('/incidencias', (req, res) => {
  res.json(incidencias);
});

app.get('/mascotas', (req, res) => {
  res.json(mascotas);
});

app.get('/reportes', (req, res) => {
  res.json(reportes);
});

app.get('/token', (req, res) => {
  res.json(token);
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/vacunas', (req, res) => {
  res.json(vacunas);
});

// Configurar las rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Configurar las rutas para / y /usuarios
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página principal!');
});

// Capturar 404 y enviar al controlador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Controlador de errores
app.use(function(err, req, res, next) {
  // Establecer variables locales, proporcionar solo el error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
