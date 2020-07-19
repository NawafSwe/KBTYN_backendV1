/*------------------ User Model  ------------------ */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/*---------------------------- creating schema ----------------------------*/
const userSchema = mongoose.Schema({
	username: { type: String, require: true },
	phoneNumber: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	name: {type:String} , 
	totalRating: { type: Number },
	numberOfRated: { type: Number },
	isDriver: { type: Boolean, default: false },
	isAdmin: { type: Boolean, default: false },
	isCustomer: { type: Boolean, default: false },
	_customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
	},
	_driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
	},
	_admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

/*---------------------------- creating the model in the DB ----------------------------*/
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
