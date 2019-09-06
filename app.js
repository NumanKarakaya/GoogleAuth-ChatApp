const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const redisStore=require('./helpers/redisStore');

const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const auth = require('./routes/auth');
const chat = require('./routes/chat');


const app = express();
const db = require('./helpers/db')();

const isAuthenticated=require('./middleware/isAuthenticated');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'angular')));
app.use(express.static(path.join(__dirname, 'javascripts')));

app.use(session({
  store:redisStore,
  secret:process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge:14*24*3600000 }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/chat',isAuthenticated ,chat);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
