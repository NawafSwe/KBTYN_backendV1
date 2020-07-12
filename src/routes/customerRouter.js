/* ----------------- importing packages and files ---------------- */
const express = require('express');
const customerRouter = express.Router();
const customerController = require('../controllers/customerController');

/* this route '/' to get all the customers in the db  */
customerRouter.get('/', async (req, res) => {
	const response = await customerController.getCustomers();
	if (response.status === 500) res.json(response).status(500);
	else {
		res.json(response).status(200);
	}
});

module.exports = customerRouter;
