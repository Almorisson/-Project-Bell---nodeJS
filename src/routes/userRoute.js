const express = require('express');
const { } = require('../controllers/userController');

// Grab the express Router
const router = express.Router();
/**
 * ALl possible getRoutes for a sound
 */
router.get('/sounds', allSound);
router.get('/sounds/:sound_id', getASound);

/**
 * All possible Routes for creating a sound
 */
router.post('/sounds', createASound);

/**
 * All possible Routes for updating a sound
 */
router.put('/sounds/:sound_id', updateASound);

/**
 * All possible Routes for deleting a sound
 */
router.delete('/sounds/:sound_id', deleteASound);

module.exports = router;
