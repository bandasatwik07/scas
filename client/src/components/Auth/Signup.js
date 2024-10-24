import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import '../styles/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    email: '',
    type: '0',  // Default to user type 0 (user)
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Updated to useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to login page after successful signup
        navigate('/signin'); // Updated to use navigate
      } else {
        setErrorMessage('Failed to register. Please check your details.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong, please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="0">User</option>
            <option value="1">Admin</option>
          </select>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className="signin-redirect">
        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </div>
    </div>
  );
};

export default Signup;
