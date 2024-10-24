
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
    const { cabId, destinationLat, destinationLng } = req.body; // Cab ID and new destination coordinates

    // Find the cab by its ID
    const selectedCab = await Cab.findById(cabId);

    if (!selectedCab) {
      return res.status(404).json({ message: 'Cab not found' });
    }

    // Check if the cab is available
    if (!selectedCab.available) {
      return res.status(400).json({ message: 'Cab is already allocated' });
    }

    // Mark the cab as unavailable and update its location to the new destination
    selectedCab.available = false;
    selectedCab.location = {
      type: 'Point',
      coordinates: [destinationLng, destinationLat], // Set the cab's location to the destination coordinates
    };

    // Save the updated cab information
    await selectedCab.save();

    res.status(200).json({ message: 'Cab successfully allocated and location updated', cab: selectedCab });
  } catch (error) {
    console.error('Error allocating cab:', error);
    res.status(500).json({ message: 'Error allocating cab', error });
  }
};


exports.getCabsInRadius = async (req, res) => {
  try {
    const { lat, lng } = req.body; // User's location (latitude and longitude)
    const radiusInKm = 50; // Radius in kilometers

    console.log("Request received:", req.body);

    // Find available cabs within the specified radius using geospatial queries
    const cabsInRadius = await Cab.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radiusInKm / 6378.1] // Convert km to radians
        }
      }
    });

    console.log("Cabs found with geospatial query:", cabsInRadius);

    // If no cabs found with geospatial query, respond with 404
    if (cabsInRadius.length === 0) {
      return res.status(404).json({ message: 'No cabs found within 50km radius' });
    }

    // Create an array with cab details including distance
    const cabsWithDistance = cabsInRadius.map(cab => {
      const distance = haversineDistance(lat, lng, cab.location.coordinates[1], cab.location.coordinates[0]);
      return { ...cab.toObject(), distance }; // Include distance in the response
    });

    // Sort the cabs by distance in ascending order
    cabsWithDistance.sort((a, b) => a.distance - b.distance);

    console.log("Cabs with distance and sorted:", cabsWithDistance);

    // Send the sorted cabs with distances in the response
    res.status(200).json(cabsWithDistance);
  } catch (error) {
    console.error('Error fetching cabs:', error);
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


