const express = require('express');
const { register, login, logout, update, getAllUsers, getUserById, findUserById, unregister } = require('../controllers/userController');
const { isEmail, hasPassword, hasFullName } = require('../validations/validators');
const { authenticate } = require('../middlewares/authHelper');
// Grab the express Router
const router = express.Router();

router.post('/register', [hasFullName, isEmail, hasPassword], register);

router.post('/login', [isEmail, hasPassword], login);

router.get('/logout', authenticate, logout);

router.get('/:user_id', authenticate, getUserById); // Get the current authenticate user

router.put('/:user_id', authenticate, update);
    
router.delete('/:user_id', authenticate, unregister);

router.get('/', getAllUsers);


// Allow to  check is still authenticate in its account before doing some delicate operations (e.g: delete, update, etc)
router.param('user_id', findUserById);

module.exports = router;
