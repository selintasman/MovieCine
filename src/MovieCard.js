import React, { useState, useEffect } from 'react';
import {Modal} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_IMG = "https://image.tmdb.org/t/p/w300/";
const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;


function Movie ({title, poster_path, vote_average, release_date, overview, id}) {

    const [show, setShow] = useState(false);
    const [trailers, setTrailers] = useState([]);
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    
    const handlePreview = () => {
      setShow(true);
    }

    const handleClose = () => {
      setShow(false);
    }

    useEffect(() => {

    const fetchTrailers = async () => {
        const API_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
        
        let response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
          }
      });
      
        let data = await response.json();
        console.log(data);
        if (data.results && Array.isArray(data.results)) {
          let onlyTrailer = data.results.filter((video) => video.type === 'Trailer');
          setTrailers(onlyTrailer);
        } else {
          setTrailers([]); // Set trailers to an empty array if no results or invalid response
        }
  
      };

     
      fetchTrailers();
  
    }, [id]);

    const handleAddToWatchlist = async (e) => {
      
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`
        },
        body: JSON.stringify({media_type: 'movie', media_id: id, watchlist: true})
      };
      
      fetch('https://api.themoviedb.org/3/account/20161831/watchlist', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        setIsAddedToWatchlist(true);
      

    };
  

    return (
        <div className='card text-center bg-secondary mb-3'>
          <div className='card-body'>
            <img className='card-img-top' src={API_IMG+poster_path} alt={title} />
            
                <button type='button' className='btn btn-light' onClick={handlePreview}>View More</button>
                <Modal 
                show={show}
                onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img className='card-img-top' src={API_IMG+poster_path} alt={title} />
                    <h3 className="text-center">{title}</h3>
                    <h4>IMDb: {vote_average}</h4>
                    <h5>Release Date: {release_date}</h5>
                    <br></br>
                    <h6>Overview</h6>
                    <p>{overview}</p>
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddToWatchlist}
                    disabled={isAddedToWatchlist}
                  >
                    {isAddedToWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
                  </button>

                    <div className="movie-trailers">
                      {trailers.map((trailer) => (
                        <div key={trailer.id} className="trailer-item">
                          <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            allowFullScreen
                          />
                        </div>
                      ))}
                    </div>
      
                  </Modal.Body>
                </Modal>
              
            

          </div>
          
        </div>
            
      );

    

};

export default Movie;