import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Assuming you're using react-router for routing
import '../styles/signin.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to dashboard or any other page upon success
        window.location.href = '/';
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong, please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign-in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      
      {/* Add a link to signup page */}
      <div className="signup-redirect">
        <p>New user? <Link to="/signup">Sign up here</Link></p>
      </div>
    </div>
  );
};

export default Login;
