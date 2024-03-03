import '../styles/Play.css'
import ring from '../../public/Images/Ring.svg'
import { useEffect, useState, MouseEvent } from 'react'
import MovieComponent from '../components/MovieComponent'
import Movie from '../types/MovieType'
import GameFinishedModal from '../components/GameFinishedModal'
import kickTiredMovie from '../utils/PlayHelpers'
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// move fetch to get new movie into function
async function getNewMovie(usedMovies: Movie[]) {
  return fetch('http://3.15.198.16:3000/getNewMovie/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({usedMovies})
  })
  .then(response => response.json());
}

const punchAudioFileCount = 1;

const Play = () => {
  const [muted, setMuted] = useState<boolean>(false);

  const [firstMovie, setFirstMovie] = useState<Movie | null>(null);
  const [secondMovie, setSecondMovie] = useState<Movie | null>(null);

  // make list of used movies
  const [usedMovies, setUsedMovies] = useState<Movie[]>([]);
  const [winner, setWinner] = useState<Movie | null>(null);

  const [score, setScore] = useState<number>(0);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [displayFirstRevenue, setDisplayFirstRevenue] = useState<boolean | null>(null);
  const [displaySecondRevenue, setDisplaySecondRevenue] = useState<boolean | null>(null);
  const [firstMovieFrequency, setFirstMovieFrequency] = useState<number>(0);
  const [secondMovieFrequency, setSecondMovieFrequency] = useState<number>(0);
  
  useEffect(() => {
    (async () => {
        const firstMovie: Movie = await fetch('http://3.15.198.16:3000/getOriginalMovie/', {
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
    console.log(firstMovieFrequency, secondMovieFrequency)
    const playArea = document.getElementById('play-container')!;
    playArea.style.pointerEvents = 'none';
    setTimeout(() => {
      playArea.style.pointerEvents = 'auto';
    }, 3500);

    const clickedMovieTitle = event.currentTarget.alt;

    // get the new movie
    const newMovie: Movie = await getNewMovie(usedMovies);
    console.log("HAOSFNPODN", newMovie)

    // add the new movie to the used movies array
    setUsedMovies([...usedMovies, newMovie]);

    const randomPunch = Math.floor(Math.random() * punchAudioFileCount) + 1;
    const punchNoise = new Audio(`/Audio/punch${randomPunch}.wav`);
    punchNoise.volume = muted ? 0 : 0.3;
    // replace the lower revenue movie with a new movie
    if(firstMovie!.revenue < secondMovie!.revenue && clickedMovieTitle === secondMovie!.title) {
      // Add one to the score
      setScore(score + 1);

      // Show the revenue of the second movie
      setDisplaySecondRevenue(true);
      setDisplayFirstRevenue(false);

      // Add one to count of how many times the second movie has been shown in a row and reset the first movie count
      setSecondMovieFrequency(secondMovieFrequency + 1);
      setFirstMovieFrequency(0);

      // Play the punch noise
      punchNoise.play();

      // If the second movie has been shown three times in a row, replace the first movie with a new movie
      if (secondMovieFrequency === 2) {
        kickTiredMovie(firstMovie, newMovie, setWinner, setFirstMovieFrequency, setSecondMovie, setDisplaySecondRevenue);
        return;
      }

      // Set the winner to the second movie (TRIGGERS ANIMATIONS)
      setWinner(secondMovie);

      setTimeout(() => {
        // Change the first movie to the newly fetched movie
        setFirstMovie(newMovie);

        // Reset the winner to null to reset animation trigger
        setWinner(null);

      }, 2000);
    } else if (firstMovie!.revenue > secondMovie!.revenue && clickedMovieTitle === firstMovie!.title){
      // Update user score
      setScore(score + 1);

      // Show the revenue of the first movie
      setDisplayFirstRevenue(true);
      setDisplaySecondRevenue(false);

      // Add one to count of how many times the first movie has been shown in a row and reset the second movie count
      setFirstMovieFrequency(firstMovieFrequency + 1);
      setSecondMovieFrequency(0);
      punchNoise.play();

      // If the first movie has been shown 3 times in a row, replace it with a new movie
      if (firstMovieFrequency === 2) {
        kickTiredMovie(secondMovie, newMovie, setWinner, setSecondMovieFrequency, setFirstMovie, setDisplayFirstRevenue);
        return;
      }

      // Set the winner to the first movie (TRIGGERS ANIMATIONS)
      setWinner(firstMovie);

      setTimeout(() => {
        // Change the second movie to the newly fetched movie
        setSecondMovie(newMovie);

        // Reset the winner to null to reset animation trigger
        setWinner(null);
      }, 1500);
    } else {
        const playArea = document.getElementById('play-container')!;
        playArea.style.filter = 'blur(20px)';
        const ko = new Audio('/Audio/ko.mp3');
        ko.volume = muted ? 0 : 0.3;
        ko.play();
        setGameLost(true);
    }
  };

  return (
    <>
      <div id='play-container'>
        <div className='movie-title-container'>
            <h2 className="movie-title-1">{firstMovie?.title}</h2>
            <div className='versus-container'>
            <h2 id='vs'>VS</h2>
            </div>
            <h2 className="movie-title-2">{secondMovie?.title}</h2>
        </div>
        <div className='description-container'>
          { displayFirstRevenue ? <h3 id="movie1-stats">{firstMovie.title}'s Revenue: ${new Intl.NumberFormat().format(firstMovie.revenue)}</h3> : null }
          { displayFirstRevenue === null && displaySecondRevenue === null ? <h3 id="description">Choose the movie with the highest earnings!</h3> : null }
          { displaySecondRevenue ? <h3 id="movie2-stats">{secondMovie.title} Revenue: ${new Intl.NumberFormat().format(secondMovie.revenue)}</h3>: null }
          { displayFirstRevenue === false && displaySecondRevenue === false ? <h3 id="description">That movie got tired of fighting, new one in!</h3> : null}
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
            <h3 id='score'>Streak: {score} 🔥</h3> 
        </div>
        <div id='mute-container'>
            { muted ? <FaVolumeMute size={40} color='white' onClick={() => {setMuted(!muted)}} /> : <FaVolumeUp size={40} color='white' onClick={() => {setMuted(!muted)}} /> }
        </div>
      </div>
      {gameLost ? <GameFinishedModal score={score} /> : null}
    </>
  )
}

export default Play;
