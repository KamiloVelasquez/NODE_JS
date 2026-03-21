const { request, response } = require('express');
const { findAllGeneros, createNewGenero } = require('../services/generoService');

/**
 * listGenres
 * Handles GET /genres
 */
const listGenres = async (req = request, res = response) => {
  try {
    const genres = await findAllGeneros();
    res.status(200).json(genres);
  } catch (error) {
    console.error('❌ Error listing genres:', error);
    res.status(500).json({ msg: 'Internal server error while listing genres.' });
  }
};

/**
 * createGenre
 * Handles POST /genres
 */
const createGenre = async (req = request, res = response) => {
  try {
    const genre = await createNewGenero(req.body);
    res.status(201).json(genre);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Internal server error while creating genre.' });
  }
};

module.exports = {
  listGenres,
  createGenre
};
