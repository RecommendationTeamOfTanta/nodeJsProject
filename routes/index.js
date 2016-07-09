var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:page', function (req, res, next) {
    Resturant.find({}, function (err, resturants) {
        if (resturants) {
            var pageCount = Math.ceil(resturants.length / 12);
            console.log(resturants);
            var rest_rate = {};

            // calculate the average rate for evry resturant
            for (var index = 0; index < resturants.length; index++) {
                var rate = 0;
                var avg = 0;
                for (var x = 0; x < resturants[index].rates.length; x++) {
                    rate += resturants[index].rates[x].resturantVote;
                }
                if (resturants[index].rates.length > 0) {
                    avg = rate / resturants[index].rates.length;
                }
                else {
                    avg = 0;
                }
                // append new property avgRate to evry resturant in resturants array
                resturants[index].avgRate = avg;
            }
            console.log(rest_rate);
            res.render('home', { resturants: resturants, pageCount: pageCount });
        }


    }).skip((Number(req.params.page) - 1) * 3).limit(12);
});



module.exports = router;

