const express = require("express");
const router = express.Router();
const Noodle = require("../models/Noodle");

// GET all noodles
router.get("/", async (req, res) => {
  try {
    const noodles = await Noodle.find();
    res.json(noodles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching noodles" });
  }
});

// ADD a new noodle
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newNoodle = new Noodle({ name, description, price });
    await newNoodle.save();
    res.status(201).json({ message: "Noodle added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding noodle" });
  }
});

module.exports = router;
