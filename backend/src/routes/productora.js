const { Router } = require('express'); // Importamos Router de Express para crear las rutas
const { getProductoras, createProductora, updateProductora } = require('../controllers/productoraController'); // Importamos las funciones del controlador de productoras

const router = Router(); // Creamos una instancia de Router

// Definimos las rutas para las productoras
router.get('/', getProductoras); // Ruta GET para obtener la lista de productoras
router.post('/', createProductora); // Ruta POST para crear una nueva productora
router.put('/:id', updateProductora); // Ruta PUT para actualizar una productora existente por ID

module.exports = router; // Exportamos el router para que pueda ser utilizado en index.js