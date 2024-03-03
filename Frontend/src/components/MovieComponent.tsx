import '../styles/MovieComponent.css';

const MovieComponent = ({ movieType, movie, handleMovieClick }) => {
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
