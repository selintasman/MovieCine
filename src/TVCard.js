import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal, show} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_IMG = "https://image.tmdb.org/t/p/w300/";
const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';


function TV ({name, poster_path, vote_average, release_date, overview, id}) {

    const [show, setShow] = useState(false);
    const [trailers, setTrailers] = useState([]);
    
    const handlePreview = () => {
      setShow(true);
    }

    const handleClose = () => {
      setShow(false);
    }


    useEffect(() => {

      const fetchTrailers = async () => {
          const API_URL = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`;
          
          let response = await fetch(API_URL, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
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





    return (
        <div className='card text-center bg-secondary mb-3'>
          <div className='card-body'>
            <img className='card-img-top' src={API_IMG+poster_path} alt={name} />
            <div className='card-body'>
              <button type='button' className='btn btn-light' onClick={handlePreview}>View More</button>
              <Modal 
              show={show}
              onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img className='card-img-top' src={API_IMG+poster_path} alt={name} />
                  <h3 className="text-center">{name}</h3>
                  <h4>IMDb: {vote_average}</h4>
                  <h5>Release Date: {release_date}</h5>
                  <br></br>
                  <h6>Overview</h6>
                  <p>{overview}</p>




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
        </div>           
      );
};

export default TV;