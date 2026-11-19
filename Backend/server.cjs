 // Import Express
const express = require('express');

// Create an Express application
const app = express()

// Set the port number
const port = 4000

// Import CORS to allow requests from other applications
const cors = require('cors');
app.use(cors());

// Import body-parser to read incoming data
const bodyParser = require('body-parser');

// Allow the server to read form data
app.use(bodyParser.urlencoded({ extended: true }));

// Allow the server to read JSON data
app.use(bodyParser.json());

// Import Mongoose to connect to MongoDB
const mongoose = require('mongoose');

// Connect to the MoviesDB database
mongoose.connect('mongodb+srv://admin:admin@cluster0.ioguzcz.mongodb.net/MoviesDB');

// Create a schema to define the movie details
const movieSchema = new mongoose.Schema({
  title: String,  // Movie title
  year: String,   // Movie release year
  poster: String  // Movie poster URL
});

// Create a model for the movie collection
const MovieModel = mongoose.model('myMovie', movieSchema);

// Middleware to allow requests from different origins
app.use(function(req, res, next) {

  // Allow requests from any website
  res.header("Access-Control-Allow-Origin", "*");

  // Allow GET, POST, PUT, DELETE and OPTIONS requests
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Allow these headers in requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Continue to the next function
  next();
});

// POST route to add a new movie
app.post('/api/movies', async (req, res)=>{

  // Display the received data in the console
  console.log(req.body);

  // Get the movie details from the request
  const { title, year, poster } = req.body;

  // Create a new movie using the received details
  const newMovie = new MovieModel({ title, year, poster });

  // Save the new movie to MongoDB
  await newMovie.save();

  // Send a success message and the new movie
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

// GET route to retrieve all movies
app.get('/api/movies', async (req, res) => {

  // Find all movies in the database
  const movies = await Movie.find({});

  // Send the movies as JSON
  res.json(movies);
});

// GET route to retrieve a specific movie by its ID
app.get('/api/movie/:id', async (req, res) => {

  // Find a movie using the ID from the URL
  const movie = await Movie.findById(req.params.id);

  // Send the movie back to the user
  res.send(movie);
});

// Start the server
app.listen(port, () => {

  // Display a message when the server is running
  console.log(`Example app listening on port ${port}`)
})
