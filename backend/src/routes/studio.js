const { Router } = require('express');
const { body } = require('express-validator');
const { auth } = require('../middlewares/auth');
const { 
  listStudios, createStudio, updateStudio, deleteStudio 
} = require('../controllers/studioController');

const router = Router();

// Validation
const studioValidation = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

/**
 * Routes for Productora (Production Companies)
 */
router.get('/', listStudios);
router.post('/', auth, studioValidation, createStudio);
router.put('/:id', auth, studioValidation, updateStudio);
router.delete('/:id', auth, deleteStudio);

module.exports = router;