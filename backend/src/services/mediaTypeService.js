const MediaType = require('../models/MediaType');

/**
 * findAllTypes
 * Fetches all media types.
 */
const findAllTypes = async () => {
    return await MediaType.find();
};

/**
 * createNewType
 * Saves a new media type.
 */
const createNewType = async (typeData) => {
    const { name, description, isActive } = typeData;
    const existingType = await MediaType.findOne({ name });
    if (existingType) {
        const error = new Error(`Type "${name}" already exists.`);
        error.status = 400;
        throw error;
    }

    const type = new MediaType({ name, description, isActive });
    await type.save();
    return type;
};

/**
 * updateTypeById
 * Updates type fields by ID.
 */
const updateTypeById = async (id, typeData) => {
    const type = await MediaType.findByIdAndUpdate(id, typeData, { new: true });
    if (!type) {
        const error = new Error('Media type not found.');
        error.status = 404;
        throw error;
    }
    return type;
};

/**
 * deleteTypeById
 * Removes a media type record.
 */
const deleteTypeById = async (id) => {
    const type = await MediaType.findByIdAndDelete(id);
    if (!type) {
        const error = new Error('Media type not found.');
        error.status = 404;
        throw error;
    }
    return type;
};

module.exports = {
    findAllTypes,
    createNewType,
    updateTypeById,
    deleteTypeById
};
