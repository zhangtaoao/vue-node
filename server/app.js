var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var multer = require('multer')
var routers = require('./routes/router')

var cors = require('cors');

var app = express();

//文件上传
var upload = multer({ dest: 'upload/' });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
  origin: ['http://127.0.0.1:3030'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Conten-Type', 'Authorization']
}))

routers(app);

// app.use('/', function (req, res) {
//   let indexUrl = req.baseUrl ? (req.baseUrl + '/login') : '/login';
//   res.redirect(indexUrl);
//   return '';
// });

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
