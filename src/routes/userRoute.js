const express = require('express');
const User = require('../models/user');
const { } = require('../controllers/userController');

// Grab the express Router
const router = express.Router();

// register controller
exports.register = async (req, res) => {

    try {

        const existingUser = await User.findOne({ email: req.body.email })

        if (existingUser) {
            const error = new Error("Email is already in used!")
            error.statusCode = 403;
            throw error;
        }

        customer = await customer.save();
    } catch (error) {
        console.log(err);
    }
}

module.exports = router;
