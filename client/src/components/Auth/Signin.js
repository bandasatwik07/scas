import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { signin } from '../../api'; // Import the signin function from your API file
import '../styles/signin.css';

const Login = () => {
  const [email, setEmail] = useState(''); // Change from username to email
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signin({ email, password }); // Use signin function from api.js

      if (response.status === 200) { // Check for successful response
        const data = response.data; // Get the response data
        // You can save the token in localStorage or state if needed
        // localStorage.setItem('token', data.token);
        // Redirect to dashboard or any other page upon success
        navigate('/'); // Redirect to home page or dashboard
      } else {
        setErrorMessage('Invalid email or password'); // Update error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle Axios error
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Something went wrong, please try again.');
      } else {
        setErrorMessage('Something went wrong, please try again.');
      }
    }
  };

  return (
    <div style={{
      display: 'flex', // Enable Flexbox
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      height: '100vh', // Full viewport height
      backgroundColor: '#f7f7f7', // Optional background color for contrast
    }}>
      <div className="login-container" style={{
        maxWidth: '400px',
        width: '100%', // Make it responsive
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center' }}>Sign-in</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email" // Change type to email for validation
              placeholder="Email" // Update placeholder
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }} // Match styles with password
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }} // Consistent styling
            />
          </div>
          <div>
            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: '#fff',
              cursor: 'pointer'
            }}>Login</button>
          </div>
          {errorMessage && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        </form>
        
        {/* Add a link to the signup page */}
        <div className="signup-redirect" style={{ textAlign: 'center', marginTop: '10px' }}>
          <p>New user? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
