import React, { useEffect, useState } from 'react';
import './App.css';
import './Home.css';

import Movie from './Movie';
import Search from './Search';
import TV from './TV';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';
  
const Home = () => {

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  
  useEffect(() => {

    const fetchPopularMovies = async () => {
      const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      let response = await fetch(API_URL, {
          method: 'GET',
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
          }
      });
    
      let data = await response.json();
      console.log(data)
      setPopularMovies(data.results);
    };

    const fetchPopularTVShows = async () => {
      
      const API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

      let response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
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
      <h1>Welcome to Home Page</h1>
      <div className='search-area'>
        <Search/>
      </div>
      <h2>Popular Movies</h2>
      <div className='movie-list'>
        <div className='grid'>
        {popularMovies.map((movie) => <Movie 
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

      <h2>Popular TV Shows</h2>
      <div className='tv-list'>
        <div className='grid'>
        {popularTVShows.map((show) => <TV key={show.id} {...show}/>)};
        </div>
      </div>

    


      










    </div>
  );
};
  
export default Home;

