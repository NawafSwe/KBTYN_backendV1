/* ----------------- importing packages and files ---------------- */
const express = require('express');
const authenticationRouter = express.Router();
const passport = require('passport');

/* ---------------------------- User Authentication routes  ---------------------------- */

/*'/login' to login user to the application*/
authenticationRouter.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			const message = { message: 'password or username is incorrect' };
			return res.json(message).status(400);
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			const response = {
				message: `successfully logged in as ${user.username}`,
				status: 200,
				statusMessage: 'OK',
				id: user.id,
				user: {
					id: user.id,
					username: user.username,
					phoneNumber: user.phoneNumber,
					name: user.name,
					isDriver: user.isDriver,
					isAdmin: user.isAdmin,
					isCustomer: user.isCustomer,
					totalRating: user.totalRating,
					numberOfRated: user.numberOfRated,
					_customer: user._customer,
					_driver: user._driver,
					_admin: user._admin,
				},
			};
			return res.json(response).status(200);
		});
	})(req, res, next);
});

/* '/logout'  to log out user from the application */
authenticationRouter.get('/logout', async (req, res) => {
	req.logOut();
	const response = { message: `logged out successfully` };
	res.json(response).status(200);
});

module.exports = authenticationRouter;
