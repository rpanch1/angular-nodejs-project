// common imports
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');


// imports for routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');

// cors authentication
var corsOptions = {
  origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));

// Connect to Database
mongoose.connect('mongodb://localhost:27017/group5db',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to Database') })
  .catch((error) => { console.log(error) });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Base URL: /api/v1
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/profile', profileRouter);

module.exports = app;
