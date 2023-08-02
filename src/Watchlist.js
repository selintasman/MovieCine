import React, { useEffect, useState } from 'react';
import './App.css';
import './Home.css';

import MovieCard from './MovieCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';

function Watchlist ({account_id, sessionId}) {

    const [watchlist, setWatchlist] = useState([]);
    
    useEffect(() => {

        const getWatchlist = async () => {
            const API_URL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${API_KEY}`;
            
            let response = await fetch(API_URL, {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
              }
          });
          
            let data = await response.json();
            console.log(data);
            setWatchlist(data.results)
            
          };
    
         
          getWatchlist();
         
      
      
        }, [account_id]);



    return (
        <div>
            <h2>
                <b>My Watchlist</b>
            </h2>

                    
            <div className='movie-list'>
                <div className='grid'>
                {watchlist.map((movie) => <MovieCard 
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







        </div>
    );
}

export default Watchlist;

