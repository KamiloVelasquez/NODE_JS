const Productora = require('../models/Productora');

const getProductorasService = async () => {
    return await Productora.find();
};

const createProductoraService = async ({ nombre, estado, slogan, descripcion }) => {
    const productoraDB = await Productora.findOne({ nombre });
    if (productoraDB) {
        const error = new Error(`La productora "${nombre}" ya existe.`);
        error.status = 400;
        throw error;
    }

    const productora = new Productora({ nombre, estado, slogan, descripcion });
    await productora.save();
    return productora;
};

const updateProductoraService = async (id, { nombre, estado, slogan, descripcion }) => {
    const productora = await Productora.findByIdAndUpdate(id, { nombre, estado, slogan, descripcion }, { new: true });
    if (!productora) {
        const error = new Error('Productora no encontrada');
        error.status = 404;
        throw error;
    }
    return productora;
};

module.exports = {
    getProductorasService,
    createProductoraService,
    updateProductoraService
};
