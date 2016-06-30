var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');

//sessions through mongoDB
//var mongoStore = require('connect-mongo')(express);

var routes = require('./routes/index');
var users = require('./routes/users');

var signup = require('./routes/signup.js');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://itarget:itarget@ds025792.mlab.com:25792/itarget');
mongoose.connect('mongodb://localhost:27017/itargetLocal');
var app = express();


//assign the swig view engine to .html files
var swig = require('swig');
app.engine('html', swig.renderFile)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/signup',signup)

// session and cookies details
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//to modify http response header (X-Powered-By of the request header)
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Itarget-team-2016')
    next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
