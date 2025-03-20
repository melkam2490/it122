import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Album } from './models/Album.js';  // Make sure to adjust if this file is also in JS
import data from './data.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the static folder
app.use(express.static('./public'));  // Set location for static files
app.set('view engine', 'ejs');

// Home route
app.get("/", (req: Request, res: Response) => {
  const albums = [
    { title: "Abbey Road", artist: "The Beatles", releaseYear: 1969 },
    { title: "The Dark Side of the Moon", artist: "Pink Floyd", releaseYear: 1973 },
    { title: "Back in Black", artist: "AC/DC", releaseYear: 1980 },
    { title: "Thriller", artist: "Michael Jackson", releaseYear: 1982 }
  ];
  res.render('home', { albums: JSON.stringify(albums) });
});

// Details route
app.get('/details', async (req: Request, res: Response) => {
  try {
    const album = await Album.findOne({ title: req.query.title });  // Find album by title
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.render('details', { result: album });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// API to get all albums
app.get('/api/albums', async (req: Request, res: Response) => {
  try {
    const albums = await Album.find({});  // Find all albums
    res.status(200).json(albums);  // Return all albums as a response
  } catch (error) {
    console.error('Error fetching albums:', error);  // Log error for debugging
    res.status(500).json({ message: (error as Error).message });  // Send error message if something goes wrong
  }
});

// To get one album by ID
app.get('/api/albums/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;  // Destructure the ID from the URL parameters
    const album = await Album.findById(id);  // Find the album by its ID

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });  // Return 404 if album doesn't exist
    }

    res.status(200).json(album);  // Send the found album as a response
  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    res.status(500).json({ message: (error as Error).message });  // Send the error message if something goes wrong
  }
});

// To add one album (POST request for creating an album)
app.post('/api/albums', async (req: Request, res: Response) => {
  try {
    const album = await Album.create(req.body);  // Create a new album from the request body
    res.status(200).json(album);  // Send the created album as a response
  } catch (error) {
    console.error('Error creating album:', error);  // Log error for debugging
    res.status(500).json({ message: (error as Error).message });  // Send error message if something goes wrong
  }
});

// Update an album
app.put('/api/album/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const album = await Album.findByIdAndUpdate(id, req.body, { new: true });

    if (!album) {
      return res.status(404).json({ message: 'The album not found!' });
    }

    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Delete an album
app.delete('/api/album/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).json({ message: 'The album not found' });
    }

    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Database connection and server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
