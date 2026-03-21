const { request, response } = require('express');
const { validationResult } = require('express-validator'); // Importamos validationResult para manejar errores de validación
const { getDirectorsService, getDirectorByIdService, createDirectorService, updateDirectorService, deleteDirectorService } = require('../services/directorService');

const getDirectors = async (req = request, res = response) => {
    try {
        const directors = await getDirectorsService();
        res.status(200).json(directors);
    } catch (error) {
        console.error('❌ Error al obtener directores:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los directores' });
    }
}

const getDirectorById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const director = await getDirectorByIdService(id);
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
        // Verificar errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
        // Verificar errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const director = await updateDirectorService(id, req.body);
        res.status(200).json(director);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ msg: error.message });
        }
        console.error('❌ Error al actualizar director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el director' });
    }
}

const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const director = await deleteDirectorService(id);
        res.status(200).json({ msg: 'Director eliminado exitosamente' });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ msg: error.message });
        }
        console.error('❌ Error al eliminar director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el director' });
    }
}

module.exports = {
    getDirectors,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
}