import React, { useState } from 'react';
import {Form} from 'react-bootstrap';
import Movie from './MovieCard';
import TV from './TVCard';
import './App.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

function Search () {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);


    const searching = async (event) => {
        event.preventDefault();
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;

        let response = await fetch(url, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${ACCESS_TOKEN}`
            }
          });

        let data = await response.json();
        setResult(data.results);
    };

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        
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
                </form>
                
                <div className={`card-list ${query ? 'card-list-margin' : ''}`}>
                    {result.filter(item => item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv'))
                    // eslint-disable-next-line array-callback-return
                    .map((item) => {
                    if (item.media_type === 'movie') {
                        return <Movie key={item.id} {...item} />;
                    } else if (item.media_type === 'tv') {
                        return <TV key={item.id} {...item} />;
                    }
                    })};
                </div>
            </div>
        </div>
    )
};

export default Search;