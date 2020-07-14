// importing packages and files
const express = require('express');
const driverRouter = express.Router();
const driverController = require('../controllers/driverController');

//getting all the drivers from the db
driverRouter.get('/', async (req, res) => {
	const response = await driverController.getDrivers();
	if (response.status === 500) res.json(response).status(500);
	else {
		res.json(response).status(200);
	}
});

module.exports = driverRouter;