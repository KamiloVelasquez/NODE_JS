/* Reglas de negocio, lógica de negocio o lógica de aplicación para el recurso de Género, que se encarga de manejar las solicitudes relacionadas 
con los géneros, como obtener la lista de géneros o crear un nuevo género, y responder con los datos correspondientes o mensajes de error en 
caso de que ocurra algún problema durante el proceso. Estas funciones son utilizadas por las rutas definidas en routers/genero.js para manejar
las solicitudes HTTP relacionadas con los géneros. */

const Genero = require('../models/Genero'); // Importamos el modelo de Género para interactuar con la base de datos
const { request, response } = require('express'); // Importamos request y response de Express para tipar los parámetros de las funciones

const getGeneros = async (req = request, res = response) => { // Función para obtener la lista de géneros, no recibe parámetros y responde con la lista de géneros en formato JSON
    try {
        const generos = await Genero.find(); // Obtenemos todos los géneros de la base de datos
        res.status(200).json(generos); // Respondemos con el estado 200 y la lista de géneros en formato JSON
    } catch (error) { // Si ocurre un error al obtener los géneros, lo capturamos y respondemos con un mensaje de error
        console.error('❌ Error al obtener géneros:', error); // Error al obtener géneros
        res.status(500).json({ msg: 'Ocurrió un error al listar los géneros' }); // Ocurrió un error al listar los géneros
    }
}

const createGenero = async (req = request, res = response) => { // Función para crear un nuevo género, recibe los datos del género en el cuerpo de la solicitud (req.body)
    try {
        const { nombre, descripcion } = req.body; // Desestructuramos el nombre y la descripción del género desde el cuerpo de la solicitud

        const generoDB = await Genero.findOne({ nombre }); // Verificamos si ya existe un género con el mismo nombre en la base de datos
        if (generoDB) { // Si ya existe un género con el mismo nombre, respondemos con un mensaje de error indicando que el género ya existe
            return res.status(400).json({ msg: `El género "${nombre}" ya existe.` }); // El género ya existe
        }

        const genero = new Genero({ nombre, descripcion }); // Creamos una nueva instancia del modelo de Género con el nombre y la descripción proporcionados

        await genero.save(); // Guardamos el nuevo género en la base de datos y respondemos con el estado 201 y el género creado en formato JSON
        res.status(201).json(genero); // Género creado exitosamente

    } catch (error) {
        console.error('❌ Error al crear género:', error); // Error al crear género
        res.status(500).json({ msg: 'Ocurrió un error al guardar el género' }); // Ocurrió un error al guardar el género
    }
}

module.exports = { // Exportamos las funciones getGeneros y createGenero para que puedan ser utilizadas en otras partes de la aplicación, como en las rutas
    getGeneros, // Exportamos la función getGeneros para listar los géneros
    createGenero // Exportamos la función createGenero para crear un nuevo género
}
