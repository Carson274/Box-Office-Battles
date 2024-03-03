interface MovieComponentProps {
    movieType: string;
    movie: {
        _id: string;
        title: string;
        revenue: number;
        rating: number;
        release_date: string; //YYYY-MM-DD
        popularity: number;
        budget: number;
        poster_url: string;
    };
    handleMovieClick: (e: React.MouseEvent<HTMLImageElement>) => void;
    hasLoaded: boolean;
    setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export default MovieComponentProps;