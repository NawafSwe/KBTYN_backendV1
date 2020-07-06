/* ----------------------------- importing packages ----------------------------- */
const User = require('../models/user');
/**
 * this function 'getUsers' is gets all the users from the database, it has no params.
 * @return {list} it returns list of Users objects from the database if there is no error.
 * @return {Error} it returns an error message if there is an error.
 *
 */
const getUsers = async () => {
	try {
		const response = await User.find({});
		return response;
	} catch (e) {
        console.log(`error happen in user controller at getUsers() error message : ${e.message}`);
        return { message: ` something went wrong cannot get users error is ${e.message}` };
	}
};


/**
 * this function 'postUser' is to add a user to the database.
 * @param {Object}   user it is an Object of type user.
 * @return {Object} it returns the user that was added if there is no error.
 * @return {Error} it returns an error if there is an error.
 *
 */

const postUser = async (user) => {
	try {
		/*the process is to register the user using passport by passing user email and user name to be unique 
		passport will do the check for the database if the username or the email is taken or not.
		*/
		const registerUser = new User({ email: user.email, username: user.username });
		const response = await User.register(registerUser, user.password);
		return { username: response.username, message: 'user was added' };
	} catch (e) {
		console.log('error ocurred in userController at postUser() ', e.message);
		return {
			message: `cannot post ${user.username} or ${user.email} it is already exists please pick another`,
		};
	}
};


/**
 * this function 'putUser' is to update a user information from the database.
 * @param {String} id it is the id of the user to be updated
 * @param {Object} user the object is of type User to take the information.
 * @return {Object} it returns the user that was updated if there is no error.
 * @return {Error} it returns an error if there is an error.
 *
 */

const putUser = async (id, user) => {
	try {
		/* 
		using mongoose to re set a password we use a special method 'setPassword' 
		so we need to check carefully the keys to capture if there is password change in the body  */

		for (let [key, value] of Object.entries(user)) {
			if (key === 'password') {
				const fetchUser = await User.findById(id);
				await fetchUser.setPassword(value);
				await fetchUser.save();
			} else if (key === 'username') {
				await User.findByIdAndUpdate(id, { username: value });
			} else if (key === 'email') {
				await User.findByIdAndUpdate(id, { email: value });
			} else if (key === 'age') {
				await User.findByIdAndUpdate(id, { age: value });
			} else if (key === 'gender') {
				await User.findByIdAndUpdate(id, { gender: value });
			}
		}
		const response = await User.findById(id);
		console.log(response);
		return { username: response.username, message: 'user was updated' };
	} catch (e) {
		console.log('error ocurred in userController at putUser() ', e.message);
		return { message: ` something went wrong cannot update the user with the id ${id}` };
	}
};

/**
 * this function 'getUserById' is to get a user information from the database.
 * @param {String} id it is the id of the user to be updated
 * @return {Object} it returns the user that was updated if there is no error.
 * @return {Error} it returns an error if there is an error.
 *
 */

const getUserById = async (id) => {
	try {
		const response = await User.findById(id);
		return { username: response.username };
	} catch (e) {
		console.log('error ocurred in userController at getUserById() ', e.message);
		return { message: ` something went wrong cannot get the user with the id ${id}` };
	}
};

/**
 * this function 'deleteUser' is to delete a user information from the database.
 * @param {String} id it is the id of the user to be deleted
 * @return {Object} it returns the user that was deleted if there is no error.
 * @return {Error} it returns an error if there is an error.
 *
 */

const deleteUser = async (id) => {
	try {
		const response = await User.findByIdAndDelete(id);
		return { username: response.username, message: 'user was deleted' };
	} catch (e) {
		console.log('error ocurred in userController at deleteUser() ', e.message);
		return { message: ` something went wrong cannot delete the user with the id ${id}` };
	}
};

module.exports = { getUsers, postUser, putUser, deleteUser, getUserById };
