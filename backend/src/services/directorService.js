const Director = require('../models/Director');

const getDirectorsService = async () => {
    return await Director.find();
};

const getDirectorByIdService = async (id) => {
    const director = await Director.findById(id);
    if (!director) {
        const error = new Error('Director no encontrado.');
        error.status = 404;
        throw error;
    }
    return director;
};

const createDirectorService = async ({ nombres, estado }) => {
    const directorExistente = await Director.findOne({ nombres });
    if (directorExistente) {
        const error = new Error(`El director "${nombres}" ya existe.`);
        error.status = 400;
        throw error;
    }

    const director = new Director({ nombres, estado });
    await director.save();
    return director;
};

const updateDirectorService = async (id, { nombres, estado }) => {
    const director = await Director.findById(id);
    if (!director) {
        const error = new Error('Director no encontrado.');
        error.status = 404;
        throw error;
    }

    director.nombres = nombres || director.nombres;
    director.estado = estado || director.estado;
    director.fechaActualizacion = Date.now();

    await director.save();
    return director;
};

const deleteDirectorService = async (id) => {
    const director = await Director.findByIdAndDelete(id);
    if (!director) {
        const error = new Error('Director no encontrado.');
        error.status = 404;
        throw error;
    }
    return director;
};

module.exports = {
    getDirectorsService,
    getDirectorByIdService,
    createDirectorService,
    updateDirectorService,
    deleteDirectorService
};
