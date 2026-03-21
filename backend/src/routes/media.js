const { Router } = require('express');
const { body } = require('express-validator');
const { auth } = require('../middlewares/auth');
const { 
  listMedias, createMedia, updateMedia, deleteMedia 
} = require('../controllers/mediaController');

const router = Router();

// Validation
const mediaValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('serialNumber').notEmpty().withMessage('Serial number is required'),
    body('genre').isMongoId().withMessage('Valid Genre ID is required'),
    body('director').isMongoId().withMessage('Valid Director ID is required'),
];

/**
 * Routes for Media
 */
router.get('/', listMedias);
router.post('/', auth, mediaValidation, createMedia);
router.put('/:id', auth, mediaValidation, updateMedia);
router.delete('/:id', auth, deleteMedia);

module.exports = router;