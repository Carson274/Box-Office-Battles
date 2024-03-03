import { useEffect } from 'react';
import '../styles/MovieComponent.css';
import MovieComponentProps from '../types/MovieComponentPropsType';

const MovieComponent = ({ winner, movieType, movie, handleMovieClick }: MovieComponentProps) => {
  useEffect(() => {
    const leftMovie = document.querySelector<HTMLImageElement>('.left-movie')!;
    const rightMovie = document.querySelector<HTMLImageElement>('.right-movie')!;
    const leftGlove = document.querySelector<HTMLImageElement>('.left-glove')!;
    const rightGlove = document.querySelector<HTMLImageElement>('.right-glove')!;
    // animate both in
    if (movieType === 'left-movie') {
      leftMovie.style.animation = 'slide-left 2s ease-out';
      leftGlove.style.animation = 'slide-left 2s ease-out';
    } else {
        rightGlove.style.animation = 'slide-right 2s ease-out';
        rightMovie.style.animation = 'slide-right 2s ease-out';
    }
    
  }, []);

  // // New movie gets entered
  useEffect(() => {
    const leftMovie = document.querySelector<HTMLImageElement>('.left-movie')!;
    const rightMovie = document.querySelector<HTMLImageElement>('.right-movie')!;
    const leftGlove = document.querySelector<HTMLImageElement>('.left-glove')!;
    const rightGlove = document.querySelector<HTMLImageElement>('.right-glove')!;

    if (leftMovie.alt === movie.title) {
      leftMovie.style.animation = 'slide-left 2s ease-out';
      leftGlove.style.animation = 'slide-left 2s ease-out';
    }

    if (rightMovie.alt === movie.title) {
      rightMovie.style.animation = 'slide-right 2s ease-out';
      rightGlove.style.animation = 'slide-right 2s ease-out';
    }

    // remove the animation after it finishes
    setTimeout(() => {
      leftMovie.style.animation = '';
      leftGlove.style.animation = '';
      rightMovie.style.animation = '';
      rightGlove.style.animation = '';
    }, 2000);
  }, [movie]);

  useEffect(() => {
    if (!winner) return;
    const leftMovie = document.querySelector<HTMLImageElement>('.left-movie')!;
    const rightMovie = document.querySelector<HTMLImageElement>('.right-movie')!;
    const leftGlove = document.querySelector<HTMLImageElement>('.left-glove')!;
    const rightGlove = document.querySelector<HTMLImageElement>('.right-glove')!;

    if (leftMovie && leftMovie.alt !== winner.title) {
      // do falling animation
      console.log("left movie falling")
      leftMovie.style.animation = 'fall 2s ease-out';
      leftGlove.style.animation = 'fall 2s ease-out';
    } else {
      // do punching animation
      console.log("left movie punching")
      leftGlove.style.animation = 'punch-right 0.43s ease-out';
    }

    if (rightMovie && rightMovie.alt !== winner.title) {
      // do falling animation, right movie lost
      rightMovie.style.animation = 'fall 2s ease-out';
      rightGlove.style.animation = 'fall 2s ease-out';
    } else {
      // do punching animation, right movie won
      rightGlove.style.animation = 'punch-left 0.43s ease-out';
    }
  }, [winner]);

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
        <img className='right-glove glove' src='/Images/Vectorbg.svg' alt='Second Movie' />
      </>
    );
  }
};

export default MovieComponent;