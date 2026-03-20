const { request, response } = require('express');
const { getDirectorService, createDirectorService, updateDirectorService } = require('../services/directorService');

const getDirector = async (req = request, res = response) => {
    try {
        const director = await getDirectorService();
        res.status(200).json(director);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ msg: error.message });
        }
        console.error('❌ Error al obtener director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el director' });
    }
}

const createDirector = async (req = request, res = response) => {
    try {
        const director = await createDirectorService(req.body);
        res.status(201).json(director);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ msg: error.message });
        }
        console.error('❌ Error al crear director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al guardar el director' });
    }
}

const updateDirector = async (req = request, res = response) => {
    try {
        const director = await updateDirectorService(req.body);
        res.status(200).json(director);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ msg: error.message });
        }
        console.error('❌ Error al actualizar director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el director' });
    }
}

module.exports = {
    getDirector,
    createDirector,
    updateDirector
}