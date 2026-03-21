const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { 
  findAllMedias, createNewMedia, updateMediaById, deleteMediaById 
} = require('../services/mediaService');

/**
 * listMedias
 * Handles GET request to list all media records.
 */
const listMedias = async (req = request, res = response) => {
  try {
    const medias = await findAllMedias();
    res.status(200).json(medias);
  } catch (error) {
    console.error('❌ Error fetching medias:', error);
    res.status(500).json({ msg: 'Internal server error while listing media.' });
  }
};

/**
 * createMedia
 * Handles POST request to add a new media title.
 */
const createMedia = async (req = request, res = response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const media = await createNewMedia(req.body);
    res.status(201).json(media);
  } catch (error) {
    if (error.status === 400 || error.status === 404) {
      return res.status(error.status).json({ msg: error.message });
    }
    console.error('❌ Error creating media:', error);
    res.status(500).json({ msg: 'Internal server error while saving media.' });
  }
};

/**
 * updateMedia
 * Handles PUT request to modify an existing media by ID.
 */
const updateMedia = async (req = request, res = response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const media = await updateMediaById(id, req.body);
    res.status(200).json(media);
  } catch (error) {
    if (error.status === 400 || error.status === 404) {
      return res.status(error.status).json({ msg: error.message });
    }
    console.error('❌ Error updating media:', error);
    res.status(500).json({ msg: 'Internal server error while updating media.' });
  }
};

/**
 * deleteMedia
 * Handles DELETE request to remove a media record.
 */
const deleteMedia = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await deleteMediaById(id);
    res.status(200).json({ msg: 'Media record successfully deleted.' });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    console.error('❌ Error deleting media:', error);
    res.status(500).json({ msg: 'Internal server error while deleting media.' });
  }
};

module.exports = {
  listMedias,
  createMedia,
  updateMedia,
  deleteMedia
};