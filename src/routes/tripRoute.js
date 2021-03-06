/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	tripRouter = express.Router(),
	tripController = require('../controllers/tripController');
const sanitizer = require('express-sanitizer');
tripRouter.use(sanitizer());
/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */
/* '/' this route is GET ROUTE where it gets all the trips from the database */

// '/trips'
tripRouter.get('/', async (req, res) => {
	const response = await tripController.getTrips();
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

// '/trips/:id'
tripRouter.get('/:id', async (req, res) => {
	const response = await tripController.getTripById(req.params.id);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

// '/trips'
tripRouter.post('/', async (req, res) => {
	const response = await tripController.postTrip(req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

// '/trips/:id'
tripRouter.put('/:id', async (req, res) => {
	const response = await tripController.putTrip(req.params.id, req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

// '/trips/:id'
tripRouter.delete('/:id', async (req, res) => {
	const response = await tripController.deleteTrip(req.params.id);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

// '/trips/getTripByLocation'
tripRouter.post('/getTripByLocation', async (req, res) => {
	const response = await tripController.getTripByLocation(req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});
tripRouter.get('/:id/getDriverOfTrip', async (req, res) => {
	const response = await tripController.getDriverOfTrip(req.params.id);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

tripRouter.post('/:id/customers', async (req, res) => {
	const response = await tripController.addCustomerToTrip(req.params.id, req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

tripRouter.post('/:id/statusUpdates', async (req, res) => {
	//before doing the request we sanitize the body
	req.body.statusUpdates = req.sanitize(req.body.statusUpdates);
	const response = await tripController.addUpdateToTrip(req.params.id, req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

module.exports = tripRouter;
