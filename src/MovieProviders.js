import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; 

const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;


const Providers = () => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [movies, setMovies] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      fetchMoviesByProviders(selectedProvider);
    }
  }, [selectedProvider]);

  const fetchProviders = async () => {
    const URL = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${API_KEY}&language=en-US`;

    let response = await fetch(URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
    });

    const data = await response.json();
    setProviders(data.results);
  };

  const fetchMoviesByProviders = async (providerId) => {
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_watch_providers=${providerId}`;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
    });

    const data = await response.json();
    setMovies(data.results);
  };

  const handleProviderChange = (providerId) => {
    setSelectedProvider(providerId);
  };

  return (
    <div>
      <h2>Filter by Provider</h2>
      <div className="genre-tags">
        {providers.map((provider) => (
          <span
            key={provider.provider_id}
            className={`genre-tag ${selectedProvider === provider.provider_id ? 'active' : ''}`}
            onClick={() => handleProviderChange(provider.provider_id)}
          >
            {provider.provider_name}
            
          </span>
        ))}
      </div>

      <h2>Filtered Movies</h2>
      <div className="movie-list">
        <div className="grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
              overview={movie.overview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Providers;