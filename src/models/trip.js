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
	passengerAmount: { type: Number },
	isComplete: { type: Boolean, default: false },
	customer: [{type: mongoose.Schema.Types.ObjectId,ref: 'Customer',},],
	driver: {type: mongoose.Schema.Types.ObjectId,ref: 'Driver',},
});
/*---------------------------- creating the model in the DB ----------------------------*/
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
