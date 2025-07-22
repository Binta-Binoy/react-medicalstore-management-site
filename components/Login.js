import React, { useState } from 'react';
import './Login.css'; // ✅ Import the CSS

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]?.password === password) {
      const userData = { username };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
        <h3>Login</h3><br></br><br></br>
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
        <button className="btn btn-primary w-100 mt-2" onClick={handleLogin}>
          Login
        </button>
      </div>
  );
}

export default Login;
