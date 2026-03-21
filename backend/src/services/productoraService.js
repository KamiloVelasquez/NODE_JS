const Productora = require('../models/Productora');

/**
 * findAllProductionCompanies
 * Fetches all production companies from DB.
 */
const findAllProductionCompanies = async () => {
    return await Productora.find();
};

/**
 * createNewProductionCompany
 * Validates and saves a new company.
 */
const createNewProductionCompany = async (companyData) => {
    const { name, slogan, description, isActive } = companyData;
    const existingCompany = await Productora.findOne({ name });
    if (existingCompany) {
        const error = new Error(`Production company "${name}" already exists.`);
        error.status = 400;
        throw error;
    }

    const company = new Productora({ name, slogan, description, isActive });
    await company.save();
    return company;
};

/**
 * updateProductionCompanyById
 * Updates company fields by ID.
 */
const updateProductionCompanyById = async (id, companyData) => {
    const company = await Productora.findByIdAndUpdate(id, companyData, { new: true });
    if (!company) {
        const error = new Error('Production company not found.');
        error.status = 404;
        throw error;
    }
    return company;
};

module.exports = {
    findAllProductionCompanies,
    createNewProductionCompany,
    updateProductionCompanyById
};
