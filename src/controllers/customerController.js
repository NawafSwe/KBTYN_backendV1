/* ----------------------------- importing packages ----------------------------- */
const Customer = require('../models/customer');

const getCustomers = async()=>{
    try{
        const response = await Customer.find({});
        return response;
    }catch(e){
        console.log(`error happen in the customerController at getCustomers ${e}`);
        return {message: `failed to get all customers`,status:500};
    }
}





// updating trips which will use the trip controller to do the op 

module.exports = {getCustomers};