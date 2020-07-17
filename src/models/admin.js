/*------------------ admin Model  ------------------ */
const mongoose = require('mongoose');

/*---------------------------- creating schema ----------------------------*/
const AdminSchema = mongoose.Schema({
    listOfCustomer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

/*---------------------------- creating the model in the DB ----------------------------*/
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
