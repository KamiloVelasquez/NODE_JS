const { Router } = require('express');
const { 
  listProductionCompanies, createProductionCompany, updateProductionCompany 
} = require('../controllers/productoraController');

const router = Router();

/**
 * Routes for Productora (Production Companies)
 */
router.get('/', listProductionCompanies);
router.post('/', createProductionCompany);
router.put('/:id', updateProductionCompany);

module.exports = router;