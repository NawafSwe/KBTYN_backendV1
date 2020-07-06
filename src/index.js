/* ----------------------------- importing packages ----------------------------- */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession);
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const passport = require('passport');
const userRouter = require('./routes/userRoute');
const moment =  require('moment');

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
			// prune expired entries every 24h
			checkPeriod: 86400000,
		}),
		secret: 'KBTYN',
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
app.use('/users',userRouter);

/* -------------- establishing connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
