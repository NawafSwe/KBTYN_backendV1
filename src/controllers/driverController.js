const driver = require('../models/driver');
const Trip = require('../models/trip');
const User = require('../models/user');

const getDrivers = async () => {
	try {
		// finding all drivers and populating all the info of the user
		const response = await Driver.find({}).populate('user').populate('listOfCustomers');
		return response;
	} catch (e) {
		console.log(`error happened at the driverController at getDrivers ${e}`);
		return { message: `failed to get all drivers`, status: 500 };
	}
};

const postDriver = async (driver) => {
	try {
		const response = await Driver.create(driver);
		return response;
	} catch (e) {
		console.log(`error happened at the driverController in postDriver() ${e.message}`);
		return {
			message: 'error please try again',
			status: 500,
		};
	}
};

const putDriver = async (id, driver) => {
	try {
		const response = await Driver.findByIdAndUpdate(id, driver);
		return response;
	} catch (e) {
		console.log(`error happened at the driverController in putDriver() ${e.message}`);
		return {
			message: 'error please try again',
			status: 500,
		};
	}
};

const deleteDriver = async (id) => {
	try {
		const holdDriver = await Driver.findById(id);
		await User.findByIdAndDelete(holdDriver.user.id);
		await Driver.findByIdAndDelete(id);
		return {
			message: `driver with the id ${id} was successfully deleted`,
			status: 200,
		};
	} catch (e) {
		console.log(`error happened at the driverController in deleteDriver() ${e.message}`);
		return {
			message: 'error please try again',
			status: 500,
		};
	}
};

module.exports = { getDrivers, deleteDriver };

//using trip op and user controller 