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
app.use('/api/genres', require('./routes/genre'));
app.use('/api/directors', require('./routes/director'));
app.use('/api/productions', require('./routes/studio'));
app.use('/api/types', require('./routes/mediaType'));
app.use('/api/media', require('./routes/media'));


// Sirviendo el frontend compilado en producción
// app.use(express.static(path.join(__dirname, '../../frontend/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
// });

// Error handling to prevent silent crashes
process.on('uncaughtException', (err) => {
    console.error('❌ CRITICAL UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ CRITICAL UNHANDLED REJECTION:', reason);
});

const startServer = async () => {
    try {
        await getConnection();
        app.listen(PORT, () => {
            console.log(`🟢 servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server due to DB connection error:', error.message);
        // We still listen to allow debugging or showing status, or just exit
        // process.exit(1); 
    }
};

startServer();
