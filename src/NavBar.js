import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar () {


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/home">MovieCine</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                <Link className="nav-link" to="/home">Home</Link>
                </li>
                
                
                
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Movies
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/popular">Popular</Link>
                <Link className="dropdown-item" to="/nowplaying">Now Playing</Link>
                <Link className="dropdown-item" to="/movie/top-rated">Top Rated</Link>
                <Link className="dropdown-item" to="/movie/upcoming">Upcoming</Link>
                    
                    
                    
                    
                </div>
                </li>
        
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    TV Shows
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/tv/airing-today">Airing Today</Link>
                <Link className="dropdown-item" to="/tv/on-the-air">On The Air</Link>
                <Link className="dropdown-item" to="/tv/top-rated">Top Rated</Link>
                <Link className="dropdown-item" to="/tv/popular">Popular</Link>

                 
                    
                </div>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to="/watchlist">My Watchlist</Link>
                </li> 
                
                
            </ul>
            {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            </div>
      </nav>
    );







};

export default NavBar;