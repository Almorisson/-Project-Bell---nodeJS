const express = require('express');
const { allSound, getASound, createASound, updateASound, deleteASound } = require('../controllers/soundController');

// Grab the express Router
const router = express.Router();

/**
 * ALl possible getRoutes for a sound
 */
router.get('/', allSound);
router.get('/:sound_id', getASound);

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

console.log(router);
module.exports = router;
