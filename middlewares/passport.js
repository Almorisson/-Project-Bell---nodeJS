const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('../config');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const User = require('../models/user');

const params = {
	secretOrKey: config.JWT_SECRET_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = () => {
	const userStrategy = new Strategy(params, async (payload, done) => {
		const user = await User.findById(payload.id);
		if (!user) {
			return done(new Error('User not found !'), null);
		}
		return done(null, user);
	});

	passport.use(userStrategy);

	return {
		initialize: function() {
			return passport.initialize();
		},

		authenticate: function() {
			return passport.authenticate('jwt', { session: false });
		}
	};
};
