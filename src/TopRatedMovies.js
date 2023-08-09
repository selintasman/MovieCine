import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';

function TopRatedMovies () {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const topRated = async () => {
          const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
    
          let response = await fetch(API_URL, {
              method: 'GET',
              headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
              }
          });
        
          let data = await response.json();
          console.log(data)
          setMovies(data.results);
        };

        topRated();
    
    
      }, []);


    return (
        <div>
            <h2>
                <b>Top Rated Movies</b>
            </h2>

                    
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
}

export default TopRatedMovies;