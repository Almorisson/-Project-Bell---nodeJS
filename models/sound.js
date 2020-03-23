const mongoose = require('mongoose');

const SoundSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
    link: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Sound', SoundSchema);
