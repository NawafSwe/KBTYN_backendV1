/*------------------ User Model  ------------------ */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/*---------------------------- creating schema ----------------------------*/
const userSchema = mongoose.Schema({
	trips: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trip',
		},
	],
	destination: String,
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
