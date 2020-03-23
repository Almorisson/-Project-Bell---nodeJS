/**
 * Imports all native necessary libs
 */
//const http = require('http');

/**
 * Imports all dependency libs
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');
const soundRouter = require('./routes/soundRoute');
const userRouter = require('./routes/userRoute');
const apiDocsRouter = require('./routes/apiDocsRoutes');
const cors = require('./node_modules/cors');
const { errors } = require('./middlewares/errorHandler');
var passport = require('passport');

require('./middlewares/passport');


//const mongojs = require('mongojs');
// const db = mongojs('mydb');
//const db = mongojs(`${config.MONGO_URI_LOCAL}`, ['db']);

// Configure the loading of .env file
// TODO: Fix the line below - Don't work properly
//require('dotenv').config({ debug: process.env.DEBUG}); // Import all ENV Variable in the .env file
/**
 * All Constants that we mainly use in the project
 */
const HOST = config.HOST;
const PORT = config.PORT;

const app = express();
// using Cors
app.use(cors());

//DB connection
mongoose
	.connect(config.MONGO_URI_ATLAS, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('DB Connected'))
	.catch(err => console.log(err.message));

// Catch all connections errors with an event of type error
mongoose.connection.on('error', (err) => {
	console.log(`DB connection error: ${err.message}`);
});

/**
 * Using body-parser middleware
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

/**
 * Calling all routes
 */

// API Docs routes
app.use('/api/v1/docs', apiDocsRouter);
// Sound routes
app.use('/api/v1/sounds', soundRouter);
// User Routes
app.use('/api/v1/users', userRouter);

app.use(errors);

app.listen(PORT, HOST, () => {
    if (process.env.NODE_ENV === "production") {
        console.log(`Server is listening on https://${HOST}:${PORT}`);
    } else {
        console.log(`Server is listening on http://${HOST}:${PORT}`);
    }
});
