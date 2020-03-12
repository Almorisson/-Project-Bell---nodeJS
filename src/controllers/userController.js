const User = require('../models/sound');

/**
 * Retrieved all sounds in the DB and give it back to the client
 * @param {*} req
 * @param {*} res
 */
module.exports.allUser = async (req, res) => {
	try {
		await Sound.find({}, (err, sounds) => {
			if (err) {
				res.status(500);
				res.json({
					message: 'Something went wrong on the server !'
				});
			}
			return res.send(res.json(sounds));
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Login a user
 * @param {*} req
 * @param {*} res
 */
module.exports.login = async (req, res) => {

};

/**
 * Register a user
 * @param {*} req
 * @param {*} res
 */
module.exports.register = async (req, res) => {

};

