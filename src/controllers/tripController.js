const User = require('../models/trip');
const Trip = require('../models/trip');

const updateTrip = async (id, user) => {
	try {
		/* 
		using mongoose to re set a password we use a special method 'setPassword' 
		so we need to check carefully the keys to capture if there is password change in the body  */

		for (let [key, value] of Object.entries(user)) {
			if (key === 'password') {
				const fetchUser = await Trip.findById(id);
            } else if (key === 'trId') {
				await User.findByIdAndUpdate(id, { trId: value });
			} else if (key === 'driverRating') {
				await User.findByIdAndUpdate(id, { driverRating: value });
			} else if (key === 'customerRating') {
				await User.findByIdAndUpdate(id, { customerRating: value });
			} else if (key === 'isComplete') {
				await User.findByIdAndUpdate(id, { isComplete: value });
			} else if (key === 'tierSize') {
				await User.findByIdAndUpdate(id, { tierSize: value });
			} else if (key === 'date') {
				await User.findByIdAndUpdate(id, { date: value });
			}
            //customers here
            //driver here
		}
		const response = await Trip.findById(id);
		console.log(response);
		return {
			trip: response.trip,
			message: 'trip was updated',
			code: 200,
			codeStatus: 'OK',
		};
	} catch (e) {
		console.log('error ocurred in userController at putUser() ', e.message);
		return {
			message: ` something went wrong cannot update the user with the id ${id}`,
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
			message: 'user was deleted',
			status: 200,
			codeStatus: 'OK',
		};
	} catch (e) {
		console.log('error ocurred in userController at deleteUser() ', e.message);
		console.log(e);
		return {
			message: ` something went wrong cannot delete the user with the id ${id}`,
			code: 404,
			codeStatus: 'Not Found',
		};
	}
};

module.exports = { getUsers, postUser, putUser, updateTrip, deleteTrip, getUserById };