import React, { useState, useEffect } from 'react';
import { getTripHistory } from '../api';

const TripHistory = ({ userId }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getTripHistory(userId);
      setTrips(data);
    };

    fetchHistory();
  }, [userId]);

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
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      width: '100%',
      maxWidth: '600px',
    },
    listItem: {
      backgroundColor: '#ffffff',
      border: '1px solid #ced4da',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Trip History</h2>
      <ul style={styles.list}>
        {trips.map(trip => (
          <li key={trip._id} style={styles.listItem}>
            Destination: {trip.destination}, Date: {new Date(trip.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripHistory;
