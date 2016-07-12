var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

router.get('/shazam/', function (req, res) {
    if (req.session.user && req.session) {
        User.findOne({ _id: req.session.user._id }, function (err, user) {
            res.setHeader('Content-Type', 'application/json');
            res.send(user.friends);
        }).populate("friends");
    }

});


router.post('/shazam-getrecom/:friend_id', function (req, res) {
    // if (req.session.user && req.session) {
    User.findOne({ _id: req.params.friend_id }, function (err, freind) {
        User.findOne({ _id: "578044fb3487b29019613c6d" }, function (err, user) {
            var counter1 = 0;
            var flag = true;
            var shazam = [];
            for (var i = 0; i < user.recommended_resturants.length; i++) {
                if (counter1 === 10) { break; }
                var counter2 = 0;
                for (var j = 0; j < freind.recommended_resturants.length; j++) {
                    if (counter2 === 10) { break; }
                    if (user.recommended_resturants[i].rest_id._id == freind.recommended_resturants[j].rest_id.id) {
                        shazam.push(user.recommended_resturants[i].rest_id);
                        flag = false;
                    }
                    counter2++;
                };
                counter1++;
            };
            if (flag) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify("there is no restaurant in common"));

            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(shazam);
            }
        }).populate('recommended_resturants.rest_id');


    }).populate('recommended_resturants.rest_id');
    // }

});
module.exports = router;

// //  res.setHeader('Content-Type', 'application/json');
// //             console.log(user.friends    );
// //             res.send(user.friends);