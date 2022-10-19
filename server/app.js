var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services')
const cardsRouter = require('./routes/cards');
const headers = require('./middleware/headers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(headers);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/services', servicesRouter)
app.use('/', indexRouter);

module.exports = app;
