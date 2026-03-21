const { Router } = require('express'); // Importamos el Router de Express para definir las rutas del recurso de Director
const { body } = require('express-validator'); // Importamos validadores de express-validator
const { auth, adminOnly } = require('../middlewares/auth'); // Importamos middlewares de autenticación

const { getDirectors, getDirectorById, createDirector, updateDirector, deleteDirector } = require('../controllers/directorController'); // Importamos las funciones del controlador de Director para manejar las solicitudes

const router = Router(); // Creamos una instancia del Router de Express, que nos permitirá definir las rutas para el recurso de Director, y luego exportarla para que pueda ser utilizada en el archivo principal de la aplicación (index.js)

// Validaciones para crear director
const createDirectorValidation = [
    body('nombres').isLength({ min: 3 }).withMessage('Los nombres deben tener al menos 3 caracteres'),
    body('estado').isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser Activo o Inactivo')
];

// Validaciones para actualizar director
const updateDirectorValidation = [
    body('nombres').optional().isLength({ min: 3 }).withMessage('Los nombres deben tener al menos 3 caracteres'),
    body('estado').optional().isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser Activo o Inactivo')
];

router.get('/', getDirectors); // Definimos la ruta para obtener la lista de directores
router.get('/:id', getDirectorById); // Definimos la ruta para obtener un director por ID
router.post('/', auth, adminOnly, createDirectorValidation, createDirector); // Definimos la ruta para crear un nuevo director con validación y auth
router.put('/:id', auth, adminOnly, updateDirectorValidation, updateDirector); // Definimos la ruta para actualizar un director por ID con validación y auth
router.delete('/:id', auth, adminOnly, deleteDirector); // Definimos la ruta para eliminar un director por ID con auth

module.exports = router; // Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación