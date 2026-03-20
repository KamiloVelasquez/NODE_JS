const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const getMediasService = async () => {
    return await Media.find()
        .populate('genero', 'nombre')
        .populate('director', 'nombres')
        .populate('productora', 'nombre')
        .populate('tipo', 'nombre');
};

const createMediaService = async (data) => {
    const { serial, titulo, sinopsis, url, imagenPortada, anoEstreno, genero, director, productora, tipo } = data;

    // Validar serial único
    const mediaSerial = await Media.findOne({ serial });
    if (mediaSerial) {
        const error = new Error(`El serial "${serial}" ya existe.`);
        error.status = 400;
        throw error;
    }

    // Validar URL única
    const mediaUrl = await Media.findOne({ url });
    if (mediaUrl) {
        const error = new Error(`La URL "${url}" ya existe.`);
        error.status = 400;
        throw error;
    }

    // Validar referencias
    const generoDB = await Genero.findById(genero);
    if (!generoDB || generoDB.estado !== 'Activo') {
        const error = new Error('El género seleccionado no existe o no está activo.');
        error.status = 400;
        throw error;
    }

    const directorDB = await Director.findById(director);
    if (!directorDB || directorDB.estado !== 'Activo') {
        const error = new Error('El director seleccionado no existe o no está activo.');
        error.status = 400;
        throw error;
    }

    const productoraDB = await Productora.findById(productora);
    if (!productoraDB || productoraDB.estado !== 'Activo') {
        const error = new Error('La productora seleccionada no existe o no está activa.');
        error.status = 400;
        throw error;
    }

    const tipoDB = await Tipo.findById(tipo);
    if (!tipoDB) {
        const error = new Error('El tipo seleccionado no existe.');
        error.status = 400;
        throw error;
    }

    const media = new Media({ serial, titulo, sinopsis, url, imagenPortada, anoEstreno, genero, director, productora, tipo });
    await media.save();
    return media;
};

const updateMediaService = async (id, data) => {
    const { serial, titulo, sinopsis, url, imagenPortada, anoEstreno, genero, director, productora, tipo } = data;

    if (serial) {
        const mediaSerial = await Media.findOne({ serial, _id: { $ne: id } });
        if (mediaSerial) {
            const error = new Error(`El serial "${serial}" ya existe.`);
            error.status = 400;
            throw error;
        }
    }
    if (url) {
        const mediaUrl = await Media.findOne({ url, _id: { $ne: id } });
        if (mediaUrl) {
            const error = new Error(`La URL "${url}" ya existe.`);
            error.status = 400;
            throw error;
        }
    }

    if (genero) {
        const generoDB = await Genero.findById(genero);
        if (!generoDB || generoDB.estado !== 'Activo') {
            const error = new Error('El género seleccionado no existe o no está activo.');
            error.status = 400;
            throw error;
        }
    }

    if (director) {
        const directorDB = await Director.findById(director);
        if (!directorDB || directorDB.estado !== 'Activo') {
            const error = new Error('El director seleccionado no existe o no está activo.');
            error.status = 400;
            throw error;
        }
    }

    if (productora) {
        const productoraDB = await Productora.findById(productora);
        if (!productoraDB || productoraDB.estado !== 'Activo') {
            const error = new Error('La productora seleccionada no existe o no está activa.');
            error.status = 400;
            throw error;
        }
    }

    if (tipo) {
        const tipoDB = await Tipo.findById(tipo);
        if (!tipoDB) {
            const error = new Error('El tipo seleccionado no existe.');
            error.status = 400;
            throw error;
        }
    }

    const media = await Media.findByIdAndUpdate(id, { serial, titulo, sinopsis, url, imagenPortada, anoEstreno, genero, director, productora, tipo }, { new: true });
    if (!media) {
        const error = new Error('Media no encontrada');
        error.status = 404;
        throw error;
    }
    return media;
};

const deleteMediaService = async (id) => {
    const media = await Media.findByIdAndDelete(id);
    if (!media) {
        const error = new Error('Media no encontrada');
        error.status = 404;
        throw error;
    }
    return media;
};

module.exports = {
    getMediasService,
    createMediaService,
    updateMediaService,
    deleteMediaService
};
