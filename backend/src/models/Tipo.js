const mongoose = require('mongoose');

/**
 * Tipo Schema
 * Defines the structure for media types (e.g., Movie, Series).
 */
const TipoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Type name is required'],
    unique: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tipo', TipoSchema);