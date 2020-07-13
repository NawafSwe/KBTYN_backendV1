/* ----------------------------- importing packages ----------------------------- */
const Customer = require('../models/customer');
const Trip = require('../models/trip');
const User = require('../models/user');

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

module.exports = { getCustomers, deleteCustomer };
