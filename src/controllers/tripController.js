/* ----------------------------- importing packages ----------------------------- */
const Trip = require('../models/trip');

const getTrips = async () => {
	try {
		const response = await Trip.find({}).populate('customer').populate('driver');
		return response;
	} catch (e) {
		console.log(`error happened in the trip controller at getTrips() error message : ${e.message}`);
		return {
			message: ` something went wrong cannot get trips, error: ${e.message}`,
			code: 400,
			codeStatus: 'Bad Request',
		};
	}
};

const postTrip = async (trip) => {
	try {
		const response = await Trip.create(trip);

		return {
			message: 'Trip was Scheduled',
			id: response.id,
			status: 200,
			codeStatus: 'OK',
		};
	} catch (e) {
		console.log(e + 'we could not Schedule your trip');

		return {
			status: 400,
			codeStatus: 'Bad',
			message: 'Something wen wrong, we could not Schedule your Trip',
		};
	}
};

const getTripById = async (id) => {
	try {
		const response = await Trip.findById(id).populate('customer').populate('driver');
		return {
			trip: response,
			status: 200,
			codeStatus: 'OK',
		};
	} catch (e) {
		console.log('Error in getTripById' + id);

		return {
			message: ` something went wrong cannot get the user with the id ${id}`,
			code: 400,
			codeStatus: 'Bad',
		};
	}
};

const putTrip = async (id, trip) => {
	try {
		const response = await Trip.findByIdAndUpdate(id, trip);
		return response;
	} catch (e) {
		console.log('error ocurred in tripController at putTrip() ', e.message);
		return {
			message: ` something went wrong cannot update the trip with the id ${id}`,
			code: 400,
			codeStatus: 'Bad Request',
		};
	}
};

const deleteTrip = async (id) => {
	try {
		const response = await Trip.findByIdAndDelete(id);
		return {
			trip: response.id,
			message: 'trip was deleted',
			status: 200,
			codeStatus: 'OK',
		};
	} catch (e) {
		console.log('error ocurred in tripController at deleteTrip() ', e.message);
		console.log(e);
		return {
			message: ` something went wrong cannot delete the trip with the id ${id}`,
			code: 404,
			codeStatus: 'Not Found',
		};
	}
};
const getTripByLocation = async (destination) => {
	try {
		const response = await Trip.find({ location: destination.location })
			.populate('customer')
			.populate('driver');
		return response;
	} catch (err) {
		console.log(
			`error happened in the trip controller at getTripByLocation() error message : ${err.message}`
		);
		return {
			message: ` something went wrong cannot get trips by destination, error: ${err.message}`,
			code: 400,
			codeStatus: 'Bad Request',
		};
	}
};

/* ----------------------------- exporting functions ----------------------------- */
module.exports = { getTrips, putTrip, deleteTrip, getTripById, getTripByLocation, postTrip };
