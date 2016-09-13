var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users').users;
var drictive = require('./routes/drictive');
var charts = require('./routes/charts');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();
var mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'myproject'
  };
// view engine setup
app.set('views', path.join(__dirname, '../perfect-web/resource/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'love'
}));
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../perfect-web/')));
//用户路由
app.get('/', routes.index);
app.get('/login', users.renderLogin);
app.post('/ajaxLogin', users.login);
app.get('/logout', users.logout);
app.get('/register', users.register);

//个人动态路由
app.post('/getDynamic', users.getDynamic);
app.get('/page', users.page);
app.post('/comment', users.comment);

//图表
app.get('/charts', charts.charts);

//drictive
app.get('/header', drictive.header);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
