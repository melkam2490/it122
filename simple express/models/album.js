const mongoose = require('mongoose');

// Define the schema for the product
const albumSchema = mongoose.Schema({
  artist: {
    type: String,
    required: [true, "Please enter the product name"],
  },
  title: {
    type: String,
    required: true,
    default: 0,
  },
  releaseYear: {
    type: Number,
    required: true,
    default: 0,
  },
  
  Image: {
    type: String,
    required: false,
  },
}, { timestamps: true }); // Correct placement of timestamps option

// Create a model from the schema
const album = mongoose.model('album', albumSchema);

module.exports = album;
