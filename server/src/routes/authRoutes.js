const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// User registration
router.post('/signup', register);

// User login
router.post('/signin', login);

module.exports = router;
