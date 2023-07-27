import React, { useState } from 'react';
import './App.css';
import './Home.css';
import {Form} from 'react-bootstrap';
import Movie from './Movie';

import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';

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
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
            }
          });

        let data = await response.json();
        setResult(data.results);
    };

    return (
        <div>
            <div className='search-area'>
                <form onSubmit={searching}>
                <Form.Control 
                type="text" 
                className="search-input" 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                placeholder="Search Movies, TV Shows, and more..."/>
                <button type='submit'>Search</button>
                </form>
                
                <div className="card-list">
                    {result.filter(movie => movie.poster_path).map(movie => (
                        <Movie key={movie.id} {...movie}/>
                    ))};
                </div>
            </div>

        </div>
    )
};

export default Search;