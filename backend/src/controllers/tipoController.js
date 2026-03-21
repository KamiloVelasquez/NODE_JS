const { request, response } = require('express');
const { findAllTypes, createNewType, updateTypeById } = require('../services/tipoService');

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
    const mediaType = await createNewType(req.body);
    res.status(201).json(mediaType);
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

module.exports = {
  listMediaTypes,
  createMediaType,
  updateMediaType
};