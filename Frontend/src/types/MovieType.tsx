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

export default Movie;