/**
 * Imports all native necessary libs
 */
//const http = require('http');

/**
 * Imports all dependency libs
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/index');
const soundRouter = require('./routes/soundRoute')
const cors = require('cors');
const soundEndpointsDocs = require('./docs/soundEndpoints');
//const dotenv = require('dotenv');

//dotenv.config();

//const mongojs = require('mongojs');
// const db = mongojs('mydb');
//const db = mongojs(`${config.MONGO_URI_LOCAL}`, ['db']);

// Configure the loading of .env file
// TODO: Fix the line below - Don't work properly
//require('dotenv').config({ debug: process.env.DEBUG}); // Import all ENV Variable in the .env file
/**
 * All Constants that we mainly use in the project
 */
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

const app = express();
// using Cors
app.use(cors());

//DB connection
mongoose
	.connect(process.env.MONGO_URI_LOCAL, {
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

/**
 * Calling all routes
 */
// TODO: API DOC for all available resources
//app.use('/api/v1/', soundEndpointsDocs);

// Sound Routes
app.use('/sounds', soundRouter);


app.listen(PORT, HOST, () => {
	console.log(`Server is listening on ${HOST}:${PORT}`);
});
