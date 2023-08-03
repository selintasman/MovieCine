import React, { useState } from 'react';
import './App.css';
import './Home.css';
import {Form} from 'react-bootstrap';
import Movie from './MovieCard';
import TV from './TVCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';

function Search () {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    
    

    const searching = async (event) => {
        event.preventDefault();
        setSearchClicked(true);

        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;

        let response = await fetch(url, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
            }
          });

        let data = await response.json();
        setResult(data.results);
    };

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        //searching(event);

        // Clear the results if the input value is empty
        if (!newQuery.trim()) {
            setResult([]);
        }

        // Trigger the search API call only when there's some input and not the backspace event
        if (newQuery && event.keyCode !== 8) {
            searching(event);
        }
      };

    return (
        <div>
            <div className='search-area'>
                <form onSubmit={searching} className="form-group">
                <Form.Control 
                type="text" 
                className="search-input" 
                value={query} 
                onChange={handleInputChange}
               
                placeholder="Search Movies, TV Shows, and more..."/>
                <button className="btn btn-primary" type='button'>Search</button>
                </form>
                
                <div className={`card-list ${query ? 'card-list-margin' : ''}`}>
                    {result.filter(item => item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv'))
                    .map((item) => {
                    if (item.media_type === 'movie') {
                        return <Movie key={item.id} {...item} />;
                    } else if (item.media_type === 'tv') {
                        return <TV key={item.id} {...item} />;
                    }
                    
                    })};
                    {/* {result.filter(movie => movie.poster_path).map(movie => (
                        <Movie key={movie.id} {...movie}/>
                    ))}; */}
                </div>
            </div>

        </div>
    )
};

export default Search;