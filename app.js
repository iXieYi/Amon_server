/*
 * @Author: 凡琛
 * @Date: 2021-01-21 15:47:01
 * @LastEditTime: 2021-07-21 17:39:10
 * @LastEditors: Please set LastEditors
 * @Description: 入口
 * @FilePath: /Amon_server/app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const config = require('./server/config');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const moment = require('moment');

//统一路由
const router = require('./router');
const myLogger = require('./server/common/logger');
//配置统一的返回格式
const response = require('./server/common/response');
global.response = response.response;
var app = express();
// 解决浏览器跨域options问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', "Content-Type, Content-Length, Authorization, Accept, X-Requested-With,Referer ,User-Agent, userid, token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method.toLowerCase() == 'options') {
    res.send(200);  // 让options尝试请求快速结束
  } else {
    next();
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Redis
app.use(session({
  store: new redisStore(config.redis),
  resave: true,
  saveUninitialized: false,
  secret: config.session_secret
}));

// Locals
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.moment = moment;
  res.locals.site = config.site;
  next();
});

app.use('/', router);

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
// 异常处理
process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});
// 异常处理
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
})

// app.listen(config.port,() => {
//   myLogger.info('server listening on port：' + config.port);
// })

module.exports = app;
