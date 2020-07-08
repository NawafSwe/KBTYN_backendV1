/*------------------ User Model  ------------------ */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Double } = require('mongodb');

/*---------------------------- creating schema ----------------------------*/
const userSchema = mongoose.Schema({
	username: { type: String, require: true, unique: true },
	phoneNumber: { type: String, require: true, unique: true },
	totalRating: { type: Number },
	numberOfRated: { type: Number },
	password: { type: String, require: true },
	isDriver: { type: Boolean, default: false },
	isAdmin: { type: Boolean, default: false },
	trips: [],
});

//driver has list_of_customers []
/*---------------------------- creating the model in the DB ----------------------------*/
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
