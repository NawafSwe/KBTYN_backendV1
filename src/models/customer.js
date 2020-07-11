/*------------------ User Model  ------------------ */
const mongoose = require('mongoose');

/*---------------------------- creating schema ----------------------------*/
const CustomerSchema = mongoose.Schema({
	trips: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trip',
		},
	],
});

/*---------------------------- creating the model in the DB ----------------------------*/
const Customer = mongoose.model('User', CustomerSchema);
module.exports = Customer;
