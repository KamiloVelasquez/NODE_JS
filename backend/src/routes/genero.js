const { Router } = require('express');
const { listGenres, createGenre } = require('../controllers/generoController');

const router = Router();

/**
 * Routes for Genero (Genres)
 */
router.get('/', listGenres);
router.post('/', createGenre);

module.exports = router;
