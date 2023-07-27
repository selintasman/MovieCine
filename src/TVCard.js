import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal, show} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_IMG = "https://image.tmdb.org/t/p/w300/";


function TV ({name, poster_path, vote_average, release_date, overview}) {

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
                </Modal.Body>
              </Modal>
              
            </div>
          </div>
        </div>           
      );
};

export default TV;