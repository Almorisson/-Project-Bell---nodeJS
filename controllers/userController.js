const User = require('../models/user');
const validationHandler = require('../validations/validationHandler');
/**
 * Login Controller
 * Login a user
 * @param {*} req
 * @param {*} res
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
		if (!User) {
			const error = new Error('Wrong Email');
			error.statusCode = 401;
			throw error;
		}

		const validPassword = await user.validPassword(password);
		if (!validPassword) {
			const error = new Error('Wrong Password');
			error.statusCode = 401;
			throw error;
		}

		// use JWT for handle real connection

		return res.send({ user });
	} catch (err) {
		next(err);
	}
};

/**
 * Register Controller
 * Register a user
 * @param {*} req
 * @param {*} res
 */
exports.register = async (req, res, next) => {
	try {

		/**
         * Calling the validationHandler main function on the req variable
         * @see the corresponding file t better understand this handler
         */
		validationHandler(req);

		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			const error = new Error('Email is already in used!');
			error.statusCode = 403;
			throw error;
		}

		let user = new User();
		user.name = req.body.firstName;
		user.email = user.email = req.body.email;
		user.password = await user.encryptedPassword(req.body.password);
	} catch (error) {
		console.log(error);
		next(err);
	}
};
