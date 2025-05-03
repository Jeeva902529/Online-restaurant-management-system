// controllers/foodController.js
const Food = require("../models/Food");

// Add Food
const addFood = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const newFood = new Food({ name, price, image });
    await newFood.save();
    res.status(201).json({ message: "Food Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to Add Food" });
  }
};

// Get All Foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch Foods" });
  }
};

module.exports = { addFood, getAllFoods };
