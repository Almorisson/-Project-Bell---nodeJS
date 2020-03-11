const express = require('express');
const { allSound } = require('../controllers/soundController')
const router = express.Router();
/**
 * ALl possible getRoutes for a sound
 */
router.get('/sounds', allSound);
//router.get('/sounds/:sound_id', allSound);


module.exports = router;
