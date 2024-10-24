import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNearbyCabs } from '../api';
import GoogleMapComponent from './GoogleMapComponent';

const NearbyCabs = () => {
  const [location, setLocation] = useState({ type: 'Point', coordinates: [0.0, 0.0] });
  const [cabs, setCabs] = useState([]); // Initialize as an empty array
  const [showCabs, setShowCabs] = useState(false); // Control what is shown on the map
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = async () => {
    try {
      const response = await getNearbyCabs({ // Send the GeoJSON formatted location
        lat: location.coordinates[1], // Latitude
        lng: location.coordinates[0] // Longitude
      });
      if (response.status === 404) {
        setCabs([]);
        setShowCabs(false);
      } else if (Array.isArray(response.data)) {
        setCabs(response.data);
        setShowCabs(true);
      } else {
        setCabs([]);
        setShowCabs(false);
      }
    } catch (error) {
      console.error('Error fetching nearby cabs:', error);
      setCabs([]);
      setShowCabs(false);
    }
  };

  const setUserLocation = (location) => {
    setLocation({ type: 'Point', coordinates: [location.lng, location.lat] }); // Updated to set GeoJSON
    setShowCabs(false);
  };

  // Handle navigation to the booking page
  const handleCabClick = (cabId) => {
    // Passing both cabId and current location
    navigate(`/book-cab/${cabId}`, {
      state: { 
        cabId, 
        currentLocation: {
          lat: location.coordinates[1], // Latitude
          lng: location.coordinates[0], // Longitude
        } 
      }
    });
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.header}>Nearby Cabs</h2>
        <input
          type="number"
          placeholder="Latitude"
          value={location.coordinates[1]} // Update to get latitude from coordinates
          onChange={(e) => setLocation({ ...location, coordinates: [location.coordinates[0], parseFloat(e.target.value)] })} // Set latitude
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={location.coordinates[0]} // Update to get longitude from coordinates
          onChange={(e) => setLocation({ ...location, coordinates: [parseFloat(e.target.value), location.coordinates[1]] })} // Set longitude
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search Cabs</button>

        <GoogleMapComponent setUserLocation={setUserLocation} />

        {showCabs && cabs.length > 0 && (
          <div style={styles.cabList}>
            <h3>Available Cabs</h3>
            {cabs.map((cab) => (
              <div
                key={cab._id}
                style={styles.cabItem}
                onClick={() => handleCabClick(cab._id)}
              >
                <strong>Cab ID:</strong> {cab.cabId} <br />
                <strong>Location:</strong> {cab.location.coordinates[1]}, {cab.location.coordinates[0]} {/* Accessing GeoJSON coordinates */}
                <br />
                <strong>Distance:</strong> {cab.distance.toFixed(2)} km {/* Displaying distance from user */}
              </div>
            ))}
          </div>
        )}

        {cabs.length === 0 && showCabs && (
          <p style={styles.noCabsMessage}>No cabs available in your current location.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#e9ecef',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: '600px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto', // Ensure the box is centered
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#343a40',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '80%',
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
    width: '80%',
  },
  cabList: {
    marginTop: '20px',
    textAlign: 'center',
    width: '100%',
  },
  cabItem: {
    backgroundColor: '#e9ecef',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    width: '80%',
    textAlign: 'left',
    margin: '10px auto', // Center items within the container
  },
  noCabsMessage: {
    marginTop: '20px',
    color: 'red',
    fontWeight: 'bold',
  },
};

export default NearbyCabs;
