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
          navigate('/profile')
        })
        .catch((error) => {
          console.error('Error occurred during signup:', error);
          alert('Invalid input')
        });
      }
    return (
    <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle} htmlFor="username">Create Username:</label>
          <input 
            style={inputStyle}
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="password">Create Password:</label>
          <input
            style={inputStyle}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button style={submitButtonStyle} type="submit">Sign up</button>
      </form>
    </div>
    )
}

const containerStyle = {
  backgroundColor: 'rgb(204, 204, 204)',
  paddingTop: '5%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh', // Use minHeight to ensure the container takes the full viewport height
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '20px',
  backgroundColor: 'rgb(0, 220, 255)',
  width: '80%', // Adjust the width to make it responsive
  maxWidth: '400px', // Set a maximum width for larger screens
};

const labelStyle = {
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%', // Make the input width 100% to adapt to the container width
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '3px',
};

const submitButtonStyle = {
  padding: '0.5rem 1rem',
  margin: '2%',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  backgroundColor: 'rgb(204, 204, 204)',
  color: 'white',
};

// Media query for smaller screens (adjust the values as needed)
if (window.matchMedia('(max-width: 600px)').matches) {
  formStyle.width = '90%';
}

export default Signup