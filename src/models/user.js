const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	passwordConfirmation: {
		type: String,
		required: false
	}
});

SoundSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

SoundSchema.methods.validateEmail = function(email) {
	return validator.validate(email);
};

// Validators and manipulation methods for password
SoundSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(5);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

SoundSchema.methods.validPassword = async function(candidatePassword) {
	const result = bcrypt.compare(candidatePassword, this.password);
	return result;
};

module.exports = mongoose.model('User', userSchema);
