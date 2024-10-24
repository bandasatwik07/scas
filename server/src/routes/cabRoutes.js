const express = require('express');
const { addNewCab,getCabsInRadius, allocateSelectedCab } = require('../controllers/cabController');
const router = express.Router();

// Route to add a new cab
router.post('/newcab', addNewCab);

// Route to get all cabs within a 5km radius
router.post('/cabs-in-radius', getCabsInRadius);

// Route to allocate the selected cab
router.post('/allocate-cab', allocateSelectedCab);

module.exports = router;
