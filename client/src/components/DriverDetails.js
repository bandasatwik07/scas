import React, { useState, useEffect } from 'react';
import { getDriverDetails } from '../api';

const DriverDetails = ({ driverId }) => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      const data = await getDriverDetails(driverId);
      setDriver(data);
    };

    fetchDriverDetails();
  }, [driverId]);

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f5',
    },
    card: {
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '300px',
      textAlign: 'center',
    },
    header: {
      fontSize: '1.5rem',
      marginBottom: '10px',
    },
    detail: {
      fontSize: '1.1rem',
      margin: '5px 0',
    },
    loading: {
      fontSize: '1.2rem',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      {driver ? (
        <div style={styles.card}>
          <h2 style={styles.header}>Driver Details</h2>
          <p style={styles.detail}>Name: {driver.name}</p>
          <p style={styles.detail}>Phone: {driver.phone}</p>
        </div>
      ) : (
        <p style={styles.loading}>Loading driver details...</p>
      )}
    </div>
  );
};

export default DriverDetails;
