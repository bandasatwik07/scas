import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import CabBooking from './components/CabBooking';
import NearbyCabs from './components/NearbyCabs';
import TripHistory from './components/TripHistory';
import DriverDetails from './components/DriverDetails';
import PlanRide from './components/PlanRide';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            {/* Correcting the element attribute for routes */}
            {/* <Route path="/signin" element={<Signin onLogin={(token) => setToken(token)} />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/book-cab/:cabId" element={<CabBooking />} />
            <Route path="/nearby-cabs" element={<NearbyCabs />} />
            <Route path="/trip-history" element={<TripHistory />} />
            <Route path="/driver/:driverId" element={<DriverDetails />} />
            <Route path="/plan-ride" element={<PlanRide />} />
            
            {/* Adding a route for the home path */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
