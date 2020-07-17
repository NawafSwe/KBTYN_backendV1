/*------------------ driver Model  ------------------ */
const mongoose = require('mongoose');

/*---------------------------- creating schema ----------------------------*/
const DriverSchema = mongoose.Schema({
	trips: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trip',
		},
	],
	listOfCustomers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	carName: { type: String },
});

/*---------------------------- creating the model in the DB ----------------------------*/

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;
