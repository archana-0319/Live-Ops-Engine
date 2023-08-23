// src/components/LoginForm.js
import React, { useState } from 'react';
import './styles/LoginForm.css';
// import SignUpForm from './SignUpForm';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='loginForm'>
      <h1 id='heading'>Login Page</h1>
      <form onSubmit={handleLogin}>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder='Username' className='input-text'/>
        <br />
          <input type="password" value={password} onChange={handlePasswordChange}  placeholder = 'Password' className='input-text' />
        <br />
        <button type="submit" className='btn'>Login</button>
        <br /> <br />
        <h5> or </h5>
        <a href='SignUpForm.js' target='_blank'> Sign Up </a>
      </form>
    </div>
  );
}

export default LoginForm;
