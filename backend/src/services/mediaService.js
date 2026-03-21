const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

/**
 * findAllMedias
 * Fetches all media records with populated relations.
 */
const findAllMedias = async () => {
  return await Media.find()
    .populate('genre', 'name')
    .populate('director', 'name')
    .populate('productionCompany', 'name')
    .populate('type', 'name');
};

/**
 * createNewMedia
 * Validates references and saves a new media record.
 */
const createNewMedia = async (mediaData) => {
  const { 
    serialNumber, title, synopsis, url, posterImage, 
    releaseYear, genre, director, productionCompany, type 
  } = mediaData;

  // Validate unique fields
  const existingSerial = await Media.findOne({ serialNumber });
  if (existingSerial) {
    const error = new Error(`Serial number "${serialNumber}" already exists.`);
    error.status = 400;
    throw error;
  }

  const existingUrl = await Media.findOne({ url });
  if (existingUrl) {
    const error = new Error(`URL "${url}" already exists.`);
    error.status = 400;
    throw error;
  }

  // Validate references existence and activity
  const genreDB = await Genero.findById(genre);
  if (!genreDB || !genreDB.isActive) {
    const error = new Error('Selected genre is invalid or inactive.');
    error.status = 400;
    throw error;
  }

  const directorDB = await Director.findById(director);
  if (!directorDB || !directorDB.isActive) {
    const error = new Error('Selected director is invalid or inactive.');
    error.status = 400;
    throw error;
  }

  const companyDB = await Productora.findById(productionCompany);
  if (!companyDB || !companyDB.isActive) {
    const error = new Error('Selected production company is invalid or inactive.');
    error.status = 400;
    throw error;
  }

  const typeDB = await Tipo.findById(type);
  if (!typeDB || !typeDB.isActive) {
    const error = new Error('Selected media type is invalid or inactive.');
    error.status = 400;
    throw error;
  }

  const media = new Media({ 
    serialNumber, title, synopsis, url, posterImage, 
    releaseYear, genre, director, productionCompany, type 
  });
  
  await media.save();
  return media;
};

/**
 * updateMediaById
 * Updates an existing media record by its ID.
 */
const updateMediaById = async (id, mediaData) => {
  const media = await Media.findByIdAndUpdate(id, mediaData, { new: true });
  if (!media) {
    const error = new Error('Media record not found.');
    error.status = 404;
    throw error;
  }
  return media;
};

/**
 * deleteMediaById
 * Deletes a media record by ID.
 */
const deleteMediaById = async (id) => {
  const media = await Media.findByIdAndDelete(id);
  if (!media) {
    const error = new Error('Media record not found.');
    error.status = 404;
    throw error;
  }
  return media;
};

module.exports = {
  findAllMedias,
  createNewMedia,
  updateMediaById,
  deleteMediaById
};
