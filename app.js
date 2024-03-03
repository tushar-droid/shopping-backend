var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoDB = "mongodb+srv://tusharsandhu:Learn2023@cluster0.iz9qxku.mongodb.net/productsDB?retryWrites=true&w=majority";


var indexRouter = require('./routes/index')
var productsRouter = require('./routes/products')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


createConnection().catch(err => console.log("FAILED TO CONNECT TO THE DB: ", err))
async function createConnection(){
  await mongoose.connect(mongoDB);
}





app.use('/', indexRouter);
app.use('/shop', productsRouter)








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
