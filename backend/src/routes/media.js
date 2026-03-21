const { Router } = require('express');
const { 
  listMedias, createMedia, updateMedia, deleteMedia 
} = require('../controllers/mediaController');

const router = Router();

/**
 * Routes for Media
 */
router.get('/', listMedias);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;