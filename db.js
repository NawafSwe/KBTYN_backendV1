/* ----------------------------- importing packages ----------------------------- */
const mongoose = require('mongoose');

/** connectDB function that establishes a network Connection 
 * @throws {Error} if the connection fails it will an error 
 */
const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log(`MongoDB Connected to KBTYN DB`);
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = connectDB;