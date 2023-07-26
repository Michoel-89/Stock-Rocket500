
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { Context } from '../App';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useContext(Context);
  let navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const userLogin = {
        username: e.target.username.value,
        password: e.target.password.value,
    }
    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      })
      .then(r => {
        if(r.ok) { 
          return r.json()
        }
        else {
          throw new Error('Login request failed');
        }
      })
        
      .then(r => {
        setUsername('');
        setPassword('');
        console.log('signed in')
        user.setUser(r)
        navigate(`/`)
      })
      .catch((error) => {
        console.error('Error occurred during login:', error);
        alert('Invalid input')
      });
      }
      function handleSignupClick() {
        navigate('/signup')
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignupClick}>Signup</button>
    </div>
  );
}

export default Login