import React, { useEffect, useState } from 'react';
import './App.css';
import './Home.css';

import MovieCard from './MovieCard';

import Search from './Search';
import TV from './TVCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';

function Movies () {
    return (
        <div>
            <h1>
                Movies
            </h1>
        </div>
    );
}

export default Movies;