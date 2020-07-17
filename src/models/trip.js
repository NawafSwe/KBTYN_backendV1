/*------------------ driver Model  ------------------ */
const mongoose = require('mongoose');
/*---------------------------- creating schema ----------------------------*/
const tripSchema = mongoose.Schema({
	location: { type: String },
	rateDriver: { type: Number },
	rateUser: { type: Number },
	tierOrSize: { type: String },
	time: { type: String },
	date: { type: Date },
	statusUpdates: [{ type: String }],
	isComplete: { type: Boolean, default: false },
	customer: [{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Customer',
		},
		username: { type: String },
	}],
	driver: { 
		id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
	},
	username: { type: String },
}
});
/*---------------------------- creating the model in the DB ----------------------------*/
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
