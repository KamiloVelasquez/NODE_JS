const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');

const { getConnection } = require('../backend/src/config/db-connection-mongo');

const app = express();

app.use(cors());
app.use(express.json());

/* --- rutas --- */
app.use('/api/auth', require('../backend/src/routes/auth'));
app.use('/api/genres', require('../backend/src/routes/genre'));
app.use('/api/directors', require('../backend/src/routes/director'));
app.use('/api/productions', require('../backend/src/routes/studio'));
app.use('/api/types', require('../backend/src/routes/mediaType'));
app.use('/api/media', require('../backend/src/routes/media'));

// Error handling
process.on('uncaughtException', (err) => {
    console.error('❌ CRITICAL UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ CRITICAL UNHANDLED REJECTION:', reason);
});

let dbConnected = false;

const ensureDBConnection = async () => {
    if (!dbConnected) {
        try {
            await getConnection();
            dbConnected = true;
        } catch (error) {
            console.error('❌ DB connection error:', error.message);
        }
    }
};

module.exports = async (req, res) => {
    await ensureDBConnection();
    app(req, res);
};
