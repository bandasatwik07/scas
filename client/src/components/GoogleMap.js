import React from 'react';

const GoogleMap = ({ cabs }) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <iframe
      width="600"
      height="450"
      src={`https://www.google.com/maps/embed/v1/search?key=${googleMapsApiKey}&q=cabs`}
      allowFullScreen
    />
  );
};

export default GoogleMap;
