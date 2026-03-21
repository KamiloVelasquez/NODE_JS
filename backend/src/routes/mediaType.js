const { Router } = require('express');
const { body } = require('express-validator');
const { auth } = require('../middlewares/auth');
const { listMediaTypes, createMediaType, updateMediaType, deleteMediaType } = require('../controllers/mediaTypeController');

const router = Router();

// Validation
const typeValidation = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

/**
 * Routes for Tipo (Media Types)
 */
router.get('/', listMediaTypes);
router.post('/', auth, typeValidation, createMediaType);
router.put('/:id', auth, typeValidation, updateMediaType);
router.delete('/:id', auth, deleteMediaType);

module.exports = router;