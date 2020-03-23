const expressJwt = require('express-jwt')
const config = require('../config')

exports.authenticate = expressJwt({
    secret: config.JWT_SECRET_KEY,
    userProperty: "auth"
});
