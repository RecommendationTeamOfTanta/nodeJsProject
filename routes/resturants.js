var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/rest*', function (req, res) {
 Resturant.findOne({_id:req.query.rest_id}, function (err, resturant) {
                reviewsNumber= resturant.reviews.length
                 res.render('rest', {rest:resturant,reviewsNumber:reviewsNumber});



            });

});

module.exports = router;
