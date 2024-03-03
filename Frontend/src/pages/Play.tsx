import '../styles/Play.css'
import ring from '../../public/Images/Ring.svg'
import { useEffect, useState, MouseEvent } from 'react'
import MovieComponent from '../components/MovieComponent'
import Movie from '../types/MovieType'
import GameFinishedModal from '../components/GameFinishedModal'

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
  const [winner, setWinner] = useState<Movie | null>(null);

  const [score, setScore] = useState<number>(0);
  const [gameLost, setGameLost] = useState<boolean>(false);
  
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

  // loading screen
  if(!firstMovie || !secondMovie) return (<div className="loading">Loading...</div>);

  const handleMovieClick = async (event: MouseEvent<HTMLImageElement>) => {
    const playArea = document.getElementById<HTMLDivElement>('play-container')!;
    playArea.style.pointerEvents = 'none';
    setTimeout(() => {
      playArea.style.pointerEvents = 'auto';
    }, 3500);

    const clickedMovieTitle = event.currentTarget.alt;
    console.log(clickedMovieTitle);
    // get the new movie
    const newMovie = await getNewMovie(usedMovies);

    // add the new movie to the used movies array
    setUsedMovies([...usedMovies, newMovie]);

    // replace the lower revenue movie with a new movie
    if(firstMovie!.revenue < secondMovie!.revenue && clickedMovieTitle === secondMovie!.title) {
      setScore(score + 1);
      setWinner(secondMovie);
      setTimeout(() => {
        setFirstMovie(newMovie);
        setWinner(null);
      }, 2000);
      
    } else if (firstMovie!.revenue > secondMovie!.revenue && clickedMovieTitle === firstMovie!.title){
      setScore(score + 1);
      setWinner(firstMovie);
      setTimeout(() => {
        setSecondMovie(newMovie);
        setWinner(null);
      }, 1500);
    } else {
        const playArea = document.getElementById('play-container')!;
        playArea.style.filter = 'blur(20px)';
        const ko = new Audio('/Audio/ko.mp3');
        ko.volume = 0.5;
        ko.play();
        setGameLost(true);
    }
  };


  return (
    <>
      <div id='play-container'>
        <div className='movie-title-container'>
            <div className='left-title-container'>
            <h2 className="movie-title">{firstMovie?.title}</h2>
            </div>
            <div className='versus-container'>
            <h2 id='vs'>VS</h2>
            </div>
            <div className='right-title-container'>
            <h2 className="movie-title">{secondMovie?.title}</h2>
            </div>
        </div>
        <div className='description-container'>
            <h3 id="description">Choose the movie with the highest earnings</h3>
        </div>
        <div id='ring-container'>
            <img src={ring} alt="ring" id="ring" />
            {firstMovie && (
                <MovieComponent winner={winner!} movieType={'left-movie'} movie={firstMovie} handleMovieClick={handleMovieClick} />
            )}
            {secondMovie && (
                <MovieComponent winner={winner!} movieType={'right-movie'} movie={secondMovie} handleMovieClick={handleMovieClick} />
            )}
        </div>
        <div id='score-container'>
            <h3 id='score'>Score: {score}</h3>
        </div>
      </div>
      {gameLost ? <GameFinishedModal score={score} /> : null}
    </>
  )
}

export default Play;
