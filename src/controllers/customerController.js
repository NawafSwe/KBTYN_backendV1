/* ----------------------------- importing packages ----------------------------- */
const Customer = require('../models/customer');
const Trip = require('../models/trip');
const User = require('../models/user');

/** 'getCustomers' functions where it gets all the customers from the db
 *
 * @return {list} list of customers objects if there is no error
 * @return {Error} return an error message if there is an error
 */
const getCustomers = async () => {
	try {
		// finding all customers and populating all the info of the user
		const response = await Customer.find({}).populate('user');
		return response;
	} catch (e) {
		console.log(`error happen in the customerController at getCustomers ${e}`);
		return { message: `failed to get all customers`, status: 500 };
	}
};

/** 'postCustomer' function that posts a new customer to the database
 *
 * @param {Object} customer object where it contains the data of a customer
 * @return {Object} a customer object who was added in the db if there is no error
 * @return {Error} returns an error message if there is an error
 */
const postCustomer = async (customer) => {
	try {
		const response = await Customer.create(customer);
		return response;
	} catch (e) {
		console.log(`error happen in the customerController in postCustomer() ${e.message}`);
		return {
			message: 'error please try again',
			status: 500,
		};
	}
};

/** 'putCustomer' function that updates customer info from the db
 *
 * @param {String} id  the id of the customer
 * @param {Object} customer holds the new data to update the customer data
 * @return {Object} returns customer object with the old data if there is no error
 * @return {Error} returns an error message if there is an error
 */

const putCustomer = async (id, customer) => {
	try {
		const response = await Customer.findByIdAndUpdate(id, customer);
		return response;
	} catch (e) {
		console.log(`error happen in the customerController in putCustomer() ${e.message}`);
		return {
			message: 'error please try again',
			status: 500,
		};
	}
};

/** 'deleteCustomer' function that deletes customer from the db
 *
 * @param {String} id  the id of the customer
 * @return {Object} returns the deleted customer if there is no error
 * @return {Error} returns an error message if there is an error
 */
const deleteCustomer = async (id) => {
	try {
		const holdCustomer = await Customer.findById(id);
		await User.findByIdAndDelete(holdCustomer.user.id);
		await Customer.findByIdAndDelete(id);
		return {
			message: `customer with the id ${id} was successfully deleted`,
			status: 200,
		};
	} catch (e) {
		console.log(`error happen in the customerController in deleteCustomer() ${e.message}`);
		return {
			message: 'error please try again',
			status: 500,
		};
	}
};

/* ----------------------------- exporting functions ----------------------------- */
module.exports = { getCustomers, deleteCustomer};
