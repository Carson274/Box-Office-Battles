import 'dotenv/config';
import * as movies from './model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// // create a list of previously used movies
// let usedMovies = [];

// retrieve the original movie
app.get('/getOriginalMovie', async (req, res) => {
  // get a random movie
  const movie = await movies.getOriginalMovie()
    .then(movie => {
        res.status(201).json(movie);
        // add the movie to the list of used movies
        usedMovies.push(movie[0].id);

        console.log(usedMovies);
    })
    .catch(error => {
        res.status(400).send({ Error: "Request failed" });
    })
});

// the request body has to contain the following fields: id, revenue
// retrieve another movie, ensuring the revenue is within a certain range
app.post('/getNewMovie', async (req, res) => {
  // check through the passed list of previously used movies to ensure we don't get the same movie
  const usedMovies = req.body.usedMovies;

  // get a random movie
  const movie = await movies.getNewMovie(usedMovies)
    .then(movie => {
        res.status(201).json(movie);

        // add the movie to the list of used movies
        usedMovies.push(movie[0].id);
        console.log(usedMovies);
    })
    .catch(error => {
        res.status(400).send({ Error: "Request failed" });
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
    console.log(`Click me to access the site: http://localhost:${PORT}`);
});