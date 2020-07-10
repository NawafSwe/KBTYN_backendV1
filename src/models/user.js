/*------------------ User Model  ------------------ */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/*---------------------------- creating schema ----------------------------*/
const userSchema = mongoose.Schema({
	username: { type: String, require: true, unique: true },
	phoneNumber: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	totalRating: { type: Number },
	numberOfRated: { type: Number },
	isDriver: { type: Boolean, default: false },
	isAdmin: { type: Boolean, default: false },
	trips: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trip',
		},
	],
	listOfCustomers: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			username: { type: String },
		},
	],
});


/*---------------------------- creating the model in the DB ----------------------------*/
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
