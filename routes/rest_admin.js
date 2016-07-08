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
            console.log(err);
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
                    console.log(err);
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


});


// add category 
router.get('/add-cat', function (req, res) {
    if (req.session && req.session.user) {
        User.findOne({ _id: req.session.user._id })
            .populate('resturants')
            .exec(function (err, userWithPopulation) {
                var model = { resturants: userWithPopulation.resturants }
                res.render('rest_admin/cat-prod', model);
            });

    } else {
        res.redirect('/login');
    }
}).post('/add-cat*', function (req, res) {
    if (req.session && req.session.user) {
        if (req.body.cat_name) {
            var rest_id = req.body.rest_id;
            console.log(rest_id);
            var cat_name = req.body.cat_name;
            var cat_type = req.body.cat_type;
            var category = {
                name: cat_name,
                type: cat_type
            };
            Resturant.findOne({ _id: rest_id, "categories.name": cat_name }, function (err, resturant) {
                //if noe exsist before insert it
                if (!resturant) {
                    Resturant.update({ '_id': rest_id },
                     { $push: { "categories": { "name": cat_name, "type": cat_type } } },
                     { upsert: true },
                function () { }
                     );
                }
                    // if he insert it before delete it then insert the new(update)
                else {
                    //delete or remove
                    Resturant.update(
                    { '_id': rest_id },
                    { $pull: { "categories": { "name": cat_name, "type": cat_type } } },
                false,
                function () {

                }
                );
                    //then insert the new category 
                    Resturant.update({ '_id': rest_id },
                     { $push: { "categories": { "name": cat_name, "type": cat_type } } },
                     { upsert: true },
                function () { }
                     );

                }
            });





        }
    }
});

//remove category
router.get('/remove-cat*', function (req, res) {
    if (req.session && req.session.user) {
        

        Resturant.update(
            { "categories._id": req.query.cat_id },
            { $pull: { "categories": { '_id': req.query.cat_id } } }, false, function () {
                res.redirect('/add-cat');
            });

      }
});

// add product
router.get('/add-prod', function (req, res) {
    var cat_id = req.query.cat_id;
    prods = GetProductsInCategory(cat_id,function(products,err){
        if(products)
        {
            res.render('rest_admin/add-product',{cat_id:cat_id,prods:products}); 
        }   
    });
    
}).post('/add-prod/:cat_id',function(req,res){
    var cat_id=req.params.cat_id;
    fs.readFile(req.files.thumbnail.path, function (err, data) {

        var dir = './public/uploads/products';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var newPath = path.resolve('./public/uploads/products/' + req.files.thumbnail.name);
        var theDbPhoto = path.join('uploads/resturants/prouducts/', req.files.thumbnail.name);

        var details = adjustSizePrice(req.body.details);
        console.log(details);
        //upload the photo
        fs.writeFile(newPath, data, function (err) {
            console.log(err);
            if (!err) {
                var theProduct = {
                    name: req.body.prodName,
                    description: req.body.description,
                    photo: theDbPhoto,
                    details: details
                };

                
                Resturant.findOne({'categories._id':cat_id},function (err,rest) {
                    if(rest){
                        Resturant.update({'categories':{$elemMatch: {_id: cat_id}} },
                        { $push: { "categories.$.products": theProduct} },
                        { upsert: true },
                        function () {  res.redirect('/add-prod?cat_id='+cat_id);}
                     );
                    }else{
                        res.redirect('/add-prod?cat_id='+cat_id);
                    }
                });
            }
        });
    });

}).get('/remove-prod/:cat_id/:prod_id', function (req, res) {
    var cat_id=req.params.cat_id;
    var prod_id=req.params.prod_id;

    if (req.session && req.session.user) {
        

        Resturant.update(
            {'categories':{$elemMatch: {_id: cat_id}}},
            { $pull: { "categories.$.products": { '_id':prod_id } } }, false, function () {
                res.redirect('/add-prod?cat_id='+cat_id);
            });

      }
});

router.post('/ratee*',function(req,res){
    var rate = req.body.rate;
    var pid = req.body.id;
    console.log(rate);
    console.log(pid);
});

//to adjust the price-size string to the be object
function adjustSizePrice(sizePriceString) {
    var sizePriceArray = sizePriceString.split(',');
    var tempArray1=[];
    sizePriceArray.forEach(function(item,index){
        tempArray1.push(item.split(':'));
    });
    targetArray=[];
    tempArray1.forEach(function(item,index){
        var sizePrice = {size:item[0], price:item[1]};
        targetArray.push(sizePrice); 
    });
    return targetArray; 
}

// get products in category
function GetProductsInCategory(cat_id,callback){
    Resturant.findOne({'categories':{$elemMatch: {_id: cat_id}}},function (err,resturant) {
        var products=null;
        if(resturant)
        {
         for (var i = 0; i < resturant.categories.length; i++) {
            if(resturant.categories[i]._id==cat_id)
            {
                products=resturant.categories[i].products;  
                //pass the products to the callback
                callback(products,null);
            }
         }
        }else{
            callback(products,"error")
        }
     });
}


module.exports = router;
