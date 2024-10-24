const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  cabId: { type: String, required: true, unique: true },
  location: {
    type: {
      type: String, // 'Point' for 2D index
      enum: ['Point'], // Mongoose will enforce this
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat] (longitude first)
      required: true
    }
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

// Create a geospatial index
cabSchema.index({ location: '2dsphere' });

const Cab = mongoose.model('Cab', cabSchema);

module.exports = Cab;
