import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('The database is connected!');
  
  })
  .catch((error) => {
    console.error("Database connection failed:", error);  // Log detailed error
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


