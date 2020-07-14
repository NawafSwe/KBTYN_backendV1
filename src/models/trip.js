//trip model
const mongoose = require('mongoose');
//trip schema
const tripSchema = mongoose.Schema({
	location: { type: String },
	rateDriver: { type: Number },
	rateUser: { type: Number },
	tierSize: { type: Number },
	time: { type: String },
	date: { type: Date },
	statusUpdates: [ {type: String} ],
	isComplete: { type: Boolean, default: false },
	customer: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Customer',
		},
		username: { type: String },
	},
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
	},
});
//creating model in db
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;