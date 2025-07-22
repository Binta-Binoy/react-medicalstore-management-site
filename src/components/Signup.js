import React, { useState } from 'react';
import './Signup.css'

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username || !password) return alert("Username and password required");

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      alert('User already exists');
      return;
    }
    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));

    const userData = { username };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Signup successful! Please log in.');
    onSignupSuccess(); // ✅ switch to login view

  };

  return (
    <div className='container'>
      {/* <div style={{ margin: '10px' }}> */}
        <h3>Signup</h3><br></br><br></br>
        <input
          className="form-control"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        /><br></br><br></br>
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /><br></br><br></br>
        <button onClick={handleSignup} className='btn-md btn-info'>Signup</button>
      </div>
  );
}

export default Signup;