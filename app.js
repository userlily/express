let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const session = require("./util/session_redis")
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session)
// app.use(session({
//   name:'sid', // session名字
//   resave: false,
//   rolling:true,      //每次请求都更新cookie 的时间
//   saveUninitialized: false, // 强制将“未初始化”的会话保存到存储区。会话是新的但未修改时是未初始化状态
//   secret: 'keyboard cat', // 签名 加解密用的
//   cookie: {
//     httpOnly: 'true',
//     path:'/',
//     maxAge: 1000 * 60  * 60 * 24,
//   }
// }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
