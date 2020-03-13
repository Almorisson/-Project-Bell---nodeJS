const express = require('express');
const { allSound, getSoundById, createASound, updateASound, deleteASound } = require('../controllers/soundController');

// Grab the express Router
const router = express.Router();
/**
 * ALl possible getRoutes for a sound
 */
router.get('/', allSound);
router.get('/:sound_id', getSoundById);

/**
 * All possible Routes for creating a sound
 */
router.post('/', createASound);

/**
 * All possible Routes for updating a sound
 */
router.put('/:sound_id', updateASound);

/**
 * All possible Routes for deleting a sound
 */
router.delete('/:sound_id', deleteASound);

module.exports = router;
