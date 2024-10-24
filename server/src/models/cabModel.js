const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  cabId: { type: String, required: true, unique: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  available: { type: Boolean, default: true },
  currentTripId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip' 
  }, // Optional to track the current trip
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Assuming every cab must have a driver
  }
});


const Cab = mongoose.model('Cab', cabSchema);

module.exports = Cab;
