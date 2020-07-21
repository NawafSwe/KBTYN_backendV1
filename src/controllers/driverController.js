/* ----------------------------- importing packages ----------------------------- */
const Driver = require('../models/driver');
const Trip = require('../models/trip');
const User = require('../models/user');
const Customer = require('../models/customer');
const { response } = require('express');

/** 'getDrivers' functions where it gets all the drivers from the db
 *
 * @return {list} list of drivers objects if there is no error
 * @return {Error} return an error message if there is an error
 */
const getDrivers = async () => {
	try {
		// finding all drivers and populating all the info of the user
		const response = await Driver.find({}).populate('user');
		return response;
	} catch (e) {
		console.log(`error happened at the driverController at getDrivers ${e}`);
		return { message: `failed to get all drivers`, status: 500 };
	}
};

/** 'getDriverById' function that gets a driver from the db by id
 *
 * @param {String} id of the wanted driver
 * @return {Object} driver object that has the data of the requested driver if there is no error
 * @return {Error} returns an error message if there is no error
 */
const getDriverById = async (id) => {
	try {
		const response =  await Driver.findById(id).populate('user');
		return response;
	} catch (e) {
		console.log(`error happen in driverController in getDriverById() ${e}`);
		return { message: `error occurred please try again later ${e.message}`, status: 500 };
	}
};

/** 'postDriver' function that posts new driver to the db
 *
 * @param {Object} driver object that has the driver info
 * @return {Object} returns object of driver that contains the data
 * @return {Error} returns an error message if there is any error message
 */
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

/** 'putDriver' function that updates  driver info from the db
 *
 * @param {id} id the id of the driver to update
 * @param {Object} driver object that has the new driver info
 * @return {Object} returns object of driver that contains the data
 * @return {Error} returns an error message if there is any error message
 */

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

/** 'deleteDriver' function that deletes driver from the db
 *
 * @param {String} id  the id of the driver
 * @return {Object} returns the deleted driver if there is no error
 * @return {Error} returns an error message if there is an error
 */
const deleteDriver = async (id) => {
	try {
		const holdDriver = await Driver.findById(id);
		await User.findByIdAndDelete(holdDriver.user.id);
		await Driver.findByIdAndDelete(id);
		return {
			message: `driver with the id ${id} was successfully deleted`,
			id: response.id,
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

/** 'acceptCustomer' function that allows the driver to accept a request of driver to take a trip with him by updating the customerList in the driver
 *
 * @param {String} id the id of the driver
 * @param {Object} customer object of customer that contains the id of the customer
 * @return {Object} returns the info about the driver if there is no error
 * @return {Error} returns an error message if there is any
 */
const acceptCustomer = async (id, customer) => {
	try {
		const fetchDriver = await Driver.findById(id);
		const fetchCustomer = await Customer.findById(customer.id);
		fetchDriver.listOfCustomers.push(fetchCustomer.id);
		await fetchDriver.save();

		return await getDriverById(id);
	} catch (e) {
		console.log(`error happened at the driverController in acceptCustomer() ${e.message}`);
		return {
			message: 'error please try again',
			status: 500,
		};
	}
};

/* ----------------------------- exporting functions ----------------------------- */
module.exports = { getDrivers, deleteDriver, getDriverById, putDriver, postDriver};
