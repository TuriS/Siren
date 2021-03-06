var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var playerRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', {
    layout: '_layout/main'
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap/dist')));
app.use('/glyphicons', express.static(path.join(__dirname, 'node_modules', 'glyphicons-only-bootstrap')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery/dist')));
app.use('/angular', express.static(path.join(__dirname, 'node_modules', 'angular')));
app.use('/angular-route', express.static(path.join(__dirname, 'node_modules', 'angular-route')));
app.use('/jstree', express.static(path.join(__dirname, 'node_modules', 'jstree', 'dist')));

app.use('/', indexRouter);
app.use('/player', playerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;