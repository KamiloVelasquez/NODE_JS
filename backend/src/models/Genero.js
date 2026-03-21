const mongoose = require('mongoose');

/**
 * Genero Schema
 * Defines the structure for movie genres in MongoDB.
 */
const GeneroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Genre name is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Genre name must be at least 3 characters'],
    maxlength: [50, 'Genre name cannot exceed 50 characters']
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Genero', GeneroSchema);
