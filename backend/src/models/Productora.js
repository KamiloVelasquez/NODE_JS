const mongoose = require('mongoose');

/**
 * Productora Schema
 * Defines the structure for production companies.
 */
const ProductoraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Production company name is required'],
    unique: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  slogan: {
    type: String,
    required: [true, 'Slogan is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Productora', ProductoraSchema);