const Director = require('../models/Director');

const getDirectorService = async () => {
    const director = await Director.findOne();
    if (!director) {
        const error = new Error('No se encontró un director registrado.');
        error.status = 404;
        throw error;
    }
    return director;
};

const createDirectorService = async ({ nombres, estado }) => {
    const directorExistente = await Director.findOne();
    if (directorExistente) {
        const error = new Error('Ya existe un director registrado. Use la función de actualización.');
        error.status = 400;
        throw error;
    }

    const director = new Director({ nombres, estado });
    await director.save();
    return director;
};

const updateDirectorService = async ({ nombres, estado }) => {
    const director = await Director.findOne();
    if (!director) {
        const error = new Error('No se encontró un director para actualizar.');
        error.status = 404;
        throw error;
    }

    director.nombres = nombres || director.nombres;
    director.estado = estado || director.estado;
    director.fechaActualizacion = Date.now();

    await director.save();
    return director;
};

module.exports = {
    getDirectorService,
    createDirectorService,
    updateDirectorService
};
