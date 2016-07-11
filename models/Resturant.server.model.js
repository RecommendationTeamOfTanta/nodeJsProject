var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');



//users



var userFeatures = new schema({
    //user_id: { type: schema.Types.ObjectId, ref: 'User' },
    couple: Boolean,
    young: Boolean,
    smoking: Boolean,
    rangeOfBudget: Number,
    religion: String,
    sport: String,
    dayOfWeek: String,
    placeOfBirth: Date,
    tasteOfMusic: String,
    payingMethod: String
});



var userRatings = new schema({
    rest_id: { type: schema.Types.ObjectId, ref: 'Resturant' },
    resturantVote: Number,
    _id: false


});

// create the usersSchema
var usersSchema = new schema({
    name: {
        first: String,
        last: String
    },
    adress: String,
    theEmail: String,
    password: { type: String, bcrypt: true },
    picture: String,
    birthDate: { type: Date },
    gender: String,
    mobile: String,
    role: String,
    favourites: [{ type: schema.Types.ObjectId, ref: 'Resturant' }],
    wishlist: [{ type: schema.Types.ObjectId, ref: 'Resturant' }],
    userRatings: [userRatings],
    features: userFeatures,
    resturants: [{ type: schema.Types.ObjectId, ref: 'Resturant' }],
    //the recommendation for the user(user-based)
    recommended_resturants: [{
        rest_id: { type: schema.Types.ObjectId, ref: 'Resturant' },
        rankValue: Number
    }]
}, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

// make a virtual property to get and set the user full name
usersSchema.virtual('name.full')
    .get(function () {
        return this.name.first + ' ' + this.name.last;
    }).set(function (setFullNameTo) {
        var split = setFullNameTo.split(' ')
            , firstName = split[0]
            , lastName = split[1];

        this.set('name.first', firstName);
        this.set('name.last', lastName);
    });

//create the user model from usersSchema
var User = mongoose.model('User', usersSchema);


//resturants 
var productRateSchema = new schema({
    user_id: { type: schema.Types.ObjectId, ref: 'User' },
    productVote: Number
});
var productSchema = new schema({
    name: String,
    description: String,
    photo: String,
    details: [{
        size: String,
        price: Number
    }],
    rates: [productRateSchema]
});

var CategorySchema = new schema({
    name: String,
    type: String,
    products: [productSchema]
});

var resturantRateSchema = new schema({
    user_id: { type: schema.Types.ObjectId, ref: 'User' },
    //user_id: { type: String, ref: 'User' },
    resturantVote: Number,
    _id: false
});

var resturantReviewSchema = new schema({
    user_id: { type: schema.Types.ObjectId, ref: 'User' },
    //rest_id: { type: schema.Types.ObjectId, ref: 'Resturant' },
    ReviewTxt: String,
    review_date: { type: Date, default: Date.now },
    vote: Number
});

//var brancheSchema = new schema({
//    name: String,
//    city: String,
//    latitude: Number,
//    longitude: Number,
//    //rest_id: { type: schema.Types.ObjectId, ref: 'Resturant' }
//});
var resturantFeatures = new schema({
    famous: Boolean,
    smokingArea: Boolean,
    placeForChildren: Boolean,
    hasGoodView: Boolean,
    minimumCharge: Boolean,
    delivery: Boolean,
    wifi: Boolean,
    makeSmallParties: Boolean,
    noiseLevel: String,
    stuffBehavior: String,
    acceptCreditCard: Boolean,
    outDoorSetting: Boolean,
    hasTv: Boolean,
    carBarking: Boolean,
    reservation: Boolean,
    petsAllowed: Boolean,
    _24by7: Boolean,
    priceRate: String,
    cleanliness: String,
    foodQuality: String,
    serviceQuality: String,
    formalClothes: Boolean,
    liveMusic: Boolean,
    bookToRead: Boolean,
    openPuffet: Boolean,
    alchols: Boolean,
    lightiningRomantic: Boolean,
    publicToilets: Boolean,
    _id: false
});


// create the resturantschema
var resturantSchema = new schema({
    addedBy: { type: schema.Types.ObjectId, ref: 'User' },
    approved: { type: Boolean, default: false },
    name: String,
    description: String,
    photo: String,
    location: String,
    mobile: String,
    workingHours: {
        startAt: String,
        endAt: String
    },
    branches: [String],
    features: resturantFeatures,
    categories: [CategorySchema],
    rates: [resturantRateSchema],
    reviews: [resturantReviewSchema],

    //the recommendation for resturants(item-based)
    similarResturants: [{
        rest_id: { type: schema.Types.ObjectId, ref: 'Resturant' },
        rankValue: Number
    }]
});

// create unique index while rating
resturantRateSchema.index({ user_id: 1, rest_id: 1 }, { unique: true });
//resturantSchema.index({ rates: 1 }, { unique: true });


// build the Resturant model from the resturantSchema
var Resturant = mongoose.model('Resturant', resturantSchema);

var Rate = mongoose.model('Rate', resturantRateSchema);

//var Branch = mongoose.model('Branch', brancheSchema);
//exporting the models
module.exports = {
    User: User,
    Resturant: Resturant,
    Rate: Rate,
    createUser: function (newUser, callback) {
        bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (!err) {
                newUser.password = hash;
                newUser.save(callback);

            }
        });
    },
    comparePassword: function (password, hash, callback) {
        bcrypt.compare(password, hash, function (err, isPasswordMatch) {
            if (err)
                return callback(err);
            return callback(null, isPasswordMatch);
        });
    },
    createResturant: function (newResturant, callback) {
        newResturant.save(callback);
    }
}

