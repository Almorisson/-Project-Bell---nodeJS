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
const soundRoute = require('./routes/soundRoute');
const config = require('./Config/index');
const cors = require('cors');
const soundEndpointsDocs = require('./docs/soundEndpoints');

// Configure the loading of .env file
// TODO: Fix the line below - Don't work properly
require('dotenv').config({ debug: process.env.DEBUG}); // Import all ENV Variable in the .env file
/**
 * All Constants that we mainly use in the project
 */
const HOST = config.HOSTNAME;
const PORT = config.PORT || 5000;

const app = express();

app.use(cors())

//db connection
mongoose
	.connect(config.MONGO_URI_LOCAL, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Calling all routes
 */
// TODO: API DOC for all available resources
//app.use('/api/v1/', soundEndpointsDocs);

app.use('/api/v1/sounds', soundRoute);

//app.use('/api/v1/sounds', soundRoute);

app.listen(PORT, HOST, () => {
	console.log(`Server is listening on ${HOST}:${PORT}`);
});
