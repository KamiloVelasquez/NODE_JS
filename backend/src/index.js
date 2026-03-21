const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');

const { getConnection } = require('./config/db-connection-mongo');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/* --- rutas --- */
app.use('/api/auth', require('./routes/auth')); // Rutas de autenticación
app.use('/api/generos', require('./routes/genero')); // Ruta para el recurso de Género, que se encarga de manejar las solicitudes relacionadas con los géneros, como obtener la lista de géneros o crear un nuevo género
app.use('/api/directores', require('./routes/director')); // Ruta para el recurso de Director, que se encarga de manejar las solicitudes relacionadas con el director principal, como obtener, crear o editar el director
app.use('/api/productoras', require('./routes/productora')); // Ruta para el recurso de Productora, que se encarga de manejar las solicitudes relacionadas con la productora principal, como obtener, crear o editar la productora
app.use('/api/tipos', require('./routes/tipo')); // Ruta para el recurso de Tipo, que se encarga de manejar las solicitudes relacionadas con los tipos de multimedia, como obtener, crear o editar los tipos
app.use('/api/medias', require('./routes/media')); // Ruta para el recurso de Media, que se encarga de manejar las solicitudes relacionadas con las producciones (películas y series), como obtener, crear, editar o eliminar las medias


// Sirviendo el frontend compilado en producción
// app.use(express.static(path.join(__dirname, '../../frontend/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
// });

getConnection();

app.listen(PORT, () => {
    console.log(`🟢 servidor corriendo en el puerto ${PORT}`);
});
