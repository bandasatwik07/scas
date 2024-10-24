const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },         // New field for name
  phone: { type: String, required: true },        // New field for phone number
  email: { type: String, required: true, unique: true },  // New field for email
  type: { type: Number, enum: [0, 1, 2], required: true },   // New field for user type (0 for user, 1 for driver, 2 for the admin)
  currentTripId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip' 
  } // Optional, for an ongoing trip
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
