import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './Home.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const fetchGenres = async () => {

    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    let response = await fetch(URL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });

    const data = await response.json();
    setGenres(data.genres);
  };

  const fetchMoviesByGenre = async (genreId) => {
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }

    });
    
    const data = await response.json();
    setMovies(data.results);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div>
      <h2>Filter by Genre</h2>
      <div className='genre-tags'>
      {genres.map((genre) => (
          <span
          key={genre.id}
          className={`genre-tag ${selectedGenre === genre.id ? 'active' : ''}`}
          onClick={() => handleGenreChange(genre.id)}
          >
            {genre.name}
          </span>
        ))}
      </div>
      
    
      <h2>Filtered Movies</h2>
      <div className='movie-list'>
                <div className='grid'>
                {movies.map((movie) => <MovieCard 
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                overview={movie.overview}
                /> )};
                </div>
            </div>
    </div>
  );
};

export default Genres;