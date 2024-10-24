import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ setUserLocation }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default center (NYC)
  const [userLocation, setUserLocationState] = useState(null); // For storing user location
  const googleMapsApiKey = "AIzaSyB1HrYb0sfIbTZ7aRmBUg7EFtKvZ5vkGwo"; // Replace with your actual API key

  const containerStyle = {
    width: '600px',
    height: '450px',
  };

  // Function to get the user's current location
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({
            lat: latitude,
            lng: longitude,
          });
          setUserLocationState({
            lat: latitude,
            lng: longitude,
          });
          setUserLocation({ lat: latitude, lng: longitude }); // Pass location to parent component
        },
        (error) => {
          console.error("Error getting current location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
        >
          {/* Display user's location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon for current location
              }}
              label="You are here"
            />
          )}
        </GoogleMap>
      </LoadScript>

      {/* Button to get current location */}
      <button onClick={handleGetCurrentLocation} style={styles.button}>
        Show My Location
      </button>
    </div>
  );
};

// Inline styles
const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default GoogleMapComponent;
