// src/components/SignUpForm.js
import React, { useState } from 'react';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Sign-up successful');
      } else {
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder='username'/>
        <br />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder='Password'/>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
