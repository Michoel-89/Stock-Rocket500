import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('Login request failed');
        }
      })
      .then((r) => {
        setUsername('');
        setPassword('');
        console.log('signed in');
        user.setUser(r);
        navigate(`/`);
      })
      .catch((error) => {
        console.error('Error occurred during login:', error);
        alert('Invalid input');
      });
  }

  function handleSignupClick() {
    navigate('/signup');
  }

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" style={labelStyle}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="password" style={labelStyle}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={inputStyle}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button type="submit" style={submitButtonStyle}>
            Login
          </button>
          <button onClick={handleSignupClick} style={submitButtonStyle}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  backgroundColor: 'silver',
  paddingTop: '5%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
};

const labelStyle = {
  fontWeight: 'bold',
};

const inputStyle = {
  width: '250px',
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
  backgroundColor: '#4CAF50',
  color: 'white',
};

export default Login;
