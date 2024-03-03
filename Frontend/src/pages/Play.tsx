import '../styles/Play.css'
import ring from '../../public/Images/Ring.svg'
import boxingGloveLeft from '../../public/Images/boxing-glove-left.svg'
import boxingGloveRight from '../../public/Images/boxing-glove-right.svg'
import { useEffect, useState, MouseEvent } from 'react'
import MovieComponent from '../components/MovieComponent'

interface Movie {
    _id: string;
    title: string;
    revenue: number;
    rating: number;
    release_date: string; //YYYY-MM-DD
    popularity: number;
    budget: number;
    poster_url: string;
}

// move fetch to get new movie into function
async function getNewMovie(usedMovies: Movie[]) {
  return fetch('http://localhost:3000/getNewMovie/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({usedMovies})
  })
  .then(response => response.json());
}

const Play = () => {
  const [firstMovie, setFirstMovie] = useState<Movie | null>(null);
  const [secondMovie, setSecondMovie] = useState<Movie | null>(null);
  // make list of used movies
  const [usedMovies, setUsedMovies] = useState<Movie[]>([]);
  const [criterion, setCriterion] = useState<string>('revenue');
  
  useEffect(() => {
    (async () => {
        const firstMovie: Movie = await fetch('http://localhost:3000/getOriginalMovie/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json());

        // add the first movie to the used movies array
        setUsedMovies([...usedMovies, firstMovie]);

        const secondMovie: Movie = await getNewMovie(usedMovies);

        setFirstMovie(firstMovie);
        setSecondMovie(secondMovie);
      })();
  }, []);

  const handleMovieClick = async (clickedMovieId: string) => {
    // get the new movie
    const newMovie = await getNewMovie(usedMovies);

    // add the new movie to the used movies array
    setUsedMovies([...usedMovies, newMovie]);

    // replace the lower revenue movie with a new movie
    if(firstMovie?.revenue < secondMovie?.revenue) {
      setFirstMovie(newMovie);
    } else {
      setSecondMovie(newMovie);
    }
  };

  return (
    <div id='play-container'>
      <div id='movie-title-container'>
        <h2 className="movie-title">{firstMovie?.title}</h2>
        <h2 id='vs'>V.S.</h2>
        <h2 className="movie-title">{secondMovie?.title}</h2>
      </div>
      <div id='ring-container'>
        <img src={ring} alt="ring" id="ring" />
          {firstMovie && (
            <MovieComponent movieType={'left-movie'} movie={firstMovie} handleMovieClick={() => handleMovieClick(firstMovie._id)} />
          )}
          {secondMovie && (
            <MovieComponent movieType={'right-movie'} movie={secondMovie} handleMovieClick={() => handleMovieClick(secondMovie._id)} />
          )}
      </div>
      <div id='criterion-container'>
        <h3 id='criterion'>New contender! Which</h3>
      </div>
    </div>
  )
}

export default Play