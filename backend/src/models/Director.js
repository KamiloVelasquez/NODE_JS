const mongoose = require('mongoose');

/**
 * Director Schema
 * Defines the structure for directors.
 */
const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Director name is required'],
    trim: true,
    minlength: [3, 'Director name must be at least 3 characters'],
    maxlength: [100, 'Director name cannot exceed 100 characters']
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Director', DirectorSchema);