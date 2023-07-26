import React, { useEffect, useState } from 'react';
import './App.css';
import './Home.css';
import {Form} from 'react-bootstrap';
import Movie from './Movie';
import Search from './Search';
import TV from './TV';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';
  
const Home = () => {

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  //const [latestTrailers, setLatestTrailers] = useState([]);

  const handleSearch = async (event, search) => {
    event.preventDefault();


    console.log(search, searchResults);
    //debugger

    const SEARCH_API_URL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchResults}`;
    

    let response = await fetch(SEARCH_API_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
      }
    });

    let data = await response.json();
    console.log(data);
    setSearchResults(data.results);
  
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
    console.log(search, "search");
  };

  


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

    /* const fetchLatestTrailers = async () => {
      const API_URL = `https://api.themoviedb.org/3/movie/569094/videos?api_key=${API_KEY}&language=en-US`;
      
      let response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
        }
    });
    
      let data = await response.json();
      console.log(data);
      setLatestTrailers(data.results);

    }; */

   /* const fetchTrailer = async () => {
      const TRAILER_URL = `https://api.themoviedb.org/3/movie/${movie_id}/videos`
    } */

    fetchPopularMovies();
    fetchPopularTVShows();
    
    //fetchLatestTrailers();


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
        {popularMovies.map((movie) => <Movie key={movie.id} {...movie}/> )};
        </div>
      </div>

      <h2>Popular TV Shows</h2>
      <div className='tv-list'>
        <div className='grid'>
        {popularTVShows.map((show) => <TV key={show.id} {...show}/>)};
        </div>
      </div>

     {/*  <h2>Latest Trailers</h2>
      <div className="trailer-list">
        {latestTrailers.map((trailer) => (
          <div key={trailer.id} className="trailer-item">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
            />
          </div>
        ))}
        </div>  */}


      










    </div>
  );
};
  
export default Home;

/* 
      <h2>Search Results</h2>
      <div className="search-results">
        {filteredSearch.map((result) => (
          <div key={result.id} className="search-result-item">
            <p>{result.title || result.name}</p>
          </div>
        ))};
      </div> */


    