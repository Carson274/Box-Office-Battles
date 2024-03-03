import { useEffect } from 'react';
import '../styles/MovieComponent.css';
import MovieComponentProps from '../types/MovieComponentPropsType';

const MovieComponent = ({ setHasLoaded, hasLoaded, lastUpdated, movieType, movie, handleMovieClick }) => {
  useEffect(() => {
    const leftMovie = document.querySelector<HTMLImageElement>('.left-movie')!;
    const rightMovie = document.querySelector<HTMLImageElement>('.right-movie')!;
    const leftGlove = document.querySelector<HTMLImageElement>('.left-glove')!;
    const rightGlove = document.querySelector<HTMLImageElement>('.right-glove')!;

    // check if this is the first time the component is rendered
    if(!hasLoaded) {
      setHasLoaded(true);

      // animate both in
      leftMovie.style.animation = 'slide-left 1.5s ease-out';
      rightMovie.style.animation = 'slide-right 1.5s ease-out';
      leftGlove.style.animation = 'slide-left 1.5s ease-out';
      rightGlove.style.animation = 'slide-right 1.5s ease-out';
    }

    if (leftMovie && leftGlove && lastUpdated === 'first-movie') {
      leftMovie.style.animation = 'slide-left 1.5s ease-out';
      leftGlove.style.animation = 'slide-left 1.5s ease-out';
    }
    if (rightMovie && rightGlove && lastUpdated === 'second-movie') {
      rightMovie.style.animation = 'slide-right 1.5s ease-out';
      rightGlove.style.animation = 'slide-right 1.5s ease-out';
    }

    // remove the animation after it finishes
    setTimeout(() => {
      leftMovie.style.animation = '';
      leftGlove.style.animation = '';
      rightMovie.style.animation = '';
      rightGlove.style.animation = '';
    }, 1500);
  });

  if(movieType === 'left-movie') {
    return (
      <>
        <img className='left-movie movie-poster' src={movie.poster_url} alt={movie.title} onClick={handleMovieClick} />
        <img className='left-glove glove' src='/Images/boxing-glove-left.svg' alt='First Movie' />
      </>
    );
  }
  if(movieType === 'right-movie') {
    return (
      <>
        <img className='right-movie movie-poster' src={movie.poster_url} alt={movie.title} onClick={handleMovieClick} />
        <img className='right-glove glove' src='/Images/boxing-glove-right.svg' alt='Second Movie' />
      </>
    );
  }
};

export default MovieComponent;