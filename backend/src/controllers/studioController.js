const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { 
  findAllStudios, createNewStudio, updateStudioById, deleteStudioById 
} = require('../services/studioService');

/**
 * listProductionCompanies
 * GET /production-companies
 */
const listProductionCompanies = async (req = request, res = response) => {
  try {
    const companies = await findAllStudios();
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const company = await createNewStudio(req.body);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const company = await updateStudioById(id, req.body);
    res.status(200).json(company);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Failed to update production company.' });
  }
};

/**
 * deleteStudio
 * DELETE /production-companies/:id
 */
const deleteStudio = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await deleteStudioById(id);
    res.status(200).json({ msg: 'Production company successfully deleted.' });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Failed to delete production company.' });
  }
};

module.exports = {
  listStudios: listProductionCompanies,
  createStudio: createProductionCompany,
  updateStudio: updateProductionCompany,
  deleteStudio
};