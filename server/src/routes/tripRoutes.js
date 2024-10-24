const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/history/:userId', tripController.getTripHistory);

module.exports = router;
