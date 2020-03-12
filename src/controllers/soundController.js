const Sound = require('../models/sound');

/**
 * Retrieved all sounds in the DB and give it back to the client
 * @param {*} req
 * @param {*} res
 */
module.exports.allSound = async (req, res) => {
	await Sound.find({}, (err, sounds) => {
		if (err) {
			res.status(500);
			res.json({
				message: 'Something went wrong on the server !'
			});
		}
		return res.send(res.json(sounds));
	});
};

/**
 * Retrieved a single sound in the DB and give it back to the client
 * @param {*} req
 * @param {*} res
 */
module.exports.getASound = async (req, res) => {
	await Sound.findById({ _id: req.params.sound_id }, (err, sound) => {
		if (err) {
			res.status(400);
			res.json({
				message: `Sound with id ${req.params.sound_id} does not exist in our database.`
			});
		}
		return res.send(res.json(sound));
	});
};

/**
 * Create a new Sound in the DB
 * @param {*} req
 * @param {*} res
 */
module.exports.createASound = async (req, res) => {
	const newSound = new Sound();
	if (err) {
		res.status(500);
		res.json({
			message: `Something went wrong on the server when trying to create the sound.`
		});
	}

	// Save on the DB
	newSound.save();
};

/**
 * Update an existing Sound - May send metadata if necessary
 * @param {*} req
 * @param {*} res
 */
module.exports.updateASound = async (req, res) => {};

/**
 * Update an existing Sound - May send metadata if necessary
 * @param {*} req
 * @param {*} res
 */
module.exports.deleteASound = async (req, res) => {
	const soundToDel = await Sound.findById({ _id: req.params.sound_id }, (err, sound) => {
		if (err) {
			res.status(500);
			res.json({
				message: `Something went wrong on the server when trying to delete the sound.`
			});
		}

		return res.send({
            sound : soundToDel,
			message: `Sound with id ${soundToDel._id} is deleted successfully !`
		});
	});
};
