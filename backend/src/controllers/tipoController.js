const { request, response } = require('express');
const { getTiposService, createTipoService, updateTipoService } = require('../services/tipoService');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await getTiposService();
        res.status(200).json(tipos);
    } catch (error) {
        console.error('❌ Error al obtener tipos:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los tipos' });
    }
}

const createTipo = async (req = request, res = response) => {
    try {
        const tipo = await createTipoService(req.body);
        res.status(201).json(tipo);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ msg: error.message });
        }
        console.error('❌ Error al crear tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al guardar el tipo' });
    }
}

const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await updateTipoService(id, req.body);
        res.status(200).json(tipo);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ msg: error.message });
        }
        console.error('❌ Error al actualizar tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el tipo' });
    }
}

module.exports = {
    getTipos,
    createTipo,
    updateTipo
}