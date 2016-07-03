var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

/*registeration*/
router.get('/signup', function (req, res) {
    if (req.session && req.session.user) {
        res.redirect('/');
    } else {
        res.render("register/signup", { title: 'Sign up' });
    }
}).post('/signup', function (req, res) {
    console.log(req);
    var theUser = new User({
        name: {
            first: req.body.first,
            last: req.body.last
        },
        adress: req.body.address,
        theEmail: req.body.mail,
        password: req.body.pass1,
        picture: "",
        gender: req.body.gender,
        mobile: req.body.mobile,
        role: "u"
    });

    models.createUser(theUser, function (err, user) {
        if (!err) {
            req.session.user = user;
            res.redirect('/eissa');
        }
    });


});

router.get('/login', function (req, res) {
    if (req.session && req.session.user) {
        res.redirect('/');
    } else {
        res.render("register/signin", { title: 'Login' })
    }
}).post('/login', function (req, res) {
    var mail = req.body.mail;
    var password = req.body.password;

    //req.checkBody('mail', 'enter the email').notEmpty();
    //req.checkBody('mail', 'email not valid ').notEmpty();
    //req.checkBody('password', 'enter the password').notEmpty();

    //var errors = req.validationErrors();
    //if (errors) {
    //    res.render('register/signin', {
    //        errors: errors,
    //        mail: mail,
    //        password:password
    //    });
    //} else {
    //    req.flash('success', 'logged in successfully');
    //    res.redirect('/');
    //}

    User.findOne({ theEmail: mail }, function (err, user) {
        if (!user) {
            res.render('register/signin', { title: 'Login' });
        } else {
            //compare between the user password and the hash
            models.comparePassword(req.body.password, user.password, function (err, isMatch) {
                console.log(isMatch);
                if (isMatch) {
                     //sets a cookie with the user's info
                        req.session.user = user;
                        delete req.session.user.password;
                        res.redirect('/eissa');
                } else {
                    res.render('register/signin', { title: 'Login' });
                }
            })
           
        }

    });
});


router.get('/logout', function (req, res) {
    req.session.reset();
    res.render('register/signin', { title: 'Login' });
});


function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/signin');
    } else {
        next();
    }
};

router.get('/rate', requireLogin, function (req, res) {
    res.render('register/signin');
});


module.exports = router;
