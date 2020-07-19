/*          ------------------- EXPLANATION -------------------
 since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 will goes into the switch case as a case.
*/
const { body, param } = require('express-validator');
const validateSchema = require('./checkSchema');
const validate = (method) => {
	switch (method) {
		case 'getUsers': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */
			];
		}
		case 'getUserById': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- END OF SCHEMA VALIDATION ----------- */
				param('id', 'id must exists in the query and be string').exists().isString(),
			];
		}
		case 'postUser': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [
						'phoneNumber',
						'password',
						'totalRating',
						'numberOfRated',
						'isDriver',
						'isAdmin',
						'isCustomer',
						'_customer',
						'_driver',
						'name',
					];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				// /*  ----------- name VALIDATION ----------- */
				body('name', 'name is required').exists(),
				body('name.length', 'name cannot be empty string').exists().not().equals('0'),
				body('name')
					.exists()
					.custom((value, { req }) => {
						if (value.length == 1 || value.length < 4)
							throw new Error('name must be of length 4 chars or more');
						else if (value === '' || value === ' ') throw new Error('name cannot be empty String');
						else return true;
					}),

				/*  ----------- PhoneNumber VALIDATION ----------- */
				body('phoneNumber', 'phone number is required to complete register').exists(),
				body('phoneNumber', 'phone number must be of type String').exists().isString(),
				body('phoneNumber')
					.exists()
					.custom((value, { req }) => {
						if (value.length < 9 || value.length > 10)
							throw new Error('phone number cannot be more than 10 or less than 9');
						else if (value === '' || value === ' ')
							throw new Error('phone number cannot be empty String');
						else return true;
					}),

				/*  ----------- password VALIDATION ----------- */

				body('password', 'password must exists in the request').exists(),
				body('password', 'password must be of type string').exists().isString(),
				body('password')
					.exists()
					.custom((value, { req }) => {
						if (value === '' || value === ' ') throw new Error('password cannot be empty');
						else if (value.length < 8)
							throw new Error('password must be of length 8 chars or more');
						else return true;
					}),

				/*  ----------- totalRating VALIDATION ----------- */
				body('totalRating', 'totalRating must of type int').optional().isInt(),

				/*  ----------- numberOfRated VALIDATION ----------- */
				body('numberOfRated', 'numberOfRated must of type int').optional().isInt(),

				/*  ----------- isDriver VALIDATION ----------- */
				body('isDriver', 'isDriver must be of type boolean').optional().isBoolean(),

				/*  ----------- isCustomer VALIDATION ----------- */
				body('isCustomer', 'isCustomer must be of type boolean').optional().isBoolean(),

				/*  ----------- isAdmin VALIDATION ----------- */
				body('isAdmin', 'isAdmin must be of type boolean').optional().isBoolean(),
			];
		}
		case 'putUser': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [
						'name',
						'phoneNumber',
						'password',
						'totalRating',
						'numberOfRated',
						'isDriver',
						'isAdmin',
						'isCustomer',
						'_customer',
						'_driver',
					];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- Username VALIDATION ----------- */
				body('name.length', 'name cannot be empty string').optional().not().equals('0'),
				body('name')
					.optional()
					.custom((value, { req }) => {
						if (value.length == 1 || value.length < 4)
							throw new Error('name must be of length 4 chars or more');
						else if (value === '' || value === ' ') throw new Error('name cannot be empty String');
						else return true;
					}),

				/*  ----------- PhoneNumber VALIDATION ----------- */
				body('phoneNumber', 'phone number must be of type String').optional().isString(),
				body('phoneNumber')
					.optional()
					.custom((value, { req }) => {
						if (value.length < 9 || value.length > 10)
							throw new Error('phone number cannot be more than 10 or less than 9');
						else if (value === '' || value === ' ')
							throw new Error('phone number cannot be empty String');
						else return true;
					}),

				/*  ----------- password VALIDATION ----------- */
				body('password', 'password must be of type string').optional().isString(),
				body('password')
					.optional()
					.custom((value, { req }) => {
						if (value === '' || value === ' ') throw new Error('password cannot be empty');
						else if (value.length < 8)
							throw new Error('password must be of length 8 chars or more');
						else return true;
					}),
				/*  ----------- totalRating VALIDATION ----------- */
				body('totalRating', 'totalRating must of type int').optional().isInt(),

				/*  ----------- numberOfRated VALIDATION ----------- */
				body('numberOfRated', 'numberOfRated must of type int').optional().isInt(),

				/*  ----------- isDriver VALIDATION ----------- */
				body('isDriver', 'isDriver must be of type boolean').optional().isBoolean(),

				/*  ----------- isCustomer VALIDATION ----------- */
				body('isCustomer', 'isCustomer must be of type boolean').optional().isBoolean(),

				/*  ----------- isAdmin VALIDATION ----------- */
				body('isAdmin', 'isAdmin must be of type boolean').optional().isBoolean(),
			];
		}
		case 'deleteUser': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = [undefined];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- END OF SCHEMA VALIDATION ----------- */
				param('id', 'id must exists in the query and be string').exists().isString(),
			];
		}
		case 'getUserByPhone': {
			return [
				/*  ----------- Schema Validation ----------- */
				body(' ').custom((value, { req }) => {
					//  first specifying the schemas of the request to stop any request happing if any;
					const schemas = ['phoneNumber'];
					if (validateSchema(schemas, req)) return true;
				}),
				/*  ----------- END OF SCHEMA VALIDATION ----------- */

				/*  ----------- PhoneNumber VALIDATION ----------- */
				body('phoneNumber', 'phone number must exists').exists(),
				body('phoneNumber', 'phone number must be of type String').exists().isString(),
				body('phoneNumber')
					.exists()
					.custom((value, { req }) => {
						if (value.length < 9 || value.length > 10)
							throw new Error('phone number cannot be more than 10 or less than 9');
						else if (value === '' || value === ' ')
							throw new Error('phone number cannot be empty String');
						else return true;
					}),
			];
		}
	}
};

module.exports = validate;
