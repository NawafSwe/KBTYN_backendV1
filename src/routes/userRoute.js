/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	userRouter = express.Router(),
	userController = require('../controllers/userController');
/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */
/* '/' this route is GET ROUTE where it gets all the users from the database */
userRouter.get('/', async (req, res) => {
	const response = await userController.getUsers();
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

/* '/' this route is GET ROUTE where it gets a user from the database by the id */
userRouter.get('/:id', async (req, res) => {
	const response = await userController.getUserById(req.params.id);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

/* '/' this route is post ROUTE where it posts a user to the database*/

userRouter.post('/', async (req, res) => {
	const response = await userController.postUser(req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

/*'/:id' this route is PUT ROUTE where it updates a user in the database */
userRouter.put('/:id', async (req, res) => {
	const response = await userController.putUser(req.params.id, req.body);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

/*'/:id' this route is DELETE ROUTE where it deletes a user from the database */
userRouter.delete('/:id', async (req, res) => {
	const response = await userController.deleteUser(req.params.id);
	// checking the code status if its 200
	if (response.code === 200) res.json(response).status(200);
	//else just return the whole
	else res.json(response).status(400);
});

module.exports = userRouter;
