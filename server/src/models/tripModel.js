const mongoose = require('mongoose');


const tripSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  cabId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cab', 
    required: true 
  },
  pickupLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  dropoffLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: { 
    type: String, 
    enum: ['ongoing', 'completed', 'canceled'], 
    default: 'ongoing' 
  },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
