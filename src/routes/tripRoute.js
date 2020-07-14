/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	tripRouter = express.Router(),
    tripController = require('../controllers/tripController');
    /* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */
/* '/' this route is GET ROUTE where it gets all the trips from the database */
tripRouter.get('/', async (req, res) => {
	const response = await tripController.getTrips();
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

tripRouter.get('/:id', async (req, res) => {
	const response = await tripController.getTripById(req.params.id);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

tripRouter.post('/', async (req, res) => {
	const response = await tripController.postTrip(req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

tripRouter.put('/:id', async (req, res) => {
	const response = await tripController.putTrip(req.params.id, req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

tripRouter.delete('/:id', async (req, res) => {
	const response = await tripController.deleteTrip(req.params.id);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

tripRouter.post('/', async (req, res) => {
	const response = await tripController.getTripByLocation(req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});



module.exports = tripRouter;