import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import PopularMovies from './PopularMovies';
import NowPlayingMovies from './NowPlaying';
import TopRatedMovies from './TopRatedMovies';
import NavBar from './NavBar';
import UpcomingMovies from './UpcomingMovies';
import AiringToday from './AiringToday';
import OnTheAir from './OnTheAir';
import TopRatedTV from './TopRatedTV';
import PopularTV from './PopularTV';
import Watchlist from './Watchlist';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
      <BrowserRouter>
        {isLoggedIn && <NavBar/>}
        <Routes>
          <Route path="/" element={<Login   setSessionId={setSessionId} onLogin={handleLogin} />} />
          <Route path="/home" element={ isLoggedIn ? <Home sessionId={sessionId}  /> :  <Navigate to="/" />} />
          <Route path="/popular" element={<PopularMovies/>} />
          <Route path="/nowplaying" element={<NowPlayingMovies/>} />
          <Route path="/movie/top-rated" element={<TopRatedMovies/>} />
          <Route path="/movie/upcoming" element={<UpcomingMovies/>} />
          <Route path="/tv/airing-today" element={<AiringToday/>} />
          <Route path="/tv/on-the-air" element={<OnTheAir/>} />
          <Route path="/tv/top-rated" element={<TopRatedTV/>} />
          <Route path="/tv/popular" element={<PopularTV/>} />
          <Route path="/watchlist" element={<Watchlist/>} />
        </Routes>
      </BrowserRouter>
          
  );
}
export default App;

