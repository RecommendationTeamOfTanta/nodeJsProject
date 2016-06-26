var models = require('../models/Resturant.server.model.js');
var User = models.User;
var Resturant = models.Resturant;
var Rate = models.Rate;
//var Branch = models.Branch;



exports.inserRate = function () {
    var rate = new Rate({
        userId: "5769763a93fbdd4447280742",
        rest_id: "576c35b2aec1b74c4f8ff0f4",
        resturantVote: 2
    });


    var query = Resturant.findOne({ _id: "576c35b2aec1b74c4f8ff0f4" });


    // execute the query at a later time
    query.exec(function (err, resturant) {
        console.log(resturant._id);

        // we use update there to prevent duplicate rating for from the the user to the same resturant
        Rate.update({ $and: [{ userId: rate.userId }, { rest_id: rate.rest_id }] },
            { $set: { resturantVote: rate.resturantVote } },
            { upsert: true },
            function () { }
  );
        //resturant.rates.push(rate);

        ////////////////////////////
        Resturant.find(
{
    "rates": { $elemMatch: { "rest_id": rate.rest_id, "rest_id": rate.userId } }
}).forEach(function (item) {
    console.log(item)
    //var us = item.US;

    //for (var i = 0; i < item.US.length; i++) {
    //    var tasks = item.US[i].tasks;
    //    for (var i2 = 0; i2 < tasks.length; i2++) {
    //        var task = tasks[i2];
    //        var id = task._id;

    //        if (id == "544029257266e4841735cde8") {
    //            // add new filed
    //            task.pointse = {};
    //            break;
    //        }
    //    }
    //}

    //db.projects.save(item);
});
        //////////////////////////////


        Resturant.update({ _id: rate.rest_id },
               //{ $addToSet: { rates: rate } },
               //{ $addToSet: { "rates": { "userId": rate.userId, "rest_id": rate.rest_id } } },
            { upsert: true },
            function () { }
  );

        console.log("done");

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
    });


}

//exports.insertBranch = function () {
//    var branch = new Branch({
//        name: "medan-el-sa3a",
//        city: "Tanta",
//        latitude: 76.720845,
//        longitude: 30.712097,
//        restId:"5769710e5fceffac0bd31ca9"
//    });

//    var query = Resturant.findOne({ _id: "5769710e5fceffac0bd31ca9" });


//    // execute the query at a later time
//    query.exec(function (err, resturant) {
//        console.log(rest._id);
//        branch.save();
//        rest.branches.push(branch);
//        resturant.save();
//    });

//}

exports.updateUser = function () {
    // find each person with a last name matching 'Ghost'
    var query = User.findOne({ _id: "576974ec603228d819b34a40" });

    // selecting the `name` and `occupation` fields
    query.select('adress');

    // execute the query at a later time
    query.exec(function (err, person) {
        console.log(person.adress); // Space Ghost is a talk show host.
    });
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