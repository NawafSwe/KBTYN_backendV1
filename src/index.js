/* ----------------------------- importing packages ----------------------------- */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const passport = require('passport');
const userRouter = require('./routes/userRoute');
const User = require('./models/user');
const moment = require('moment');
const dbConnection = require('../db');
dotenv.config();

/*----------------- Establishing Connection to DB -----------------*/
 dbConnection();

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

/* -------------- establishing connection ---------------------- */
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
