/* ----------------------------- importing packages ----------------------------- */
const Trip = require('../models/trip');

const getTrips = async () => {
	try {
		const response = await Trip.find({});
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
		const response = await Trip.findById(id);
		return {
			username: response,
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
		for (let [key, value] of Object.entries(trip)) {
			if (key === 'location') {
				await Trip.findByIdAndUpdate(id, { location: value });
			} else if (key === 'rateDriver') {
				await Trip.findByIdAndUpdate(id, { rateDriver: value });
			} else if (key === 'rateUser') {
				await Trip.findByIdAndUpdate(id, { rateUser: value });
			} else if (key === 'tierOrSize') {
				await Trip.findByIdAndUpdate(id, { tierOrSize: value });
			} else if (key === 'time') {
				await Trip.findByIdAndUpdate(id, { time: value });
			} else if (key === 'date') {
				await Trip.findByIdAndUpdate(id, { date: value });
			} else if (key === 'isComplete') {
				await Trip.findByIdAndUpdate(id, { isComplete: value });
			} else if (key === 'statusUpdates') {
				await Trip.findByIdAndUpdate(id, { statusUpdates: value });
			} else if (key === 'username') {
				await Trip.findByIdAndUpdate(id, { username: value });
			} else if (key === 'pa') {
				await Trip.findByIdAndUpdate(id, { pa: value });
			}
			//customers here
			//driver here
		}
		const response = await Trip.findById(id);
		console.log(response);
		return {
			id: response.id,
			message: 'trip was updated',
			code: 200,
			codeStatus: 'OK',
		};
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
			trip: response.trip,
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
		const response = await Trip.find({ location: destination });
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
