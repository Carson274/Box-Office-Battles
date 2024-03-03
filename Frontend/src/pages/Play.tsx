import '../styles/Play.css';
import ring from '../../public/Images/Ring.svg';
import { useEffect, useState } from 'react';

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

const Play = () => {
    const [firstMovie, setFirstMovie] = useState<Movie | null>(null);
    const [secondMovie, setSecondMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response1 = await fetch('http://3.15.198.16:3000/getOriginalMovie/');
                const firstMovieData: Movie = await response1.json();

                const response2 = await fetch('http://3.15.198.16:3000/getNewMovie/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usedMovies: [firstMovieData] }),
                });
                const secondMovieData: Movie = await response2.json();

                setFirstMovie(firstMovieData);
                setSecondMovie(secondMovieData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div id='play-container'>
            <div id='movie-title-container'>
                <h2 className="movie-title">{loading ? 'Loading...' : firstMovie?.title}</h2>
                <h2 id='vs'>V.S.</h2>
                <h2 className="movie-title">{loading ? 'Loading...' : secondMovie?.title}</h2>
            </div>
            <div id='ring-container'>
                <img src={ring} alt="ring" id="ring" />
                <img src={loading ? '' : firstMovie?.poster_url} alt="movie1" id="movie1" />
                <img src={loading ? '' : secondMovie?.poster_url} alt="movie2" id="movie2" />
                    {loading ? 'Loading...' : 'ENTER THE RING'}
            </div>
        </div>
    );
};

export default Play;
