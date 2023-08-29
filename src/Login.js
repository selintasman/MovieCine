import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

function Login({ onLogin }) {

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
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      });
  
  
      if (finalResponse.ok) {
        console.log('User logged in successfully!');
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
                        <i class="login__icon fas fa-user"></i>
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
                        <i class="login__icon fas fa-lock"></i>
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