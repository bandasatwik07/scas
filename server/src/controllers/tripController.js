const Trip = require('../models/tripModel'); // Import Trip model

// Fetch trip history for a user
exports.getTripHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const tripHistory = await Trip.find({ userId }).populate('cabId', 'cabId'); // Optional: Populate cab details

    if (tripHistory.length === 0) {
      return res.status(404).json({ message: 'No trips found for the user' });
    }

    res.status(200).json(tripHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip history', error });
  }
};
