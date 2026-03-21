const Genero = require('../models/Genero');

/**
 * findAllGeneros
 * Service to fetch all genres from the database.
 */
const findAllGeneros = async () => {
    return await Genero.find();
};

/**
 * createNewGenero
 * Service to validate and save a new genre.
 * @param {Object} genreData - Includes name and description.
 */
const createNewGenero = async (genreData) => {
    const { name, description } = genreData;
    
    const existingGenre = await Genero.findOne({ name });
    if (existingGenre) {
        const error = new Error(`The genre "${name}" already exists.`);
        error.status = 400;
        throw error;
    }

    const genre = new Genero({ name, description });
    await genre.save();
    return genre;
};

module.exports = {
    findAllGeneros,
    createNewGenero
};
