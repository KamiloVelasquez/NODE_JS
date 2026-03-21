const { Router } = require('express');
const { listMediaTypes, createMediaType, updateMediaType } = require('../controllers/tipoController');

const router = Router();

/**
 * Routes for Tipo (Media Types)
 */
router.get('/', listMediaTypes);
router.post('/', createMediaType);
router.put('/:id', updateMediaType);

module.exports = router;