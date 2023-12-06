require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//konfigurasi passport
const passport = require('passport');
//load mongodb db connection
require('./app_server/models/db');
require("./app_server/configs/passport"); //load file config
var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


//Set Routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var todoRouter = require("./app_server/routes/todo");

//Allow CORS
app.use(cors());

//Use Routes
app.use('/', indexRouter);
app.use('/users', usersRouter); //route ke model users
app.use("/todo", todoRouter);

app.use('/todo', (req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 
 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
 next();
});

//Catching Error
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({
        "message": err.name + ": " + err.message
      });
  }
});

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