const Director = require('../models/Director');

/**
 * findAllDirectors
 * Fetches all directors from DB.
 */
const findAllDirectors = async () => {
    return await Director.find();
};

/**
 * findDirectorById
 * Fetches a single director by ID.
 */
const findDirectorById = async (id) => {
    const director = await Director.findById(id);
    if (!director) {
        const error = new Error('Director not found.');
        error.status = 404;
        throw error;
    }
    return director;
};

/**
 * createNewDirector
 * Validates and saves a new director.
 */
const createNewDirector = async (directorData) => {
    const { name, isActive } = directorData;
    const existingDirector = await Director.findOne({ name });
    
    if (existingDirector) {
        const error = new Error(`Director with name "${name}" already exists.`);
        error.status = 400;
        throw error;
    }

    const director = new Director({ name, isActive });
    await director.save();
    return director;
};

/**
 * updateDirectorById
 * Updates director fields by ID.
 */
const updateDirectorById = async (id, directorData) => {
    const director = await Director.findByIdAndUpdate(id, directorData, { new: true });
    if (!director) {
        const error = new Error('Director not found.');
        error.status = 404;
        throw error;
    }
    return director;
};

/**
 * deleteDirectorById
 * Removes a director by ID.
 */
const deleteDirectorById = async (id) => {
    const director = await Director.findByIdAndDelete(id);
    if (!director) {
        const error = new Error('Director not found.');
        error.status = 404;
        throw error;
    }
    return director;
};

module.exports = {
    findAllDirectors,
    findDirectorById,
    createNewDirector,
    updateDirectorById,
    deleteDirectorById
};
