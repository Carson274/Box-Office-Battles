import 'dotenv/config';
import * as movies from './model.mjs';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

const key = fs.readFileSync('private.key');
const cert = fs.readFileSync('certificate.crt');

const cred = {
    key,
    cert
}

const PORT = process.env.PORT;

const app = express();

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
        console.log(error);
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
        res.status(400).json({ Error: "Request failed" });
    })
});

// request body needs to contain the following fields: username, score
// Gets all scores from the database
app.get('/scores', async (req, res) => {
    movies.getScores()
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
    console.log(req.body)
    const username = req.body.name;
    const score = req.body.score;
    movies.addScore(username, score)
        .then(score => {
            res.status(201).json(score);
        })
        .catch(error => {
            res.status(400).json({ Error: "Request failed" });
        })
});

// app.get('/.well-known/pki-validation/2D7F90C6E0CC72C6F06BA1C6C490AE0C.txt', (req, res) => {
//     res.sendFile('/app/2D7F90C6E0CC72C6F06BA1C6C490AE0C.txt');
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}...`);
//     console.log(`Click me to access the site: http://localhost:${PORT}`);
// });

const server = https.createServer(cred, app);

server.listen(443, () => {
    console.log(`Server listening on port ${443}...`);
    console.log(`Click me to access the site: https://localhost:${443}`);
});