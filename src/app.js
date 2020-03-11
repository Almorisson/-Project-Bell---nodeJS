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
// Configure the loading of .env file
// TODO: Fix the line below - Don't work properly
require('dotenv').config(); // Import all ENV Variable in the .env file
/**
 * All Constants that we mainly use in the project
 */
const HOST = process.env.HOSTNAME;
const PORT = 3000 || process.env.PORT;

const app = express();

//db connection
mongoose
	.connect("mongodb://mongo:27017/bell_db", { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('DB Connected'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/**
 * Calling all routes
 */
app.use('/sounds', soundRoute);

app.listen(PORT, HOST, () => {
	console.log(`Server is listening on ${HOST}:${PORT}`);
});
