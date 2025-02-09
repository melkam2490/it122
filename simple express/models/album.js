import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();  

// Now access the MongoDB URL
const mongoURI = process.env.MONGODB_URL;


mongoose.connect(mongoURI)
  .then(() => {
    console.log(' Database connected successfully!');
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
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
export const Album = mongoose.model('Album', albumSchema);


