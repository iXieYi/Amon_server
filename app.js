/*
 * @Author: 凡琛
 * @Date: 2021-01-21 15:47:01
 * @LastEditTime: 2021-06-15 20:46:25
 * @LastEditors: Please set LastEditors
 * @Description: 入口
 * @FilePath: /Amon_server/app.js
 */
var createError = require('http-errors');
var express = require('express');

var path = require('path');
const config = require('./server/config');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const moment = require('moment');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var uploader = require('./routes/uploader');
var resolver = require('./routes/resolver');
var logIn = require('./server/base/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new redisStore(config.redis),
  resave: true,
  saveUninitialized: false,
  secret: config.session_secret
}));

// locals
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.moment = moment;
  res.locals.site = config.site;
    next();
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',apiRouter);
app.use('/uploader',uploader);
app.use('/images',resolver);
app.use('/logIn',logIn);




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
