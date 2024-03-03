import '../styles/Play.css'
import ring from '/Images/Ring.svg'
import { useEffect, useState, MouseEvent } from 'react'

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

const handleMovieClick = (event: MouseEvent<HTMLImageElement>) => {
    const movie = event.target as HTMLImageElement;
    if (movie.alt === 'movie1') {
        console.log('Movie 1 clicked');
    }
    else if (movie.alt === 'movie2') {
        console.log('Movie 2 clicked');
    }
}

const setMovie2InRing = () => {
    const movie2 = document.getElementById('movie2') as HTMLImageElement;
    movie2.style.right = '35%';
}

const setMovie1InRing = () => {
    const movie1 = document.getElementById('movie1') as HTMLImageElement;
    movie1.style.left = '35%';
}

const Play = () => {
  const [firstMovie, setFirstMovie] = useState<Movie | null>(null);
  const [secondMovie, setSecondMovie] = useState<Movie | null>(null);
  const [criterion, setCriterion] = useState<string>('revenue');
  
  useEffect(() => {
    (async () => {
        const firstMovie: Movie = await fetch('http://3.15.198.16:3000/getOriginalMovie/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json());

        const secondMovie: Movie = await fetch('http://3.15.198.16:3000/getNewMovie/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({usedMovies: [firstMovie]})
            })
            .then(response => response.json());

            console.log(firstMovie, secondMovie)
        setFirstMovie(firstMovie);
        setSecondMovie(secondMovie);
      })();
  }, []);

  return (
    <div id='play-container'>
      <div id='movie-title-container'>
        <h2 className="movie-title">{firstMovie?.title}</h2>
        <h2 id='vs'>V.S.</h2>
        <h2 className="movie-title">{secondMovie?.title}</h2>
      </div>
      <div id='ring-container'>
        <img src={ring} alt="ring" id="ring" />
        <img src={firstMovie?.poster_url} alt="movie1" id="movie1" onClick={handleMovieClick} onLoad={setMovie2InRing} />
        <img src={secondMovie?.poster_url} alt="movie2" id="movie2" onClick={handleMovieClick} onLoad={setMovie1InRing} />
      </div>
      <h3 id='criterion'>Guess which movie has accumilated the most revenue!</h3>
    </div>
  )
}

export default Play