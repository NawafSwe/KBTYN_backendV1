/*------------------ User Model  ------------------ */
const mongoose = require('mongoose');

/*---------------------------- creating schema ----------------------------*/
const DriverSchema = mongoose.Schema({
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
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

/*---------------------------- creating the model in the DB ----------------------------*/

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;
