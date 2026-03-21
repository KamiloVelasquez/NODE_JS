const { Router } = require('express');
const { body } = require('express-validator');
const { auth } = require('../middlewares/auth');
const { listGenres, createGenre, updateGenre, deleteGenre } = require('../controllers/genreController');

const router = Router();

// Validation
const genreValidation = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

/**
 * Routes for Genero (Genres)
 */
router.get('/', listGenres);
router.post('/', auth, genreValidation, createGenre);
router.put('/:id', auth, genreValidation, updateGenre);
router.delete('/:id', auth, deleteGenre);

module.exports = router;
