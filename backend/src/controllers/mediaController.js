const { request, response } = require('express');
const { getMediasService, createMediaService, updateMediaService, deleteMediaService } = require('../services/mediaService');

const getMedias = async (req = request, res = response) => {
    try {
        const medias = await getMediasService();
        res.status(200).json(medias);
    } catch (error) {
        console.error('❌ Error al obtener medias:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las medias' });
    }
}

const createMedia = async (req = request, res = response) => {
    try {
        const media = await createMediaService(req.body);
        res.status(201).json(media);
    } catch (error) {
        if (error.status === 400 || error.status === 404) {
            return res.status(error.status).json({ msg: error.message });
        }
        console.error('❌ Error al crear media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al guardar la media' });
    }
}

const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const media = await updateMediaService(id, req.body);
        res.status(200).json(media);
    } catch (error) {
        if (error.status === 400 || error.status === 404) {
            return res.status(error.status).json({ msg: error.message });
        }
        console.error('❌ Error al actualizar media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la media' });
    }
}

const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const media = await deleteMediaService(id);
        res.status(200).json({ msg: 'Media eliminada exitosamente' });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ msg: error.message });
        }
        console.error('❌ Error al eliminar media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar la media' });
    }
}

module.exports = {
    getMedias,
    createMedia,
    updateMedia,
    deleteMedia
}