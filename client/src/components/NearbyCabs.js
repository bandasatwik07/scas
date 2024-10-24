import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNearbyCabs, getDriverDetails } from '../api';
import GoogleMap from './GoogleMap';

const NearbyCabs = () => {
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [cabs, setCabs] = useState([]); // Initialize as an empty array
  const [drivers, setDrivers] = useState({}); // To store driver details by driverId
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = async () => {
    try {
      const response = await getNearbyCabs(location);
      // Ensure the response is in the expected format
      if (Array.isArray(response.data)) {
        setCabs(response.data); // Assuming response.data is the array of cabs
      } else {
        console.error('Unexpected response format:', response.data);
        setCabs([]); // Reset to empty array if format is incorrect
      }
    } catch (error) {
      console.error('Error fetching nearby cabs:', error);
      setCabs([]); // Reset to empty array on error
    }
  };

  // Fetch driver details for each cab
  useEffect(() => {
    const fetchDriverDetails = async (driverId) => {
      try {
        if (!drivers[driverId]) { // Only fetch if not already in state
          const data = await getDriverDetails(driverId);
          setDrivers((prevDrivers) => ({
            ...prevDrivers,
            [driverId]: data, // Store driver details by driverId
          }));
        }
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    };

    // Fetch driver details for all cabs
    cabs.forEach(cab => {
      if (cab.driver) {
        fetchDriverDetails(cab.driver); // `cab.driver` is the driver ID
      }
    });
  }, [cabs, drivers]);

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
    list: {
      marginTop: '20px',
      listStyleType: 'none',
      padding: '0',
      width: '100%',
    },
    listItem: {
      margin: '5px 0',
      padding: '10px',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.2s',
    },
    noCabsMessage: {
      marginTop: '20px',
      color: 'red',
      fontWeight: 'bold',
    },
  };

  const handleCabClick = (cabId) => {
    // Redirect to the cab booking page with the selected cabId
    navigate(`/book-cab/${cabId}`);
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

      {/* <GoogleMap cabs={cabs} /> */}

      {cabs.length === 0 ? (
        <p style={styles.noCabsMessage}>No cabs available in your current location.</p>
      ) : (
        <ul style={styles.list}>
          {cabs.map(cab => (
            <li 
              key={cab._id} 
              style={styles.listItem}
              onClick={() => handleCabClick(cab._id)} // Handle click to navigate to booking page
            >
              <strong>Cab ID:</strong> {cab.cabId}<br />
              <strong>Driver:</strong> {drivers[cab.driver] ? drivers[cab.driver].name : 'Loading...'}<br />
              <strong>Car:</strong> {cab.carModel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NearbyCabs;
