const { request, response } = require('express');
const { 
  findAllProductionCompanies, createNewProductionCompany, updateProductionCompanyById 
} = require('../services/productoraService');

/**
 * listProductionCompanies
 * GET /production-companies
 */
const listProductionCompanies = async (req = request, res = response) => {
  try {
    const companies = await findAllProductionCompanies();
    res.status(200).json(companies);
  } catch (error) {
    console.error('❌ Error fetching companies:', error);
    res.status(500).json({ msg: 'Failed to retrieve production companies.' });
  }
};

/**
 * createProductionCompany
 * POST /production-companies
 */
const createProductionCompany = async (req = request, res = response) => {
  try {
    const company = await createNewProductionCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Failed to save production company.' });
  }
};

/**
 * updateProductionCompany
 * PUT /production-companies/:id
 */
const updateProductionCompany = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const company = await updateProductionCompanyById(id, req.body);
    res.status(200).json(company);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Failed to update production company.' });
  }
};

module.exports = {
  listProductionCompanies,
  createProductionCompany,
  updateProductionCompany
};