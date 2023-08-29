import React, { useState, useEffect } from 'react';
import TV from './TVCard';
import './Home.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

const TVGenres = () => {
  const [genres, setGenres] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchShowsByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const fetchGenres = async () => {

    const URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

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

  const fetchShowsByGenre = async (genreId) => {
    const API_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`;
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }

    });
    
    const data = await response.json();
    setShows(data.results);
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
      
    
      <h2>Filtered TV Shows</h2>
        <div className='tv-list'>
            <div className='grid'>
                {shows.map((show) => <TV key={show.id} {...show}/>)};
            </div>
        </div>
    </div>
  );
};

export default TVGenres;