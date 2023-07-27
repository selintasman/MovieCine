import React, { useEffect, useState } from 'react';
import './App.css';
import './Home.css';

import MovieCard from './MovieCard';

import Search from './Search';
import TV from './TVCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';
  
const Home = () => {

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  
  useEffect(() => {

    const fetchPopularMovies = async () => {
      const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`;

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
      
      const API_URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=en-US&page=1`;

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="">MovieCine</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
         </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movies">Movies</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Movies
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/movies">Popular Movies</a>
                <a class="dropdown-item" href="#">Now Playing</a>
                <a class="dropdown-item" href="#">Top Rated</a>
                <a class="dropdown-item" href="#">Upcoming</a>
                
              </div>
            </li>
            
            
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>







      <h1>Welcome to Home Page</h1>
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

