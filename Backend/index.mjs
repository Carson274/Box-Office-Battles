import fetch from 'node-fetch';
import 'dotenv/config';
import mongoose from 'mongoose';
import { createMovie } from './model.mjs';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
  }
};

// async function main() {
//   // get 1 page, get one movie, get its details, get its images, create a new movie
//   const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options).then(response => response.json());
//   const movie = data.results[0];
//   const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options).then(response => response.json());
//   const moviePoster = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
//   const newMovie = await createMovie(movieDetails.id, movieDetails.budget, movieDetails.popularity, movieDetails.release_date, movieDetails.revenue, movieDetails.title, moviePoster);

// }

// main();

// function to create new movies
async function fillDatabase() {
  // iterate through 8 pages of movies
  for (let i = 1; i <= 8; i++) {
    // for each page, fetch the top rated movies
    const data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${i}`, options).then(response => response.json());
    
    // parse the JSON response
    for (const movie of data.results) {
      // get the movie details
      const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options).then(response => response.json());
  
      // get the movie images
      const movieImages = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images`, options).then(response => response.json());
      const moviePoster = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  
      // create a new movie
      console.log(movieDetails.id, movieDetails.budget, movieDetails.popularity, movieDetails.release_date, movieDetails.revenue, movieDetails.title, moviePoster)
      await createMovie(movieDetails.id, movieDetails.budget, movieDetails.popularity, movieDetails.release_date, movieDetails.revenue, movieDetails.title, moviePoster);
  
      // wait for 10 seconds before fetching the next movie
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  
    // wait for 10 seconds before fetching the next page
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  
  // close the database connection
  mongoose.connection.close();
}

// call the function to fill the database
fillDatabase();