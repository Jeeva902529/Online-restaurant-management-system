// routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const { addFood, getAllFoods } = require('../controllers/foodController');

// Add Food
router.post('/addfood', addFood);

// Get All Foods
router.get('/foods', getAllFoods);

module.exports = router;
