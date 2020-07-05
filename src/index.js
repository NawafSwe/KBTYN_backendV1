/* ----------------------------- importing packages ----------------------------- */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);


/* ----------------------- Configuring App -----------------------*/
const app = express();
app.use(cors());
app.use(bodyParser.json());

// /*----------------- Establishing Connection to DB -----------------*/
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(
// 	MONGO_URI,
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 		useFindAndModify: false,
// 	},
// 	(err, db) => {
// 		//testing the connectivity of the DB
// 		if (err) console.log('error to connect to the database', err);
// 		else console.log('successfully connected to the database');
// 	}
// );


/* -------------- checking backend health ---------------------- */
app.get('/', (req, res) => {
	res.send('Hello World').status(200);
});


/* -------------- establishing connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);