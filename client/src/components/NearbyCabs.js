import React, { useState } from 'react';
import { getNearbyCabs } from '../api';
import GoogleMap from './GoogleMap';

const NearbyCabs = () => {
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [cabs, setCabs] = useState([]);

  const handleSearch = async () => {
    const data = await getNearbyCabs(location);
    setCabs(data);
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
      width: '200px',
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
    list: {
      marginTop: '20px',
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      margin: '5px 0',
      padding: '10px',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      width: '100%',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Nearby Cabs</h2>
      <input
        type="number"
        placeholder="Latitude"
        value={location.lat}
        onChange={(e) => setLocation({ ...location, lat: e.target.value })}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Longitude"
        value={location.lng}
        onChange={(e) => setLocation({ ...location, lng: e.target.value })}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Search Cabs</button>

      <GoogleMap cabs={cabs} />

      <ul style={styles.list}>
        {cabs.map(cab => (
          <li key={cab._id} style={styles.listItem}>Cab {cab.cabId}</li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyCabs;
