const Genre = require('../models/Genre');

/**
 * findAllGeneros
 * Service to fetch all genres from the database.
 */
const findAllGenres = async () => {
    return await Genre.find();
};

/**
 * createNewGenero
 * Service to validate and save a new genre.
 * @param {Object} genreData - Includes name and description.
 */
const createNewGenre = async (genreData) => {
    const { name, description } = genreData;
    
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
        const error = new Error(`The genre "${name}" already exists.`);
        error.status = 400;
        throw error;
    }

    const genre = new Genre({ name, description });
    await genre.save();
    return genre;
};

/**
 * updateGenreById
 * Service to modify an existing genre.
 */
const updateGenreById = async (id, genreData) => {
    const genre = await Genre.findByIdAndUpdate(id, genreData, { new: true });
    if (!genre) {
        const error = new Error('Genre not found.');
        error.status = 404;
        throw error;
    }
    return genre;
};

/**
 * deleteGenreById
 * Service to remove a genre record.
 */
const deleteGenreById = async (id) => {
    const genre = await Genre.findByIdAndDelete(id);
    if (!genre) {
        const error = new Error('Genre not found.');
        error.status = 404;
        throw error;
    }
    return genre;
};

module.exports = {
    findAllGenres,
    createNewGenre,
    updateGenreById,
    deleteGenreById
};
