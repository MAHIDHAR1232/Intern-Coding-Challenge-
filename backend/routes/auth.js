const express = require('express');
const router = express.Router();
const { login, signup, logout } = require('../controllers/authController');
const { userValidation } = require('../utils/validation');
console.log("auth.js path");
router.post('/login', login);
router.post('/signup', userValidation, signup);
router.post('/logout', logout);

module.exports = router; 