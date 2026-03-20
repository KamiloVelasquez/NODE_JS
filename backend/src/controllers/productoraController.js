const { request, response } = require('express');
const { getProductorasService, createProductoraService, updateProductoraService } = require('../services/productoraService');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await getProductorasService();
        res.status(200).json(productoras);
    } catch (error) {
        console.error('❌ Error al obtener productoras:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las productoras' });
    }
}

const createProductora = async (req = request, res = response) => {
    try {
        const productora = await createProductoraService(req.body);
        res.status(201).json(productora);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ msg: error.message });
        }
        console.error('❌ Error al crear productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al guardar la productora' });
    }
}

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productora = await updateProductoraService(id, req.body);
        res.status(200).json(productora);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ msg: error.message });
        }
        console.error('❌ Error al actualizar productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la productora' });
    }
}

module.exports = {
    getProductoras,
    createProductora,
    updateProductora
}