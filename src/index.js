/* ----------------------------- importing packages ----------------------------- */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);
const methodOverride = require('method-override');
const passport = require('passport');
const userRouter = require('./routes/userRoute');
const authenticationRouter = require('./routes/authenticationRouter');
const tripRouter = require('./routes/tripRoute');
const customerRouter = require('./routes/customerRouter');
const driverRouter = require('./routes/driverRouter');
const User = require('./models/user');
const moment = require('moment');
const mongoose = require('mongoose');

/* -------------- choosing Env ---------------------- */
if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
	require('custom-env').env(process.env.NODE_ENV);
} else {
	require('dotenv').config();
}
/* ----------------------- Configuring App -----------------------*/

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

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
		else console.log('successfully connected to the database ', db.name);
	}
);

/*---------------------------- Middleware ----------------------------*/

/* this is a middleware var user is to gives you if there is a user singed in or not  
and it gives you the id of him and the username and it will be passed to all the routes in the templates.*/
app.use((req, res, next) => {
	// the current username will be easily accessible in the client site for some check as currentUser. ---> user properties
	res.locals.currentUser = req.user;

	//next will movie to the next middleware of the route;
	next();
});

/* ----------------------- Configuring Passport  -----------------------*/

app.use(
	expressSession({
		cookie: { maxAge: 86400000 },
		resave: true,
		saveUninitialized: true,
		store: new MemoryStore({
			// prune expired entries every 24h
			checkPeriod: 86400000,
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

/* -------------- Importing routers ---------------------- */
app.use('/users', userRouter);
app.use('/customers', customerRouter);
//https:localhost:8800/trips
app.use('/trips', tripRouter);
app.use('/drivers', driverRouter);
app.use(authenticationRouter);

/* -------------- establishing connection ---------------------- */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
