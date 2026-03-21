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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/genres', require('./routes/genero'));
app.use('/api/directors', require('./routes/director'));
app.use('/api/productions', require('./routes/productora'));
app.use('/api/types', require('./routes/tipo'));
app.use('/api/media', require('./routes/media'));


// Sirviendo el frontend compilado en producción
// app.use(express.static(path.join(__dirname, '../../frontend/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
// });

getConnection();

app.listen(PORT, () => {
    console.log(`🟢 servidor corriendo en el puerto ${PORT}`);
});
