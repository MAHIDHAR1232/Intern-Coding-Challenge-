const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { getRatings, createRating, updateRating, deleteRating, getUserRatings } = require('../controllers/ratingController');
const { ratingValidation } = require('../utils/validation');

router.get('/', getRatings);
router.get('/me', auth, getUserRatings);
router.post('/', auth, ratingValidation, createRating);
router.put('/:id', auth, ratingValidation, updateRating);
router.delete('/:id', auth, deleteRating);

module.exports = router; 