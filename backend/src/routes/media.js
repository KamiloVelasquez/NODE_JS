const { Router } = require('express'); // Importamos Router de Express para crear las rutas
const { getMedias, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController'); // Importamos las funciones del controlador de medias

const router = Router(); // Creamos una instancia de Router

// Definimos las rutas para las medias
router.get('/', getMedias); // Ruta GET para obtener la lista de medias
router.post('/', createMedia); // Ruta POST para crear una nueva media
router.put('/:id', updateMedia); // Ruta PUT para actualizar una media existente por ID
router.delete('/:id', deleteMedia); // Ruta DELETE para eliminar una media existente por ID

module.exports = router; // Exportamos el router para que pueda ser utilizado en index.js