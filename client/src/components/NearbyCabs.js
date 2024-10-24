import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNearbyCabs } from '../api';
import GoogleMapComponent from './GoogleMapComponent';

const NearbyCabs = () => {
  const [location, setLocation] = useState({ type: 'Point', coordinates: [0.0, 0.0] });
  const [availableCabs, setAvailableCabs] = useState([]); // State for available cabs
  const [engagedCabs, setEngagedCabs] = useState([]); // State for engaged cabs
  const [showCabs, setShowCabs] = useState(false); // Control what is shown on the map
  const [cabType, setCabType] = useState('available'); // Default to available cabs
  const [message, setMessage] = useState(''); // Message state for feedback
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = async () => {
    try {
      const response = await getNearbyCabs({
        lat: location.coordinates[1],
        lng: location.coordinates[0]
      });

      if (response.status === 404) {
        setAvailableCabs([]);
        setEngagedCabs([]);
        setShowCabs(false);
      } else if (Array.isArray(response.data)) {
        const available = response.data.filter(cab => cab.available); // Assuming cab has an `available` property
        const engaged = response.data.filter(cab => !cab.available);
        setAvailableCabs(available);
        setEngagedCabs(engaged);
        setShowCabs(true);
      } else {
        setAvailableCabs([]);
        setEngagedCabs([]);
        setShowCabs(false);
      }
    } catch (error) {
      console.error('Error fetching nearby cabs:', error);
      setAvailableCabs([]);
      setEngagedCabs([]);
      setShowCabs(false);
    }
  };

  const setUserLocation = (location) => {
    setLocation({ type: 'Point', coordinates: [location.lng, location.lat] });
    setShowCabs(false);
  };

  // Handle navigation to the booking page or show engaged message
  const handleCabClick = (cabId, isAvailable) => {
    if (isAvailable) {
      // Navigate to booking if cab is available
      navigate(`/book-cab/${cabId}`, {
        state: { 
          cabId, 
          currentLocation: {
            lat: location.coordinates[1],
            lng: location.coordinates[0],
          } 
        }
      });
    } else {
      // Display engaged message if cab is already in use
      setMessage('Cab is already engaged in another trip.');
      setTimeout(() => {
        setMessage(''); // Clear message after 3 seconds
      }, 3000);
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.header}>Nearby Cabs</h2>
        <input
          type="number"
          placeholder="Latitude"
          value={location.coordinates[1]}
          onChange={(e) => setLocation({ ...location, coordinates: [location.coordinates[0], parseFloat(e.target.value)] })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={location.coordinates[0]}
          onChange={(e) => setLocation({ ...location, coordinates: [parseFloat(e.target.value), location.coordinates[1]] })}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search Cabs</button>

        <GoogleMapComponent setUserLocation={setUserLocation} />

        {/* Toggle for cab type */}
        <div style={styles.cabToggle}>
          <label>
            <input 
              type="radio" 
              value="available" 
              checked={cabType === 'available'} 
              onChange={() => setCabType('available')} 
            />
            Available Cabs
          </label>
          <label>
            <input 
              type="radio" 
              value="engaged" 
              checked={cabType === 'engaged'} 
              onChange={() => setCabType('engaged')} 
            />
            Engaged Cabs
          </label>
        </div>

        {message && <p style={styles.engagedMessage}>{message}</p>} {/* Show engaged message */}

        {showCabs && cabType === 'available' && availableCabs.length > 0 && (
          <div style={styles.cabList}>
            <h3>Available Cabs</h3>
            {availableCabs.map((cab) => (
              <div
                key={cab._id}
                style={styles.cabItem}
                onClick={() => handleCabClick(cab._id, true)} // Available cab
              >
                <strong>Cab ID:</strong> {cab.cabId} <br />
                <strong>Location:</strong> {cab.location.coordinates[1]}, {cab.location.coordinates[0]}
                <br />
                <strong>Distance:</strong> {cab.distance.toFixed(2)} km
              </div>
            ))}
          </div>
        )}

        {showCabs && cabType === 'engaged' && engagedCabs.length > 0 && (
          <div style={styles.cabList}>
            <h3>Engaged Cabs</h3>
            {engagedCabs.map((cab) => (
              <div
                key={cab._id}
                style={styles.cabItem}
                onClick={() => handleCabClick(cab._id, false)} // Engaged cab
              >
                <strong>Cab ID:</strong> {cab.cabId} <br />
                <strong>Location:</strong> {cab.location.coordinates[1]}, {cab.location.coordinates[0]}
                <br />
                <strong>Distance:</strong> {cab.distance.toFixed(2)} km
              </div>
            ))}
          </div>
        )}

        {showCabs && cabType === 'available' && availableCabs.length === 0 && (
          <p style={styles.noCabsMessage}>No available cabs in your current location.</p>
        )}
        
        {showCabs && cabType === 'engaged' && engagedCabs.length === 0 && (
          <p style={styles.noCabsMessage}>No engaged cabs in your current location.</p>
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
  cabToggle: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
    width: '80%',
  },
  engagedMessage: {
    marginTop: '10px',
    color: 'red',
    fontWeight: 'bold',
  },
  noCabsMessage: {
    marginTop: '20px',
    color: 'red',
    fontWeight: 'bold',
  },
};

export default NearbyCabs;
