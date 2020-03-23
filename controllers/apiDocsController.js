const validationHandler = require('../validations/validationHandler');
const apiDocs = require('../docs/apiDocsEndpoints');
const apiSoundDocs = require('../docs/soundEndpoints');
const apiUserDocs = require('../docs/userEndpoints');

// All Endpoints controller
exports.getAllEndpoints = (req, res) => {
    validationHandler(req)
    return res.json(apiDocs)
}

// Sound Endpoints controller
exports.getSoundEndpoints = (req, res) => {
    validationHandler(req)
    return res.json(apiSoundDocs)
}

// User Endpoints controller
exports.getUserEndpoints = (req, res) => {
    validationHandler(req)
    return res.json(apiUserDocs)
}
