const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cabRoutes = require('./src/routes/cabRoutes');
const authRoutes = require('./src/routes/authRoutes');
const tripRoutes = require('./src/routes/tripRoutes');
const Cab = require('./src/models/cabModel');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cabs', cabRoutes);
app.use('/api/trips', tripRoutes);

// WebSocket connection for real-time location updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Listen for cab location updates
  socket.on('updateLocation', async ({ cabId, location }) => {
    try {
      const cab = await Cab.findById(cabId);
      if (cab) {
        cab.location = location; // Update cab's location
        await cab.save();
        console.log(`Cab ${cabId} location updated`);
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
