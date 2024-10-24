import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bookCab } from '../api';

const CabBooking = () => {
  const location = useLocation();
  const { cabId, currentLocation } = location.state || {};

  // Initial state for trip details with the current pickup location filled in
  const [tripDetails, setTripDetails] = useState({
    destinationLat: '',
    destinationLng: '',
    pickupLat: currentLocation?.lat || '', // Fill with current location latitude
    pickupLng: currentLocation?.lng || '', // Fill with current location longitude
  });
  const [message, setMessage] = useState('');

  // Handle book button click
  const handleBook = async () => {
    try {
      // Call the API function with cabId and trip details
      const response = await bookCab(cabId, {
        destinationLat: tripDetails.destinationLat,
        destinationLng: tripDetails.destinationLng,
        pickupLat: tripDetails.pickupLat,
        pickupLng: tripDetails.pickupLng,
      });

      // Check if the response indicates success
      if (response.status === 200) {
        setMessage('Cab booked successfully!');
      } else {
        setMessage('Failed to book the cab.');
      }
    } catch (err) {
      setMessage('Failed to book the cab.');
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f9',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      width: '300px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007BFF',
      color: '#fff',
      fontSize: '1rem',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
      width: '300px',
    },
    message: {
      marginTop: '15px',
      color: message.includes('successfully') ? 'green' : 'red',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Book Your Cab</h2>
      <input
        type="text"
        placeholder="Pickup Latitude"
        value={tripDetails.pickupLat}
        readOnly // Auto-filled, no changes allowed
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Pickup Longitude"
        value={tripDetails.pickupLng}
        readOnly // Auto-filled, no changes allowed
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Destination Latitude"
        value={tripDetails.destinationLat}
        onChange={(e) => setTripDetails({ ...tripDetails, destinationLat: e.target.value })}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Destination Longitude"
        value={tripDetails.destinationLng}
        onChange={(e) => setTripDetails({ ...tripDetails, destinationLng: e.target.value })}
        style={styles.input}
      />
      <button onClick={handleBook} style={styles.button}>
        Book Cab
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default CabBooking;
