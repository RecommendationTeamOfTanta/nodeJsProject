var express = require('express');
var router = express.Router();
var itargetCtrl = require('../controllers/itarget.server.controller.js')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'tittlooo', name: 'eissavivh' });
});

router.get('/eissa', function (req, res) {
    //itargetCtrl.insertRate("577230f0bb2f1b2e7ce995f0","57722ebcbb2f1b1af0000f68",10);
    //return itargetCtrl.createRest(req.body);
    itargetCtrl.GetAllResturants();

});

router.get('/getall', function (request, response) {
    //return response.end(JSON.stringify({"eissa":3.5}));
    itargetCtrl.Getall();
});

module.exports = router;

