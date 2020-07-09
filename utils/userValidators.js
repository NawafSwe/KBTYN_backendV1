/*          ------------------- EXPLANATION -------------------
 since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 will goes into the switch case as a case.
*/
const { body, param } = require('express-validator/check');
const validateSchema = require('./checkSchema');
const validate = (method) => {};


module.exports   = validate;