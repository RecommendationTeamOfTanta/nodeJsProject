﻿var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function (req, res) {
    if (req.session && req.session.user) {
        res.redirect('/');
    } else {
        res.render("register/signup");
    }
}).post('/signup', function (req, res) {
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

    var eissas = theUser.save(function (err,user) {
        if(!err)
        {
            req.session.user = user;
            res.redirect('/eissa');
        }

    });

});

router.get('/login', function (req, res) {
    if (req.session && req.session.user) {
        res.redirect('/');
    } else {
        res.render("register/signin")
    }
}).post('/login', function (req, res) {
    User.findOne({ theEmail: req.body.mail }, function (err, user) {
        if (!user) {
            res.render('register/signin', { error: 'Invalid email or password.' });
        } else {
            if (req.body.password === user.password) {
                // sets a cookie with the user's info
                req.session.user = user;
                delete req.session.user.password;
                res.redirect('/eissa');
            } else {
                res.render('register/signin', { error: 'Invalid email or password.' });
            }
        }

    });
});













function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/signin');
    } else {
        next();
    }
};
router.get('/logout', function (req, res) {
    req.session.reset();
    res.redirect('/login');
});

router.get('/rate', requireLogin, function (req, res) {
    res.render('register/signin');
});

module.exports = router;
