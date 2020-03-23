const User = require('../models/user');
const validationHandler = require('../validations/validationHandler');
const jwt = require('jsonwebtoken');
const config = require('../config');
const _ = require('lodash');
/**
 * Login Controller
 * Login a user
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 */
exports.login = async (req, res, next) => {
	try {
		/**
         * Calling the validationHandler main function on the req variable
         * @see the corresponding file t better understand this handler
         */
		validationHandler(req);

		const email = req.body.email;
		const password = req.body.password;

		const user = await User.findOne({ email }).select('+password');
		//console.log(JSON.parse(user));

		if (!user) {
			return res.status(401).json({
				message: 'Wrong Email !'
			});
		}

		const validPassword = await user.validPassword(password);
		if (!validPassword) {
			return res.status(401).json({
				message: 'Wrong Password !'
			});
		}

		// use JWT for handle real authentication
		const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
		res.cookie('token_break_bell', token, { expire: new Date() + 36000 });

		return res.status(200).json({ user, token });
	} catch (err) {
		next(err);
	}
};

/**
 * Logout controller
 * Logout a user
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 */
exports.logout = async (req, res, next) => {
	try {
		validationHandler(req);
		const response = await res.clearCookie('token_break_bell');

		if (!response) {
			res.status(500).json({
				message: 'Something went wrong when trying to log out you !'
			});
		}

		res.status(200).json({ message: 'You are logged out successfully !' });
	} catch (err) {
		next(err);
	}
};

/**
 * Register Controller
 * Register a user
 *  @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 */
exports.register = async (req, res, next) => {
	try {
		/**
         * Calling the validationHandler main function on the req variable
         * @see the corresponding file that holds this function to better understand this handler
         */
		validationHandler(req);

		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			res.status(403).json({
				message: 'Email is already in used!'
			});
		}

		let user = new User();
		user.fullName = req.body.fullName;
		user.email = req.body.email;
		user.password = await user.encryptPassword(req.body.password);

		/* 		user = await user.save((err, user) => {
			if (err) {
				res.status(500).json({
					message: 'Something went wrong while processing'
				});
			}
		});

		const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
		return res.send({ user, token }); */
		user = await user.save();

		const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
		res.statusCode = 201;
		return res.json({ user, token });
	} catch (err) {
		next(err);
	}
};

/**
 * getAllUsers controller
 * Get all users
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 */
exports.getAllUsers = async (req, res, next) => {
	try {
		validationHandler(req);
		const users = await User.find((err, users) => {
			if (err) {
				return res.status(400).json({
					message: `${err}`
				});
			}
		}).sort({ created_at: -1 });

		return res.status(200).json({ users });
	} catch (err) {
		next(err);
	}
};

/**
 * getUserById controller
 * Get a current connected user
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 */
exports.getUserById = (req, res) => {
	validationHandler(req);
	return res.send(req.profile);
};

/**
 * update controller
 * Using lodash(aka _) to update the changed fields
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 */
exports.update = async (req, res, next) => {
	try {
		validationHandler(req);

		let user = req.profile;
		user = _.extend(user, req.body);
		user.updated_at = Date.now();

		user.password = await user.encryptPassword(req.body.password);

		await user.save((err, user) => {
			if (err) {
				return res.status(400).json({
					message: `${err}`
				});
			}
		});

		return res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};

/**
 * unregister controller
 * Allows to delete definitely a user on the app
 * Only User can unregister his account because he need to be connected to do it
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 */
exports.unregister = async function(req, res, next) {
	validationHandler(req);
	try {
		let user = req.profile;
		await user.remove((err, deletedUser) => {
			if (err) {
				return res.status(400).json({
					error: "You don't have authorized to delete a user."
				});
			}
			return res.send({ message: `The account ${deletedUser.email} was unregistered successfully !` });
		});
	} catch (error) {
		next();
	}
};
/**
 * Method that easily allows to inject the id of the connected user
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - Middleware to loop through errors
 * @param {*} id - Potential id of the user
 */
exports.findUserById = async function(req, res, next, id) {
	try {
		validationHandler(req);

		await User.findById(id).exec((err, user) => {
			if (err || !user) {
				return res.status(400).json({
					message: 'User was not found in our DB.'
				});
			}
			req.profile = user; // adds a profile object to req with user infos
			next();
		});
	} catch (err) {
		next(err);
	}
};
