const Genero = require('../models/Genero');

// Obtener todos los géneros
const getGenerosService = async () => {
    return await Genero.find();
};

// Crear un nuevo género
const createGeneroService = async ({ nombre, descripcion }) => {
    const generoDB = await Genero.findOne({ nombre });
    if (generoDB) {
        const error = new Error(`El género "${nombre}" ya existe.`);
        error.status = 400;
        throw error;
    }

    const genero = new Genero({ nombre, descripcion });
    await genero.save();
    return genero;
};

module.exports = {
    getGenerosService,
    createGeneroService
};
