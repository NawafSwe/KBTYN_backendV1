//trip model
const mongoose = require('mongoose');
//trip schema
const tripSchema = mongoose.Schema({
	trId: { type: Number, require: true, unique: true },
	location: { type: String },
    rateDriver: { type: Number },
    rateUser: { type: Number },
    tier: { type: String },
	Time: { type: String },
    date: { type: Date },
	isComplete: { type: Boolean, default: false },
    customers: [],
    driver: { type: Number }
});
//creating model in db
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
