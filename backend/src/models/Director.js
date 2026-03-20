/* Modelo de datos para el recurso de Director, que define la estructura y las validaciones de los datos relacionados con los directores en 
la base de datos MongoDB utilizando Mongoose.*/

const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres del director son obligatorios'],
        trim: true,
        minlength: [3, 'Los nombres del director deben tener al menos 3 caracteres'],
        maxlength: [100, 'Los nombres del director no pueden exceder los 100 caracteres']
    },
    estado: {
        type: String,
        required: true,
        enum: ["Activo", "Inactivo"],
        default: "Activo"
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Director', directorSchema);