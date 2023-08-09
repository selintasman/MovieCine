import React, { useEffect, useState } from 'react';
import TV from './TVCard';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';

function OnTheAir () {

    const [shows, setShows] = useState([]);

    useEffect(() => {

        const onAir = async () => {
          const API_URL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`;
    
          let response = await fetch(API_URL, {
              method: 'GET',
              headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
              }
          });
        
          let data = await response.json();
          console.log(data)
          setShows(data.results);
        };

        onAir();
    
      }, []);


    return (
        <div>
            <h2>
                <b>On Air</b>
            </h2>

                    
            <div className='tv-list'>
                <div className='grid'>
                    {shows.map((show) => <TV key={show.id} {...show}/>)};
                </div>
            </div>
        </div>
    );
}

export default OnTheAir;