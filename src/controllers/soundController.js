const Sound = require('../models/sound');

module.exports.allSound = async (req, res) => {
	await Sound.find({}, (err, sounds) => {
		if (err) {

		}
		return res.json(sounds);
	});
};
