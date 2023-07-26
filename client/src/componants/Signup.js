import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { Context } from '../App';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(Context)
    let navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      function handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
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
          user.setUser(r)
          navigate('/')
        })
        .catch((error) => {
          console.error('Error occurred during signup:', error);
          alert('Invalid input')
        });
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
        <button type="submit">Sign up</button>
      </form>
    </div>
    )
}
export default Signup