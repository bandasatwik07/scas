const Cab = require('../models/cabModel');
const User = require('../models/userModel'); // Import the User model to fetch driver details

// Add a new cab with driver assignment using driver's email
exports.addNewCab = async (req, res) => {
  try {
    const { cabId, location, driverEmail } = req.body;

    // Check if cab already exists
    const existingCab = await Cab.findOne({ cabId });
    if (existingCab) {
      return res.status(400).json({ message: 'Cab with this ID already exists' });
    }

    // Find the driver by their email
    // const driver1 = await User.findOne({ email: "bandasatwik4@gmail.com" });
    // console.log(driver1)

    const driver = await User.findOne({ email: driverEmail });
    console.log(driver)
    if (!driver || driver.type !== 1) { // Ensure the driver exists and is of type driver (type: 1)
      return res.status(400).json({ message: 'Invalid driver or driver not found' });
    }

    // Create a new cab with the assigned driver
    const newCab = new Cab({
      cabId,
      location,
      available: true, // Default status is available
      driver: driver._id // Assign the driver to the cab using the driver's ObjectId
    });

    await newCab.save();
    res.status(201).json({ message: 'Cab added successfully', cab: newCab });
  } catch (error) {
    res.status(500).json({ message: 'Error adding new cab', error });
  }
};
  




// Allocate the selected cab
exports.allocateSelectedCab = async (req, res) => {
  try {
    const { cabId } = req.body; // Cab ID selected by the user

    // Find the cab by its ID
    const selectedCab = await Cab.findById(cabId);

    if (!selectedCab) {
      return res.status(404).json({ message: 'Cab not found' });
    }

    // Check if the cab is available
    if (!selectedCab.available) {
      return res.status(400).json({ message: 'Cab is already allocated' });
    }

    // Mark the cab as unavailable
    selectedCab.available = false;
    await selectedCab.save();

    res.status(200).json({ message: 'Cab successfully allocated', cab: selectedCab });
  } catch (error) {
    res.status(500).json({ message: 'Error allocating cab', error });
  }
};

exports.getCabsInRadius = async (req, res) => {
  try {
    const { lat, lng } = req.body; // User's location (latitude and longitude)

    // Find available cabs
    const availableCabs = await Cab.find({ available: true });

    // Filter cabs within 5 km radius
    const cabsInRadius = availableCabs.filter(cab => {
      const distance = haversineDistance(lat, lng, cab.location.lat, cab.location.lng);
      return distance <= 500; // Corrected to 5km radius
    });

    if (cabsInRadius.length > 0) {
      res.status(200).json(cabsInRadius);
    } else {
      res.status(404).json({ message: 'No cabs found within 5km radius' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cabs', error });
  }
};

// Helper function: Haversine formula to calculate distance between two locations
const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = value => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

