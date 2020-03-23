const User = require('../models/user');
const validationHandler = require('../validations/validationHandler');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Login Controller
 * Login a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
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
		if (!user) {
			res.status(401).json({
				message: 'Wrong Email'
			});
		}

		const validPassword = await user.validPassword(password);
		if (!validPassword) {
			res.status(401).json({
				message: 'Wrong Password'
			});
		}

		// use JWT for handle real authentication
		const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
		res.cookie('token_break_bell', token, { expire: new Date() + 36000 });

		return res.send({ user });
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
		user.name = req.body.fullName;
		user.email = user.email = req.body.email;
		user.password = await user.encryptedPassword(req.body.password);

		const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
		res.cookie('token_break_bell', token, { expire: new Date() + 36000 });

		return res.status(200).json({ user, token });
	} catch (err) {
		next(err);
	}
};

/**
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
					message: 'User was not found not found in our DB.'
				});
			}
			req.profile = user; // adds a profile object to req with user infos
			next();
		});
	} catch (err) {
		next(err);
	}
};
