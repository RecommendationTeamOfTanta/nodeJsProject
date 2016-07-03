var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

var path = require('path'),

http = require('http'),
    util = require('util');
var fs = require("fs");





router.get('/add-resturant', function (req, res) {
    if (req.session && req.session.user) {

        res.render("rest_admin/add-resturant");
    } else {
        res.render("register/signin");
    }
}).post('/addresturant', function (req, res) {
    fs.readFile(req.files.thumbnail.path, function (err, data) {

        var dir = './public/uploads/resturants';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var newPath = path.resolve('./public/uploads/resturants/' + req.files.thumbnail.name);
        var theDbPhoto = path.join('uploads/resturants/', req.files.thumbnail.name);
        var branchs = req.body.branches.split(",");
        console.log(req.body.agree);
        console.log(req.body.agree1);
        fs.writeFile(newPath, data, function (err) {
            if (!err) {
                console.log(branchs);
                var theResturant = new Resturant({
                    name: req.body.name,
                    description: req.body.description,
                    photo: theDbPhoto,
                    location: req.body.location,
                    mobile: req.body.mobile,
                    workingHours: {
                        startAt: req.body.startat,
                        endAt: req.body.endat
                    },
                    branches: branchs
                });
                var save = theResturant.save(function (err, rest) {
                    if (!err)
                    {
                        res.redirect('/resturant-features');
                    }
                });
            }
        });
    });






});


router.post('/upload', function (req, res, next) {




});


router.get('/upload', function (req, res) {
    res.render('rest_admin/upload');
});




module.exports = router;
