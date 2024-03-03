import 'dotenv/config';
import * as movies from './model.mjs';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors());

// default route
app.get('/', (req, res) => {
    res.send('API is running!');
});

// retrieve the original movie
app.get('/getOriginalMovie', async (req, res) => {
  // get a random movie
  const movie = await movies.getOriginalMovie()
    .then(movie => {
        // add the movie to the list of used movies
        res.status(201).json(movie[0]);
    })
    .catch(error => {
        res.status(400).json({ Error: "Request failed" });
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
        res.status(201).json(movie[0]);
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({ Error: "Request failed" });
    })
});

// request body needs to contain the following fields: username, score
// Gets all scores from the database
app.get('/scores', async (req, res) => {
    scores.getScores()
        .then(scores => {
            res.status(201).json(scores);
        })
        .catch(error => {
            res.status(400).json({ Error: "Request failed" });
        })
});

// request body needs to contain the following fields: username, score
// Adds a score to the database
app.post('/scores', async (req, res) => {
    const username = req.body.username;
    const score = req.body.score;
    scores.addScore(username, score)
        .then(score => {
            res.status(201).json(score);
        })
        .catch(error => {
            res.status(400).json({ Error: "Request failed" });
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
    console.log(`Click me to access the site: http://localhost:${PORT}`);
});