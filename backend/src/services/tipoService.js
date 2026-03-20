const Tipo = require('../models/Tipo');

const getTiposService = async () => {
    return await Tipo.find();
};

const createTipoService = async ({ nombre, descripcion }) => {
    const tipoDB = await Tipo.findOne({ nombre });
    if (tipoDB) {
        const error = new Error(`El tipo "${nombre}" ya existe.`);
        error.status = 400;
        throw error;
    }

    const tipo = new Tipo({ nombre, descripcion });
    await tipo.save();
    return tipo;
};

const updateTipoService = async (id, { nombre, descripcion }) => {
    const tipo = await Tipo.findByIdAndUpdate(id, { nombre, descripcion }, { new: true });
    if (!tipo) {
        const error = new Error('Tipo no encontrado');
        error.status = 404;
        throw error;
    }
    return tipo;
};

module.exports = {
    getTiposService,
    createTipoService,
    updateTipoService
};
