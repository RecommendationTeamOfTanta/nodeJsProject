var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require("client-sessions");
var multipart = require('connect-multiparty');
var expressValidator = require('express-validator');
var flash = require('connect-flash');

//sessions through mongoDB
//var mongoStore = require('connect-mongo')(express);

var routes = require('./routes/index');
var users = require('./routes/users');
var rest = require('./routes/resturants.js');
var signup = require('./routes/signup.js');
var admin_rest = require('./routes/rest_admin.js');
var admin_master = require('./routes/admin_master.js');
var shazam = require('./routes/shazam.js');



var recommendation = require('./routes/recommendations.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://itarget:itarget@ds025792.mlab.com:25792/itarget');
//mongoose.connect('mongodb://127.0.0.1:27017/itarget');
var app = express();


//assign the swig view engine to .html files
var swig = require('swig');
app.engine('html', swig.renderFile)

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');






//session
app.use(session({
    cookieName: 'session',
    secret: 'fddsfsdfhkjsdhfkjsfhjkhfddsjkhfsjdkhfsdj',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.use(flash());


//to prevent 304 status code
app.use(function (req, res, next) {
    //res.setHeader('Last-Modified', (new Date()).toUTCString());
    req.headers['if-none-match'] = 'no-match-for-this';
    if (req.session && req.session.user) {
        res.locals.login = true;
        res.locals.user = req.session.user;
        next();
    } else {
        res.locals.login = false;
        next();
    }
});




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser());
app.use(expressValidator()); // this line must be immediately after express.bodyParser()!
app.use(multipart());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());








app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', routes);
app.use('/users', users);
app.use('/', signup);
app.use('/', recommendation);
app.use('/', admin_rest);
app.use('/', rest);
app.use('/masterr', admin_master);
app.use('/', shazam);


// session and cookies details


// catch 404 and forward to error handler


//to modify http response header (X-Powered-By of the request header)
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Itarget-team-2016')
    //prevent caching
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

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
