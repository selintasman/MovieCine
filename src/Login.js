import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';

function Login({ onLogin, setSessionId }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const API_URL = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;
      
      let response = await fetch(API_URL);
      let data = await response.json();
      let requestToken = data.request_token;
  
      const authURL = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}&request_token=${requestToken}&username=${username}&password=${password}`;
      let finalResponse = await fetch(authURL, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWE1YTllYjI1YzdkNzY4OGUyNTgzMTBkYTgwZWI1NSIsInN1YiI6IjY0YjUzYTdhMTIxOTdlMDBjNWY0OWUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8u4ycMy9_Q3PXP5QWXxeFsOY3lZBASrxoqWueIXjuY'
        }
      });
  
  
      if (finalResponse.ok) {
        // Validate login credentials and get the validated request token
        console.log('User logged in successfully!');
        // Parse the response to get the validated request token
        let validatedData = await finalResponse.json();
        let validatedRequestToken = validatedData.request_token;
    
        // Create a new session using the validated request token
        const sessionURL = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`;
        const sessionResponse = await fetch(sessionURL, {
          method: 'POST',
          body: JSON.stringify({ request_token: validatedRequestToken }),
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
        });

        if (sessionResponse.ok) {
          // Parse the response to get the session ID
          const sessionData = await sessionResponse.json();
          const sessionId = sessionData.session_id;
          
    
          console.log('Session nnnID:', sessionId);
          setSessionId(sessionId);
          console.log(sessionId);
          
        } 
        onLogin();
        navigate('/home');
      } 
    };

    return (

        <div className="app login-page">
      <div className="container">
        <h1 className="text-center mb-4">MovieCine</h1>
        <div className='screen'>
          <div className='screen_content'>
            <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
                <form className='login'>  
                    <div className='login__field'>
                        <i class="login__icon fas fa-lock"></i>
                        <input
                        className="login__input"
                        type="text"
                        id="username"
                        placeholder='Username'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className='login__field'>
                        <i class="login__icon fas fa-user"></i>
                        <input
                        className='login__input'
                        type="password"
                        id="password"
                        placeholder='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        />

                    <button onClick={handleLogin} type="button" className="button login__submit">
                        <span className="button__text">Login</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                    </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    );
  }

  export default Login;