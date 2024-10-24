import React, { useState } from 'react';

const PlanRide = () => {
  const [tripDetails, setTripDetails] = useState({ destination: '', pickupTime: '' });

  const handleSubmit = () => {
    console.log('Planning ride to:', tripDetails);
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#343a40',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      width: '250px',
      borderRadius: '5px',
      border: '1px solid #ced4da',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Plan Your Ride</h2>
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
      <button onClick={handleSubmit} style={styles.button}>Plan Ride</button>
    </div>
  );
};

export default PlanRide;
