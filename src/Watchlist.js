import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import TV from './TVCard';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

function Watchlist ({account_id, sessionId}) {

    const [watchlist, setWatchlist] = useState([]);
    const [watchlistTV, setWatchlistTV] = useState([]);
    
    
    useEffect(() => {

        const getWatchlist = async () => {
            const API_URL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${API_KEY}`;
            
            let response = await fetch(API_URL, {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
              }
          });
          
            let data = await response.json();
            console.log(data);
            setWatchlist(data.results)
            
          };


          const getWatchlistTV = async () => {
            const API_URL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/tv?api_key=${API_KEY}`;
            
            let response = await fetch(API_URL, {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
              }
          });
          
            let data = await response.json();
            console.log(data);
            setWatchlistTV(data.results)
            
          };
    
         
          getWatchlist();
          getWatchlistTV();
         
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
            <div className='tv-list'>
                <div className='grid'>
                    {watchlistTV.map((show) => <TV key={show.id} {...show}/>)};
                </div>
            </div>
        </div>
    );
}

export default Watchlist;

