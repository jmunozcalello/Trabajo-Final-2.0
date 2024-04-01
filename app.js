var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inscripcionRouter = require('./routes/inscripcion');
var loginRouter = require ('./routes/login');
var novedadesRouter = require ('./routes/admin/novedades.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inscripcion', inscripcionRouter);
app.use('/login', loginRouter);
app.use('/admin/novedades', novedadesRouter);

//pool.query('select * from novedades').then(function(resultados){
//  console.log(resultados)
//});

//var obj = {
//  titulo: 'Nueva Sede',
//  desarrollo: 'Una nueva sede se encuentra en las ultimas etapas de construccion, en ella se dictaran las nuevas tecnicaturas y pos-grados.'
//}

//pool.query('insert into novedades set ?', [obj]).then(function (resultados) {
//  console.log(resultados)
//});

//var id = 4;
//var obj = {
//  titulo: 'Fechas de examen',
//  desarrollo: 'A partir del 04/04/2024 se encontraran disponibles las fechas de examen en las secretarias de todas las sedes'
//}
//pool.query('update novedades set ? where id=?', [obj, id]).then(function(resultados){
//  console.log(resultados);
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
