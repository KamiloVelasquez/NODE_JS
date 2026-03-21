/* Modelo de datos para el recurso de Media, que define la estructura y las validaciones de los datos relacionados con las medias (películas y series) 
en la base de datos MongoDB utilizando Mongoose.*/

const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: true,
        trim: true,
        minlength: [3, 'El serial debe tener al menos 3 caracteres'],
        maxlength: [50, 'El serial no puede exceder los 50 caracteres']
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [200, 'El título no puede exceder los 200 caracteres']
    },
    sinopsis: {
        type: String,
        trim: true,
        maxlength: [1000, 'La sinopsis no puede exceder los 1000 caracteres']
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true,
        trim: true
    },
    imagenPortada: {
        type: String,
        trim: true
    },
    anoEstreno: {
        type: Number,
        min: [1900, 'El año de estreno debe ser mínimo 1900'],
        max: [new Date().getFullYear(), 'El año no puede ser mayor al año actual']
    },
    genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: [true, 'El género es obligatorio']
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: [true, 'El director es obligatorio']
    },
    productora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productora',
        required: [true, 'La productora es obligatoria']
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tipo',
        required: [true, 'El tipo es obligatorio']
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
        default: Date.now
    }
});

module.exports = mongoose.model('Media', mediaSchema);