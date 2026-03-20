const { Router } = require('express'); // Importamos Router de Express para crear las rutas
const { getTipos, createTipo, updateTipo } = require('../controllers/tipoController'); // Importamos las funciones del controlador de tipos

const router = Router(); // Creamos una instancia de Router

// Definimos las rutas para los tipos
router.get('/', getTipos); // Ruta GET para obtener la lista de tipos
router.post('/', createTipo); // Ruta POST para crear un nuevo tipo
router.put('/:id', updateTipo); // Ruta PUT para actualizar un tipo existente por ID

module.exports = router; // Exportamos el router para que pueda ser utilizado en index.js