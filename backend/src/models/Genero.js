/* Modelo de datos para el recurso de Género, que define la estructura y las validaciones de los datos relacionados con los géneros en 
la base de datos MongoDB utilizando Mongoose.*/

const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del género es obligatorio'], /* El nombre del género es obligatorio */
        unique: true, /* El nombre del género debe ser único */
        trim: true, /*  Elimina espacios en blanco al inicio y al final */
        minlength: [3, 'El nombre del género debe tener al menos 3 caracteres'], /*  El nombre del género debe tener al menos 3 caracteres */
        maxlength: [50, 'El nombre del género no puede exceder los 50 caracteres'] /*  El nombre del género no puede exceder los 50 caracteres */
    },

    estado:{
        type: String,
        required: true,
        enum: ["Activo", "Inactivo"], /*  El estado del género debe ser "Activo" o "Inactivo" */
        default: "Activo" /*  El estado por defecto es "Activo" */
    },
    descripcion: {
        type: String,
        trim: true, /* Elimina espacios en blanco al inicio y al final */ 
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now /* La fecha de creación se establece automáticamente al crear un nuevo género */
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now /* La fecha de actualización se establece automáticamente al actualizar un género */
    }
}); 

module.exports = mongoose.model('Genero', generoSchema);
