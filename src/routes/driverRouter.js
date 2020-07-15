/* ----------------------------- importing packages ----------------------------- */
const express = require('express');
const driverRouter = express.Router();
const driverController = require('../controllers/driverController');

/* '/' get route where it gets all the drivers from the data base */
driverRouter.get('/', async (req, res) => {
	const response = await driverController.getDrivers();
	if (response.status === 500) res.json(response).status(500);
	else {
		res.json(response).status(200);
	}
});

/* '/:id' get route where it gets  a specific driver from the database by id */
driverRouter.get('/:id', async (req, res) => {
	const id = req.params.id;
	const response = await driverController.getDriverById(id);
	if (response.status === 500) {
		res.json(response).status(500);
	} else {
		res.json(response).status(200);
	}
});

/* '/acceptCustomer/:id' post route where it allows the driver to accept a customer request*/
driverRouter.post('/acceptCustomer/:id', async (req, res) => {
	const response = await driverController.acceptCustomer(req.params.id, req.body);
	if (response.status === 500) {
		res.json(response).status(500);
	} else {
		res.json(response).status(200);
	}
});

module.exports = driverRouter;
