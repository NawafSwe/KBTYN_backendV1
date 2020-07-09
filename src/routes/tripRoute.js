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