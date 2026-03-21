const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { findAllTypes, createNewType, updateTypeById, deleteTypeById } = require('../services/mediaTypeService');

/**
 * listMediaTypes
 * GET /media-types
 */
const listMediaTypes = async (req = request, res = response) => {
  try {
    const types = await findAllTypes();
    res.status(200).json(types);
  } catch (error) {
    console.error('❌ Error listing media types:', error);
    res.status(500).json({ msg: 'Internal server error while listing media types.' });
  }
};

/**
 * createMediaType
 * POST /media-types
 */
const createMediaType = async (req = request, res = response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const type = await createNewType(req.body);
    res.status(201).json(type);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Internal server error while creating media type.' });
  }
};

/**
 * updateMediaType
 * PUT /media-types/:id
 */
const updateMediaType = async (req = request, res = response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const mediaType = await updateTypeById(id, req.body);
    res.status(200).json(mediaType);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Internal server error while updating media type.' });
  }
};

/**
 * deleteMediaType
 * DELETE /media-types/:id
 */
const deleteMediaType = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await deleteTypeById(id);
    res.status(200).json({ msg: 'Media type successfully deleted.' });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Internal server error while deleting media type.' });
  }
};

module.exports = {
  listMediaTypes,
  createMediaType,
  updateMediaType,
  deleteMediaType
};