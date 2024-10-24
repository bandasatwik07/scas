import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#e9ecef',
      textAlign: 'center',
    },
    header: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#343a40',
    },
    link: {
      fontSize: '1.2rem',
      margin: '0 10px',
      textDecoration: 'none',
      color: '#007BFF',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Smart Cab Allocation System</h1>
      <div>
        {/* <Link to="/book-cab" style={styles.link}>Book a Cab</Link> | */}
        <Link to="/nearby-cabs" style={styles.link}>Nearby Cabs</Link> 
      </div>
    </div>
  );
};

export default Home;
