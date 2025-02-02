const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Album = require("./modles/Album_produc");  
// const view =require ("./Data.js")
const path = require('path');
const { error } = require('console');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");


app.get('/', async (req, res) => {
  try {
    const albums = await Album.find({}); // Fetch all albums from the database
    res.render('home', { albums });  // Pass albums to the view
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/detail', async (req, res) => {
  try {
    const album = await Album.findOne({ title: req.query.title }); // Find the album by title
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.render("details", { result: album });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API To get all albums
app.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find({});  // Find  all albums
    res.status(200).json(albums);  // Return all albums as a response
  } catch (error) {
    console.error('Error fetching albums:', error);  // Log error for debugging
    res.status(500).json({ message: error.message });  // Send error message if something goes wrong
  }
});

// To get one album by ID
app.get('/api/albums/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Destructure the ID from the URL parameters
    const album = await Album.findById(id);  // Find the album by its ID

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });  // Return 404 if album doesn't exist
    }

    res.status(200).json(album);  // Send the found album as a response
  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    res.status(500).json({ message: error.message });  // Send the error message if something goes wrong
  }
});



// To add one album (POST request for creating an album)
app.post('/api/albums', async (req, res) => {
  try {
    const album = await Album.create(req.body);  // Create a new album from the request body
    res.status(200).json(album);  // Send the created album as a response
  } catch (error) {
    console.error('Error creating album:', error);  // Log error for debugging
    res.status(500).json({ message: error.message });  // Send error message if something goes wrong
  }
});

app.put('/api/album/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Update the album using findByIdAndUpdate
    const album = await Album.findByIdAndUpdate(id, req.body, { new: true });

    // If no album is found
    if (!album) {
      return res.status(404).json({ message: "The album not found!" });
    }

    // Return the updated album
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete('/api/album/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id); // Corrected the method here
    if (!album) {
      return res.status(404).json({ message: "The album not found" });
    }
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Database connection and server setup
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://melkam9024:NathanBarkon@backend.afha5.mongodb.net/?retryWrites=true&w=majority&appName=backend')
  .then(() => {
    console.log('The database is connected!');
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);  // Log detailed error
  });
