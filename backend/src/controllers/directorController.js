const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { 
  findAllDirectors, findDirectorById, createNewDirector, updateDirectorById, deleteDirectorById 
} = require('../services/directorService');

/**
 * listDirectors
 * Controller for retrieving all directors.
 */
const listDirectors = async (req = request, res = response) => {
  try {
    const directors = await findAllDirectors();
    res.status(200).json(directors);
  } catch (error) {
    console.error('❌ Error listing directors:', error);
    res.status(500).json({ msg: 'An error occurred while listing directors.' });
  }
};

/**
 * getDirector
 * Controller for getting a single director by ID.
 */
const getDirector = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const director = await findDirectorById(id);
    res.status(200).json(director);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'An error occurred while fetching director details.' });
  }
};

/**
 * createDirector
 * Controller for creating a new director.
 */
const createDirector = async (req = request, res = response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const director = await createNewDirector(req.body);
    res.status(201).json(director);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'An error occurred while saving the director.' });
  }
};

/**
 * updateDirector
 * Controller for updating an existing director.
 */
const updateDirector = async (req = request, res = response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const director = await updateDirectorById(id, req.body);
    res.status(200).json(director);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'An error occurred while updating the director.' });
  }
};

/**
 * deleteDirector
 * Controller for removing a director record.
 */
const deleteDirector = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await deleteDirectorById(id);
    res.status(200).json({ msg: 'Director successfully deleted.' });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'An error occurred while deleting the director.' });
  }
};

module.exports = {
  listDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector
};