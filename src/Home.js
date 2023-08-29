import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Search from './Search';
import TV from './TVCard';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;
  
const Home = (sessionId) => {

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  
  useEffect(() => {

    const fetchPopularMovies = async () => {
      const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`;

      let response = await fetch(API_URL, {
          method: 'GET',
          headers: {
              accept: 'application/json',
              Authorization: `Bearer ${ACCESS_TOKEN}`
          }
      });
    
      let data = await response.json();
      console.log(data)
      setPopularMovies(data.results);
    };

    const fetchPopularTVShows = async () => {
      
      const API_URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=en-US&page=1`;

      let response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    
      let data = await response.json();
      console.log(data);
      setPopularTVShows(data.results);
    };

    fetchPopularMovies();
    fetchPopularTVShows();

  }, []);

  return (
   
    <div>
      <div className='search-area'>
        <Search/>
      </div>
      <h2>Trending Movies</h2>
      <div className='movie-list'>
        <div className='grid'>
        {popularMovies.map((movie) => <MovieCard 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
        vote_average={movie.vote_average}
        release_date={movie.release_date}
        overview={movie.overview}
        sessionId={sessionId}
        /> )};
        </div>
      </div>

      <h2>Trending TV Shows</h2>
      <div className='tv-list'>
        <div className='grid'>
        {popularTVShows.map((show) => <TV key={show.id} {...show}/>)};
        </div>
      </div>
    </div>
  );
};
  
export default Home;

