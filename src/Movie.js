import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal, show} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import YouTube from 'react-youtube';


const API_IMG = "https://image.tmdb.org/t/p/w300/";


function Movie ({title, poster_path, vote_average, release_date, overview, videos}) {

    const [show, setShow] = useState(false);
    
    const handlePreview = () => {
      setShow(true);
    }

    const handleClose = () => {
      setShow(false);
    }

    return (
        <div className='card text-center bg-secondary mb-3'>
          <div className='card-body'>
            <img className='card-img-top' src={API_IMG+poster_path} alt={title} />
            <div className='card-body'>
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
                  <p>{videos}</p>
                </Modal.Body>
              </Modal>
              
            </div>

          </div>
          {/* <h1>{title}</h1>
          <img 
            src={API_IMG+poster_path}
            alt={title} />
            <p>{overview}</p>

           */}
        </div>
            
      );

    

};

export default Movie;