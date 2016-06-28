var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;
var Rate = models.Rate;
//var Branch = models.Branch;

exports.insertRate = function (user_id, rest_id, rate) {
    //check if user rate before
    Resturant.findOne({ _id: rest_id, "rates.user_id": user_id }, function (err, resturant) {

        // if not rate insert it
            if (!resturant) {
                console.log("not");
                Resturant.update({ '_id': rest_id },
                 { $push: { "rates": { "resturantVote": rate, "user_id": user_id } } },
                 { upsert: true },
            function () {}
                 );
            }

                // if he rate before delete it then insert the new(update)
            else {
                //delete or remove
                Resturant.update(
                { '_id': rest_id },
                { $pull: { "rates": { "user_id": user_id } } },
            false,
            function () {

            }
            );
                //then insert te new rate 
                Resturant.update({ '_id': rest_id },
                 { $push: { "rates": { "resturantVote": rate, "user_id": user_id } } },
                 { upsert: true },
            function () { }
                 );

            }
        });
    
    //console.log(u);


    //    Resturant.update(
    //    { '_id': "57722ebcbb2f1b1af0000f68" },
    //    { $pull: { "rates": { "user_id": "57723096bb2f1b2e7ce995db" } } },
    //false,
    //function () {

    //}
    //);
}


exports.insertRatee = function () {
    var rate = new Rate({
        user_id: "5769763a93fbdd4447280742",
        rest_id: "576c35b2aec1b74c4f8ff0f4",
        resturantVote: 5
    });


    // we use update there to prevent duplicate rating for from the the user to the same resturant
    Rate.update({ $and: [{ user_id: rate.user_id }, { rest_id: rate.rest_id }] },
            { $set: { resturantVote: rate.resturantVote } },
            { upsert: true },
            function () { }
  );

    ////////////////////////////
    //        Resturant.find(
    //{
    //    "rates": { $elemMatch: { "rest_id": rate.rest_id, "rest_id": rate.userId } }
    //}).forEach(function (item) {
    //    console.log(item)

    //});
    //////////////////////////////


    //      Resturant.update({ _id: rate.rest_id },
    //             { "$push": { "rates": { "resturantVote": rate.resturantVote, "user_id": rate.user_id } } }
    //);

    //      console.log("done");

    //      Resturant.update(
    // { _id: "576c35b2aec1b74c4f8ff0f4" },
    // {},
    //{
    //    upsert: true
    //}
    //);
    //      //rate.save();
    //      //resturant.rates.push(rate);
    //      //resturant.save();
    //});


}



exports.GetAllResturants = function () {
    Resturant.find({}, {}, {skip: 10,limit: 2    }, function (err, resturants) {
        console.log(JSON.stringify(resturants));
    });
}


exports.GetResturantById = function (rest_id) {
    (Resturant.find({_id:rest_id},function (err, resturant){
        console.log(resturant);
    })
    );
}



exports.createResturant = function (resturant) {
    var rest = new Resturant(resturant);
    rest.save();
    console.log('succ')
}


eissadd = [];
eissadd.push({
    rest_id: "5769710e5fceffac0bd31ca9",
    rankValue: 4
}, {
    rest_id: "5769710e5fceffac0bd31ca9",
    rankValue: 2
});


exports.createUser = function () {
    var theUser = new User({
        name: {
            first: "mohammed",
            middle: "Ibrahim",
            last: "eissa"
        },
        adress: "El-gharbia/tanta",
        theEmail: "eissa3101652.me@gmail.com",
        password: "1234567",
        picture: "dfdshfdksjfhs",
        gender: "male",
        mobile: "01011212323",
        role: "admin",
        recommended_resturants: eissadd
    });

    theUser.save();
}


exports.Getall = function () {

    //Resturant.find({}, function (err, resturants) {

    //    console.log(resturants);
    //});



    Resturant.find({}, function (err, resturants) {
        console.log(JSON.stringify(resturants));
        //var returnedObject = {};

        //resturants.forEach(function (resturant) {
        //    //returnedObject[resturant._id] = resturant;
        //    console.log(resturant);

    });

    //console.log(JSON.stringify(returnedObject));
    //    });

}