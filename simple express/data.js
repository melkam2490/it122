// Mock data for albums
const albums = [
  {
    title: "Abbey Road",
    artist: "The Beatles",
    releaseYear: 1969
  },
  {
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    releaseYear: 1973
  },
  {
    title: "Back in Black",
    artist: "AC/DC",
    releaseYear: 1980
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    releaseYear: 1982
  }
];

// Function to get all albums
function getAll() {
  return albums;
}

// Function to get an album by title
function getItem(title) {
  return albums.find(album => album.title === title);
}

// Function to delete an album by title
function deleteAlbum(title) {
  const index = albums.findIndex(album => album.title === title);
  if (index !== -1) {
    const deletedAlbum = albums.splice(index, 1); // Delete the album
    return deletedAlbum[0]; // Return the deleted album
  }
  return null; // Return null if album not found
}

// Default export of functions
export default {
  getAll,
  getItem,
  deleteAlbum
};
