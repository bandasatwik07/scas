const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password, name, phone, email, type } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = new User({ username, password, name, phone, email, type });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign(
        { id: user._id, username: user.username, type: user.type }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
      res.status(200).json({ token, message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
