const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			minLength: 6,
			maxLength: 50
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ versionKey: false }
);

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.validateEmail = function(email) {
	return emailValidator.validate(email);
};

// Validators and manipulation methods for password
UserSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(5);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

UserSchema.methods.validPassword = async function(candidatePassword) {
	const result = bcrypt.compare(candidatePassword, this.password);
	return result;
};

module.exports = mongoose.model('User', UserSchema);
