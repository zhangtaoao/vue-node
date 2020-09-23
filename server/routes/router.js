module.exports = (app) => {
  var indexRouter = require('./index');
  var usersRouter = require('./users');
  var loginRouter = require('./login');
  var insertRouter = require('./insert');
  var updateRouter = require('./update');
  var uploadRouter = require('../utils/upload');
  var getFileRouter = require('./download');
  var deleteFileRouter = require('./deleteFile');
  var genVerifyCodeRouter = require('./genVerifyCode');

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/login', loginRouter);
  app.use('/insert', insertRouter);
  app.use('/update', updateRouter);
  app.use('/upload', uploadRouter);
  app.use('/getFile', getFileRouter);
  app.use('/deleteFile', deleteFileRouter);
  app.use('/genVerifyCode', genVerifyCodeRouter);
}