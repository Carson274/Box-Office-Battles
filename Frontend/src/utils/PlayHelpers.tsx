import { SetStateAction } from "react";
import Movie from "../types/MovieType";

const kickTiredMovie = (winningMovie: Movie, newMovie: Movie, setWinner, setMovieFrequency, setLosingMovie, setDisplayRevenue) => {
    setWinner(winningMovie);
    setMovieFrequency(0);
    setTimeout(() => {
        setLosingMovie(newMovie);
        setWinner(null);
        setDisplayRevenue(false);
    }, 1500);
    return;
}

export default kickTiredMovie;