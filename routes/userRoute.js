const express = require('express');
const User = require('../models/user');
const { register, login, logout, findUserById } = require('../controllers/userController');
const { isEmail, hasPassword, hasName } = require('../validations/validators');
// Grab the express Router
const router = express.Router();

router.post('/register', [hasName, isEmail, hasPassword], register);

router.post('/login', [isEmail, hasPassword], login);

router.get('/logout', authenticate, logout);

router.get('/', findUserById);

// Allow to  check is still authenticate in its account before doing some delicate operations (e.g: delete, update, etc)
router.param('user_id', findUserById);

module.exports = router;
