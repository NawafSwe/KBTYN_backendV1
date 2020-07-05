/* ----------------------------- importing packages ----------------------------- */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);
const dotenv = require('dotenv').config();
const passport = require('passport'),


/* ----------------------- Configuring App -----------------------*/
const app = express();
app.use(cors());
app.use(bodyParser.json());

/*----------------- Establishing Connection to DB -----------------*/
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(
	MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	(err, db) => {
		//testing the connectivity of the DB
		if (err) console.log('error to connect to the database', err);
		else console.log('successfully connected to the database');
	}
);

/* ----------------------- Configuring Passport  -----------------------*/

app.use(
	expressSession({
		cookie: { maxAge: 86400000 },
		resave: true,
		saveUninitialized: true,
		store: new MemoryStore({
			checkPeriod: 86400000, // prune expired entries every 24h
		}),
		secret: process.env.SECRET,
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

// /* passport serialize and deserialize are response of reading the data
// from session decoded and encoded save and delete  */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* -------------- checking backend health ---------------------- */
app.get('/', (req, res) => {
	res.send('Hello World').status(200);
});


/* -------------- establishing connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);