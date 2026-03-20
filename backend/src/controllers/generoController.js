/* Controladores para el recurso de Género. Su única responsabilidad es recibir la petición,
invocar a la capa de servicios donde reside la lógica de negocio, y enviar la respuesta. */

const { request, response } = require('express');
const { getGenerosService, createGeneroService } = require('../services/generoService');

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await getGenerosService(); // Llamamos al servicio para obtener géneros
        res.status(200).json(generos);
    } catch (error) {
        console.error('❌ Error al obtener géneros:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los géneros' });
    }
}

const createGenero = async (req = request, res = response) => {
    try {
        // Llamamos al servicio pasando los datos del cuerpo de la petición
        const genero = await createGeneroService(req.body); 
        res.status(201).json(genero);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ msg: error.message });
        }
        console.error('❌ Error al crear género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al guardar el género' });
    }
}

module.exports = {
    getGeneros,
    createGenero
}
