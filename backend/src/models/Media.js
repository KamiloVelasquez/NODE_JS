const mongoose = require('mongoose');

/**
 * Media Schema
 * Defines the structure for cinematic media (movies and series).
 */
const MediaSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: [true, 'Serial number is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Serial must be at least 3 characters'],
    maxlength: [50, 'Serial cannot exceed 50 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  synopsis: {
    type: String,
    trim: true,
    maxlength: [1000, 'Synopsis cannot exceed 1000 characters']
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    unique: true,
    trim: true
  },
  posterImage: {
    type: String,
    trim: true
  },
  releaseYear: {
    type: Number,
    min: [1900, 'Release year must be at least 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: [true, 'Genre is required']
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: [true, 'Director is required']
  },
  productionCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: [true, 'Production company is required']
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MediaType',
    required: [true, 'Media type is required']
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', MediaSchema);