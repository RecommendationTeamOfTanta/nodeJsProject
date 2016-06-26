var express = require('express');
var router = express.Router();
var itargetCtrl = require('../controllers/itarget.server.controller.js')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'tittlooo', name: 'eissavivh' });
});

router.post('/eissa', function (req, res) {
    itargetCtrl.inserRate();
    //return itargetCtrl.createRest(req.body);
});

router.post('/tefa', function (request, response) {
    return response.end(JSON.stringify({"eissa":3.5}));
});

module.exports = router;

