import React, { useState } from 'react';
import { bookCab } from '../api';

const CabBooking = ({ cabId }) => {
  const [tripDetails, setTripDetails] = useState({ destination: '', pickupTime: '' });
  const [message, setMessage] = useState('');

  const handleBook = async () => {
    try {
      await bookCab(cabId, tripDetails);
      setMessage('Cab booked successfully!');
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
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      fontSize: '1rem',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      marginTop: '15px',
      color: message.includes('successfully') ? 'green' : 'red',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Book Cab</h2>
      <input
        type="text"
        placeholder="Destination"
        value={tripDetails.destination}
        onChange={(e) => setTripDetails({ ...tripDetails, destination: e.target.value })}
        style={styles.input}
      />
      <input
        type="datetime-local"
        value={tripDetails.pickupTime}
        onChange={(e) => setTripDetails({ ...tripDetails, pickupTime: e.target.value })}
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
