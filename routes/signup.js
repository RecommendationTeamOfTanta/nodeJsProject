var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function (req, res, next) {
    res.render("signup")
});

router.post('/insert', function (req, res, next) {
    console.log(req.body.gender);
    var theUser = new User({
        name: {
            first: req.body.first,
            last: req.body.last
        },
        adress:req.body.address ,
        theEmail: req.body.mail,
        password: req.body.pass1,
        picture: "",
        gender: req.body.gender,
        mobile: req.body.mobile,
        role: "u"
    });

    theUser.save();

});

module.exports = router;
