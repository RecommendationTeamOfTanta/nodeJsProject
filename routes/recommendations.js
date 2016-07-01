var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;

var express = require('express');
var router = express.Router();


//get recommendation from the python service
router.get('/get-recommendation', function (req, res) {
    var request = require('request');
    request('http://eissa3101652.pythonanywhere.com/itarget/getrecommendation?user_id=3a99416c771c72c6c5640e8b032deac3', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })


});


module.exports = router;
