const Sound = require('../models/sound');
const validationHandler = require('../validations/validationHandler');
const { isCorrectLink, isCorrectTitle } = require('../validations/validators');
/**
 * Retrieved all sounds in the DB and give it back to the client
 * @param {*} req
 * @param {*} res
 */
exports.allSound = async (req, res) => {
	try {
		await Sound.find({}, (err, sounds) => {
			if (err) {
				res.status(500);
				res.json({
					message: 'Something went wrong on the server !'
				});
			}
			return res.json(sounds);
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieved a single sound in the DB and give it back to the client
 * @param {*} req
 * @param {*} res
 */
exports.getSoundById = async (req, res) => {
	try {
		validationHandler(req);

		await Sound.findById({ _id: req.params.sound_id }, (err, sound) => {
			if (err) {
				res.status(400);
				res.json({
					message: `Sound with id ${req.params.sound_id} does not exist in our database.`
				});
			}
			return res.json(sound);
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Create a new Sound in the DB
 * @param {*} req
 * @param {*} res
 */
exports.createASound = async (req, res, next) => {
	try {
		validationHandler(req);
		//isCorrectLink(req, res, next);
		//isCorrectTitle(re, res, next);

		// Check if the sound already exist in the DB
		const existingLink = await Sound.findOne({ link: req.body.link });
		if (existingLink) {
			res.status(409);
			res.json({
				message: `The Sound with the following link ${req.body.link} is already submitted by another user`
			});
		} else {
			const newSound = new Sound();

			newSound.title = req.body.title;
			newSound.link = req.body.link;

			// Save on the DB
			newSound.save((err, sound) => {
				if (err) {
					res.status(500);
					res.json({
						message: `Something went wrong on the server when trying to create the sound.`
					});
				}
				res.status(201);
				res.json({
					sound,
					message: `Sound with id ${sound._id} was created successfully !`
				});
			});
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Update an existing Sound - May send metadata if necessary
 * @param {*} req
 * @param {*} res
 */
exports.updateASound = async (req, res, next) => {
	try {
		validationHandler(req);

		const soundToUpdate = await Sound.findOne({ _id: req.params.sound_id });
		if (soundToUpdate === null) {
			res.status(404);
			res.json({
				message: `Sound with id ${req.params.sound_id} you are trying to update, does not exist in our DB.`
			});
		} else {
			await Sound.updateOne(
				{ _id: soundToUpdate._id },
				{ title: req.body.title, link: req.body.link },
				(err, sound) => {
					if (err) {
						res.status(500);
						res.json({
							message: `Something went wrong on the server when trying to update the sound.`
						});
					}

					return res.status(200).json({
						message: `Sound with id ${sound._id} was updated successfully!`
					});
				}
			);
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Update an existing Sound - May send metadata if necessary
 * @param {*} req
 * @param {*} res
 */
exports.deleteASound = async (req, res, next) => {
	try {
		validationHandler(req);

		const soundToDel = await Sound.findOne({ _id: req.params.sound_id });
		if (soundToDel === null) {
			res.status(404);
			res.json({
				message: `Sound with id ${req.params.sound_id} you are trying to delete, does not exist in our DB.`
			});
		} else {
			await Sound.findByIdAndRemove({ _id: req.params.sound_id }, { useFindAndModify: false }, (err, sound) => {
				if (err) {
					res.status(500);
					res.json({
						message: `Something went wrong on the server when trying to delete the sound.`
					});
				}

				return res.status(200).json({
					sound,
					message: `Sound with id ${sound._id} was deleted successfully!`
				});
			});
		}
	} catch (error) {
		next(error);
	}
};
