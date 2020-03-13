const { check } = require('express-validator');

/**
 * This file contains all helpers functions allowing us
 * to validate the type of data coming from the user
 */
exports.isEmail = check('email').isEmail().withMessage('Please, fill a valid email.');

exports.hasPassword = check('password').exists().withMessage('The password field is required.');

exports.hasName = check('name')
	.isLength({ min: 5 })
	.withMessage('The name field is required. 5 characters minimum.');

exports.passwordRegex = (req, res, next) => {
	// check for password
	req.check('password', 'Password is required').notEmpty();
	req
		.check('newPassword')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 chars long')
		.matches(/\d/)
		.withMessage('must contain a number')
		.withMessage('Password must contain a number');

	// check for errors
	const errors = req.validationErrors();
	// if error show the first one as they happen
	if (errors) {
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	// proceed to next middleware or bypass
	next();
};
