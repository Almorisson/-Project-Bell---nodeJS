/**
 * Imports all native necessary libs
 */
//const http = require('http');

/**
 * Imports all dependency libs
 */
const express = require('express');
const mongoose = require('mongoose');

// Configure the loading of .env file
require('dotenv').config(); // Import all ENV Variable in the
/**
 * All Constants that we mainly use in the project
 */
const HOST = process.env.HOSTNAME;
const PORT = 3000 || process.env.PORT;

const app = express();




app.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});

