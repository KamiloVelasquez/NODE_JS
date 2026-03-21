const Studio = require('../models/Studio');

/**
 * findAllProductionCompanies
 * Fetches all production companies from DB.
 */
const findAllStudios = async () => {
    return await Studio.find();
};

/**
 * createNewProductionCompany
 * Validates and saves a new company.
 */
const createNewStudio = async (companyData) => {
    const { name, slogan, description, isActive } = companyData;
    const existingCompany = await Studio.findOne({ name });
    if (existingCompany) {
        const error = new Error(`Production company "${name}" already exists.`);
        error.status = 400;
        throw error;
    }

    const company = new Studio({ name, slogan, description, isActive });
    await company.save();
    return company;
};

/**
 * updateProductionCompanyById
 * Updates company fields by ID.
 */
const updateStudioById = async (id, companyData) => {
    const company = await Studio.findByIdAndUpdate(id, companyData, { new: true });
    if (!company) {
        const error = new Error('Production company not found.');
        error.status = 404;
        throw error;
    }
    return company;
};

/**
 * deleteStudioById
 * Removes a production company from DB.
 */
const deleteStudioById = async (id) => {
    const company = await Studio.findByIdAndDelete(id);
    if (!company) {
        const error = new Error('Production company not found.');
        error.status = 404;
        throw error;
    }
    return company;
};

module.exports = {
    findAllStudios,
    createNewStudio,
    updateStudioById,
    deleteStudioById
};
