var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

var path = require('path'),

http = require('http'),
    util = require('util');
var fs = require("fs");




//add resturant
router.get('/add-resturant', function (req, res) {
    if (req.session && req.session.user) {

        res.render("rest_admin/add-resturant", { title: "add-resturant" });
    } else {
        res.render("register/signin", { title: "Login" });
    }
}).post('/add-resturant', function (req, res) {
    fs.readFile(req.files.thumbnail.path, function (err, data) {

        var dir = './public/uploads/resturants';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var newPath = path.resolve('./public/uploads/resturants/' + req.files.thumbnail.name);
        var theDbPhoto = path.join('uploads/resturants/', req.files.thumbnail.name);
        var branchs = req.body.branches.split(",");
        //upload the photo
        fs.writeFile(newPath, data, function (err) {
            if (!err) {
                var theResturant = new Resturant({
                    addedBy: req.session.user._id,
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
                //insert the resturant
                var save = theResturant.save(function (err, rest) {
                    if (!err) {
                        //push the resturant id into user.resturant (array)
                        User.findOne({ _id: req.session.user._id }, function (err, user) {
                            if (user) {
                                User.update({ '_id': req.session.user._id },
                                 { $push: { "resturants": rest._id } },
                                 { upsert: true },
                            function () { }
                            );
                            }
                        });
                        res.render('rest_admin/resturant-features', { rest_id: rest.id });
                    }
                });

            }
        });
    });






});

//insert the resturant futures
router.post('/add-rest-futures/:rest_id', function (req, res) {
    var rest_id = req.params.rest_id;
    var rest_futures = {
        smokingArea: req.body.smoker,
        placeForChildren: req.body.children,
        minimumCharge: req.body.minimum,
        delivery: req.body.delivery,
        wifi: req.body.wifi,
        makeSmallParties: req.body.parties,
        acceptCreditCard: req.body.credit,
        outDoorSetting: req.body.outdoor,
        hasTv: req.body.tv,
        carBarking: req.body.car,
        reservation: req.body.reservation,
        bookToRead: req.body.bookToRead
    };

    Resturant.findOne({ _id: rest_id }, function (err, resturant) {
        resturant.features = rest_futures;
        resturant.save();
    });


})



router.get('/cat-prod', function (req, res) {
    if (req.session && req.session.user) {
        res.render('rest_admin/cat-prod');

        User.findOne({ _id: req.session.user.id }, function (err, user) {
            var userResturants = user.resturants;
            resturant.save();
        });

    } else {
        res.redirect('/login');
    }
});




module.exports = router;
