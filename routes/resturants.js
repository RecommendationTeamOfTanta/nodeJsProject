﻿var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/resturant/:rest_id', function (req, res) {
    var rest_id = req.params.rest_id;
    Resturant.findOne({ _id: rest_id }, function (err, resturant) {
        if (resturant) {
            ratesCount = resturant.rates.length;
            var sumRate = 0;
            var avgRate = 0;
            for (var index = 0; index < resturant.rates.length; index++) {
                sumRate += resturant.rates[index].resturantVote;
            }
            avgRate = sumRate / ratesCount;
            reviewsNumber = resturant.reviews.length;

            if (req.session && req.session.user) {
                User.findOne({ _id: req.session.user._id }, { userRatings: { $elemMatch: { rest_id: rest_id } } }, function (err, user) {
                    if (user) {
                        if (user.userRatings.length > 0) {
                            res.render('rest', {
                                rest: resturant, reviewsNumber: reviewsNumber,
                                userVote: user.userRatings[0].resturantVote, avgRate: avgRate
                            });
                        } else {
                            res.render('rest', {
                                rest: resturant, reviewsNumber: reviewsNumber, avgRate: avgRate
                            });
                        }
                    }
                });
            }
            else {
                res.render('rest', { rest: resturant, reviewsNumber: reviewsNumber, avgRate: avgRate });
            }
        }
    }).populate('reviews.user_id');

});

router.post('/rate*', function (req, res) {
    if (req.session && req.session.user) {
        var rate = req.body.rate;
        var rest_id = req.body.id;
        var user_id = req.session.user._id;
        AddRate(user_id, rest_id, rate);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ msg: "success", rate: rate }));
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify("login"));
    }
});

router.post('/review*', function (req, res) {
    var user_id = req.session.user._id;;
    var rest_id = req.body.rest_id;
    var review_txt = req.body.review_text;
    var review_rate = req.body.rest_rate;
    if (review_txt && review_rate) {
        addReview(user_id, rest_id, review_txt, review_rate, function () {
            Resturant.findOne({ _id: rest_id }, function (err, resturant) {
                if (resturant) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(resturant.reviews));
                }
            }).populate('reviews.user_id');
        });
    }
});
//add and update rate
function AddRate(user_id, rest_id, rate) {
    //to check if user rate before
    Resturant.findOne({ _id: rest_id, "rates.user_id": user_id }, function (err, resturant) {
        // if not rate insert it
        if (!resturant) {
            Resturant.update({ '_id': rest_id },
                { $push: { "rates": { "resturantVote": rate, "user_id": user_id } } },
                { upsert: true },
                function () { }
            );

            //insert into user's userRatings list
            User.update({ '_id': user_id },
                { $push: { "userRatings": { "resturantVote": rate, "rest_id": rest_id } } },
                { upsert: true },
                function () { }
            );

        }
        // if he rate before delete it then insert the new(update)
        else {

            /*
                update for resturant's rates list 
             */
            Resturant.update(
                { '_id': rest_id },
                { $pull: { "rates": { "user_id": user_id } } },
                false,
                function () { }
            );
            //then insert te new rate 
            Resturant.update({ '_id': rest_id },
                { $push: { "rates": { "resturantVote": rate, "user_id": user_id } } },
                { upsert: true },
                function () { }
            );

            /*
              update for user's userRatings list 
           */
            //delete or remove
            User.update(
                { '_id': user_id },
                { $pull: { "userRatings": { "rest_id": rest_id } } },
                false,
                function () { }
            );
            //then insert te new rate 
            User.update({ '_id': user_id },
                { $push: { "userRatings": { "resturantVote": rate, "rest_id": rest_id } } },
                { upsert: true },
                function () { }
            );
        }
    });
}

function addReview(user_id, rest_id, review_txt, review_rate, callback) {
    //to check if user rate before
    Resturant.findOne({ _id: rest_id }, function (err, resturant) {
        // if not rate insert it
        if (resturant) {
            Resturant.update({ '_id': rest_id },
                { $push: { "reviews": { "user_id": user_id, "ReviewTxt": review_txt, "review_date": getDate("formated"), vote: review_rate } } },
                function () {
                    AddRate(user_id, rest_id, review_rate);
                    callback();
                }
            );
        }

    });

}


function getDate(type) {
    var today = new Date();
    if (type == "numeric") {
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        return today;

    } else if (type == "formated") {
        today = today.toString().split(' ').splice(1, 3).join(' ');
        return today;
    }
}

module.exports = router;
