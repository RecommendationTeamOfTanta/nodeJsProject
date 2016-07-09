var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        if (req.session.user.role === "U" || req.session.user.role === "AS") {
            res.redirect('essia')
        }

        else {
            Resturant.find({ approved: true }, function (err, resturants) {
                var rest_rate = {};
                var rate = 0;
                var count = 0;
                var avg = 0;

                for (var index = 0; index < resturants.length; index++) {

                    for (var x = 0; x < resturants[index].rates.length; x++) {
                        rate += resturants[index].rates[x].resturantVote;
                        count++;
                    }
                    avg = rate / count;
                    rest_rate[resturants[index].name] = avg;

                }
                //    res.render('rest_admin/add-resturantes');

                res.render('rest_admin/masterRestAll', { rest: resturants, rest_rate: rest_rate });

            });


        }

    } else {
        res.render("register/signin");
    }
});


router.get('/pending', function (req, res) {
    if (req.session && req.session.user) {
        if (req.session.user.role === "U" || req.session.user.role === "AS") {
            res.redirect('essia')
        }

        else {
            Resturant.find({ approved: false }, function (err, resturants) {

                res.render('rest_admin/pending', { rest: resturants });

            });


        }

    } else {
        res.render("register/signin");
    }
});



router.get('/approve*', function (req, res) {
    if (req.session && req.session.user) {
        if (req.session.user.role === "U" || req.session.user.role === "AS") {
            res.redirect('essia')
        }

        else {
            Resturant.findOne({ _id: req.query.rest_id }, function (err, resturant) {
                resturant.approved = true;
                resturant.save();
                res.redirect('/masterr/pending');

            });


        }

    } else {
        res.render("register/signin");
    }
});






router.get('/userr', function (req, res) {

    if (req.session && req.session.user) {
        if (req.session.user.role === "U" || req.session.user.role === "AS") {
            res.redirect('essia')
        }

        else {
            User.find({}, function (err, users) {

                var rating = {};
                var count = 0;
                var friendcount = 0;
                for (var index = 0; index < users.length; index++) {
                    //console.log(resturants[index]);
                    for (var x = 0; x < users[index].userRatings.length; x++) {
                        //  rate+=resturants[index].userRatings[x].resturantVote;
                        count++;

                    }
                    for (var x = 0; x < users[index].friends.length; x++) {
                        //  rate+=resturants[index].userRatings[x].resturantVote;
                        friendcount++;

                    }


                    // rest_rate[resturants[index].name]=avg;
                    rating[users[index].name] = {
                        friends: friendcount,
                        rate: count
                    };
                }

                res.render('rest_admin/masterUserAll', { user: users, totalrate: rating });

            });

        }
    }
    else {
        res.render("register/signin");

    }
});

module.exports = router;
