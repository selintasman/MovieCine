import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import PopularMovies from './PopularMovies';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={ isLoggedIn ? <Home /> :  <Navigate to="/" />} />
          <Route path="/movies" element={<PopularMovies/>} />
        </Routes>
      </BrowserRouter>
          
  );
}
export default App;

