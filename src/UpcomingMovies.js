import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

function UpcomingMovies () {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const upcoming = async () => {
          const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&region=US`;
    
          let response = await fetch(API_URL, {
              method: 'GET',
              headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${ACCESS_TOKEN}`
              }
          });
        
          let data = await response.json();
          console.log(data)
          setMovies(data.results);
        };

        upcoming();
    
        
      }, []);


    return (
        <div>
            <h2>
                <b>Upcoming</b>
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

export default UpcomingMovies;