var mongoose = require('mongoose');
var schema = mongoose.schema;



//users

var userFeatures = new schema({
	couple: Boolean,
	young: Boolean,
	smoking: Boolean,
	rangeOfBudget: Number,
	religion: String,
	sport: String,
	dayOfWeek: String,
	placeOfBirth: date,
	tasteOfMusic: String,
	payingMethod: string
});

// create the usersSchema
var usersSchema = new schema({
	name: {
		first: String,
		middle: String,
		last: String
	},
	adress: String,
	theEmail: string,
	password: String,
	picture: string,
	birthDate: { type: date },
	gender: String,
	mobile: string,
	role: String,
	favourites: [{ type: ObjectId, ref: 'Resturant' }]
});

//create the user model from usersSchema
var User = mongoose.model('User', usersSchema);


//resturants 
var productRateSchema = new schema({
	userId: { type: ObjectId, ref: 'User' },
	productVote: number
});
var productSchema = new schema({
	name: String,
	description: String,
	photo: String,
	details: {
		price: Number,
		size: String
	},
	rates: [productRateSchema]
});

var CategorySchema = new schema({
	name: String,
	type: String,
	photo: String,
	products: [productSchema]
});

var resturantRateSchema = new schema({
	userId: { type: ObjectId, ref: 'User' },
	rest_id: { type: ObjectId, ref: 'Resturant' },
	resturantVote: number
});

var resturantReviewSchema = new schema({
	userId: { type: ObjectId, ref: 'User' },
	restId: { type: ObjectId, ref: 'Resturant' },
	ReviewTxt: String,
	review_date: { type: Date, default: Date.now }
});


var resturantFeatures = new schema({
	famous: Boolean,
	smokingArea: Boolean,
	placeForChildren: Boolean,
	hasGoodView: Boolean,
	minimumCharge: Boolean,
	delivery: Boolean,
	wifi: Boolean,
	makeSmallParties: Boolean,
	noiseLevel: string,
	stuffBehavior: String,
	acceptCreditCard: Boolean,
	outDoorSetting: String,
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
	publicToilets: Boolean



});


// create the resturantSchema
var resturantSchema = new schema({
	name: string,
	description: string,
	photo: string,
	location: String,
	mobile: String,
	workingHours: {
		startAt: String,
		endAt: String
	},
	branches: [{
		name: String,
		city: String,
		latitude: Number,
		longitude: Number
	}],
	features: resturantFeatures,
	categories:[CategorySchema],
	rates:[resturantRateSchema],
	reviews:[resturantReviewSchema]
});

// build the Resturant model from the resturantSchema
var Resturant = mongoose.model('Resturant', resturantSchema);


//exporting the models
module.exports = {
	User: User,
	Resturant: Resturant
};