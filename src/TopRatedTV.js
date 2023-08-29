import React, { useEffect, useState } from 'react';
import TV from './TVCard';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

function TopRatedTV () {

    const [shows, setShows] = useState([]);

    useEffect(() => {

        const topRated = async () => {
          const API_URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`;
    
          let response = await fetch(API_URL, {
              method: 'GET',
              headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${ACCESS_TOKEN}`
              }
          });
        
          let data = await response.json();
          console.log(data)
          setShows(data.results);
        };

        topRated();
    
    
      }, []);


    return (
        <div>
            <h2>
                <b>Top Rated</b>
            </h2>
            <div className='tv-list'>
                <div className='grid'>
                    {shows.map((show) => <TV key={show.id} {...show}/>)};
                </div>
            </div>
        </div>
    );
}

export default TopRatedTV;