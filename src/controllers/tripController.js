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

const putTrip = async (id, user) => {
	try {
		/* 
		using mongoose to re set a password we use a special method 'setPassword' 
		so we need to check carefully the keys to capture if there is password change in the body  */

		for (let [key, value] of Object.entries(trip)) {
			if (key === 'trId') {
				await User.findByIdAndUpdate(id, { trId: value });
			} else if (key === 'location') {
				await User.findByIdAndUpdate(id, { location: value });
			} else if (key === 'rateDriver') {
				await User.findByIdAndUpdate(id, { rateDriver: value });
			} else if (key === 'rateUser') {
				await User.findByIdAndUpdate(id, { rateUser: value });
			} else if (key === 'tierSize') {
				await User.findByIdAndUpdate(id, { tierSize: value });
			} else if (key === 'time') {
				await User.findByIdAndUpdate(id, { time: value });
			} else if (key === 'date') {
				await User.findByIdAndUpdate(id, { time: value });
			} else if (key === 'time') {
				await User.findByIdAndUpdate(id, { date: value });
			} else if (key === 'isComplete') {
				await User.findByIdAndUpdate(id, { time: value });
			}
			//customers here
			//driver here
		}
		const response = await Trip.findById(id);
		console.log(response);
		return {
			trId: response.trId,
			message: 'trip was updated',
			code: 200,
			codeStatus: 'OK',
		};
	} catch (e) {
		console.log('error ocurred in tripController at putUser() ', e.message);
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

module.exports = { getTrips, postTrip, putTrip, deleteTrip, getTripById };