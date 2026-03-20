const { Router } = require('express'); // Importamos el Router de Express para definir las rutas del recurso de Director

const { getDirector, createDirector, updateDirector } = require('../controllers/directorController'); // Importamos las funciones del controlador de Director para manejar las solicitudes

const router = Router(); // Creamos una instancia del Router de Express, que nos permitirá definir las rutas para el recurso de Director, y luego exportarla para que pueda ser utilizada en el archivo principal de la aplicación (index.js)

router.get('/', getDirector); // Definimos la ruta para obtener el director
router.post('/', createDirector); // Definimos la ruta para crear un nuevo director
router.put('/', updateDirector); // Definimos la ruta para actualizar el director

module.exports = router; // Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación