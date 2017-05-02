if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null) {
  require('dotenv').config(); // Load .env
}

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require ('./auth/passport');

// App
const app = express();

// Importing models
const User = require('./models/User');//, //EMAIL VERIFICATION \/
const Business = require('./models/Business');
const Contact = require('./models/Contact');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Script = require('./models/Script');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport config
app.use(passport.initialize());
app.use(cors({
  origin: '*'
}));

// Using & Defining routes
app.use('/auth', require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));
app.use('/questions', require('./routes/questions'));
app.use('/answers', require('./routes/answers'));
app.use('/business', require('./routes/business'));
app.use('/scripts', require('./routes/scripts'));


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
