const { check } = require('express-validator');

/**
 * This file contains all helpers functions allowing us
 * to validate the type of data coming from the user
 */

exports.isCorrectLink = (req, res, next) => {

	req.check('link').isURL().withMessage('Link must be a valid URL of a existing media resource');

	// check for errors
	const errors = req.validationErrors();

	if (errors) {
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	// proceed to next middleware or bypass if no error
	next();
};

exports.isCorrectTitle = (req, res, next) => {
	req
		.check('title')
		.notEmpty()
		.withMessage('Title of the sound cannot be a empty')
		.isLength({ min: 5, max: 100 })
		.withMessage('Title of the sound must be at least 6 chars long and less than or equal to 100 chars.');

	// check for errors
	const errors = req.validationErrors();

	if (errors) {
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	// proceed to next middleware or bypass if no error
	next();
};

exports.isEmail = check('email').isEmail().notEmpty().withMessage('Please, fill with a valid email.');

exports.hasPassword = check('password').exists().withMessage('The password field is required.');

exports.hasFullName = check('fullName').isLength({ min: 5 }).withMessage('The name field is required. 5 characters minimum.');

exports.passwordRegex = (req, res, next) => {
	// check for password
	req.check('password', 'Password is required').notEmpty();
	req
		.check('newPassword')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 chars long')
		.matches(/\d/)
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
