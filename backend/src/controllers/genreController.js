const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { findAllGenres, createNewGenre, updateGenreById, deleteGenreById } = require('../services/genreService');

/**
 * listGenres
 * Handles GET /genres
 */
const listGenres = async (req = request, res = response) => {
  try {
    const genres = await findAllGenres();
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const genre = await createNewGenre(req.body);
    res.status(201).json(genre);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Internal server error while creating genre.' });
  }
};

/**
 * updateGenre
 * Handles PUT /genres/:id
 */
const updateGenre = async (req = request, res = response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const genre = await updateGenreById(id, req.body);
    res.status(200).json(genre);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Internal server error while updating genre.' });
  }
};

/**
 * deleteGenre
 * Handles DELETE /genres/:id
 */
const deleteGenre = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await deleteGenreById(id);
    res.status(200).json({ msg: 'Genre successfully deleted.' });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Internal server error while deleting genre.' });
  }
};

module.exports = {
  listGenres,
  createGenre,
  updateGenre,
  deleteGenre
};
