import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// connect to to the database
const db = mongoose.connection;

// the open event is called when the database connection successfully opens
db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!');
});

// define the movie schema
const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  budget: { type: Number, required: true },
  popularity: { type: Number, required: true },
  release_date: { type: String, required: true },
  revenue: { type: Number, required: true },
  title: { type: String, required: true },
  poster_url: { type: String, required: true }
});

// define the score schema
const scoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true }
});

// compile both models from the schemas
const Movie = mongoose.model("Movie", movieSchema, "movies");
const Score = mongoose.model("Score", scoreSchema, "scores");


// MOVIE MODEL CODE:

const getOriginalMovie = async () => {
    // get a random movie from the database
    const movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
    return movie;
}

const getNewMovie = async (usedMovies) => {
    let movieSet = new Set(usedMovies.filter(movie => movie !== undefined).map(movie => movie.title));
    console.log(movieSet);

    while(true) {
        // get a random movie from the database
        const movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
        // if the movie isn't in the set, return it
        if (!movieSet.has(movie[0].title)) {
            return movie;
        }

        // if the set is full, clear it
        if (movieSet.size === 30) {
            movieSet.clear();
        }
    }
}

const createMovie = async (id, budget, popularity, release_date, revenue, title, poster_url) => {
    const movie = new Movie({ id: id, budget: budget, popularity: popularity, release_date: release_date, revenue: revenue, title: title, poster_url: poster_url});
    return movie.save();
}

const findMovieById = async (filter) => {
    const query = await Movie.findOne(filter);
    return query;
}

const findMovies = async () => {
    const query = await Movie.find();
    return query;
}

const updateMovie = async (filter, update) => {
    const result = await Movie.updateOne(filter, update);
    return result.modifiedCount;
};

const deleteMovie = async (filter) => {
    const result = await Movie.deleteOne(filter);
    return result.deletedCount;
};

// SCORE MODEL CODE:

// find all scores (for leaderboard)
const findScores = async () => {
    const query = await Score.find();
    return query;
}

// Add a score
const addScore = async (username, score) => {
    const newScore = new Score({ username: username, score: score });
    return newScore.save();
}

export { createMovie, findMovieById, findMovies, updateMovie, deleteMovie, getOriginalMovie, getNewMovie, findScores, addScore };