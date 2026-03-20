const {Router} = require('express'); // Importamos el Router de Express para definir las rutas del recurso de Género

const { getGeneros, createGenero } = require('../controllers/generoController'); // Importamos las funciones del controlador de Género para manejar las solicitudes

const router = Router(); // Creamos una instancia del Router de Express, que nos permitirá definir las rutas para el recurso de Género, y luego exportarla para que pueda ser utilizada en el archivo principal de la aplicación (index.js)

router.get('/', getGeneros); // Definimos la ruta para obtener la lista de géneros
router.post('/', createGenero); // Definimos la ruta para crear un nuevo género

module.exports = router; // Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación

