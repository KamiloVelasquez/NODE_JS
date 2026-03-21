const { Router } = require('express');
const { body } = require('express-validator');
const { auth, adminOnly } = require('../middlewares/auth');
const { 
  listDirectors, getDirector, createDirector, updateDirector, deleteDirector 
} = require('../controllers/directorController');

const router = Router();

// Validation for creating director
const createDirectorValidation = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];

// Routes for Director
router.get('/', listDirectors);
router.get('/:id', getDirector);
router.post('/', auth, createDirectorValidation, createDirector);
router.put('/:id', auth, updateDirector);
router.delete('/:id', auth, deleteDirector);

module.exports = router;