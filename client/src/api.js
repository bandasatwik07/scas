import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// User signup
export const signup = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

// User signin
export const signin = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

// Get nearby cabs within a 5km radius
export const getNearbyCabs = async (location) => {
  return await axios.post(`${API_URL}/cabs/cabs-in-radius`, location);
};

// Book a cab
export const bookCab = async (cabId, tripDetails) => {
  return await axios.post(`${API_URL}/cabs/allocate-cab`, { cabId, ...tripDetails });
};

// Fetch trip history
export const getTripHistory = async (userId) => {
  return await axios.get(`${API_URL}/trips/history/${userId}`);
};

// Get driver details by ID
export const getDriverDetails = async (driverId) => {
  return await axios.get(`${API_URL}/driver/${driverId}`);
};
