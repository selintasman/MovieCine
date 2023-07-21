import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const API_KEY = '21a5a9eb25c7d7688e258310da80eb55';
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
        console.log('User logged in successfully!');
        onLogin();
        navigate('/home');
      }
    };



    {/* <div class="container">
	<div class="screen">
		<div class="screen__content">
			<form class="login">
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" placeholder="User name / Email">
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password">
				</div>
				<button class="button login__submit">
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form> */}



    
  
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