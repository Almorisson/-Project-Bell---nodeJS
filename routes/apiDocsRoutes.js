const express = require('express');
const { getAllEndpoints, getSoundEndpoints, getUserEndpoints } = require('../controllers/apiDocsController');

const router = express.Router();

router.get('/', getAllEndpoints);

router.get('/sounds', getSoundEndpoints);

router.get('/users', getUserEndpoints);

module.exports = router;
