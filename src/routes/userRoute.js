/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	userRouter = express.Router(),
	userController = require('../controllers/userController');
const validate = require('../utils/userValidators');
const { validationResult } = require('express-validator');

/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */
/* '/' this route is GET ROUTE where it gets all the users from the database */
userRouter.get('/', validate('getUsers'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const response = await userController.getUsers();
		// checking the code status if its 200
		if (response.code === 200) res.json(response).status(200);
		//else just return the whole
		else {
			res.json(response).status(response.status);
		}
	}
});

/* '/' this route is GET ROUTE where it gets a user from the database by the id */
userRouter.get('/:id', validate('getUserById'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const response = await userController.getUserById(req.params.id);
		// checking the code status if its 200
		if (response.code === 200) res.json(response).status(200);
		//else just return the whole
		else {
			res.json(response).status(response.status);
		}
	}
});

/* '/' this route is post ROUTE where it posts a user to the database*/

userRouter.post('/', validate('postUser'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const response = await userController.postUser(req.body);
		// checking the code status if its 200
		if (response.code === 200) res.json(response).status(200);
		//else just return the whole
		else {
			res.json(response).status(response.status);
		}
	}
});

/*'/:id' this route is PUT ROUTE where it updates a user in the database */
userRouter.put('/:id', validate('putUser'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const response = await userController.putUser(req.params.id, req.body);
		// checking the code status if its 200
		if (response.code === 200) res.json(response).status(200);
		//else just return the whole
		else {
			res.json(response).status(response.status);
		}
	}
});

/*'/:id' this route is DELETE ROUTE where it deletes a user from the database */
userRouter.delete('/:id', validate('deleteUser'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const response = await userController.deleteUser(req.params.id);
		// checking the code status if its 200
		if (response.code === 200) res.json(response).status(200);
		//else just return the whole
		else {
			res.json(response).status(response.status);
		}
	}
});

/*'/userByPhone' this route is post ROUTE where it post a userPhone number to check if user exist on the db or not */
userRouter.post('/getUserByPhone', validate('getUserByPhone'), async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) {
		res.send(err.mapped()).status(400);
	} else {
		const response = await userController.getUserByPhone(req.body);
		// checking the code status if its 200
		if (response.code === 200) res.json(response).status(200);
		//else just return the whole
		else {
			res.json(response).status(response.status);
		}
	}
});

module.exports = userRouter;
