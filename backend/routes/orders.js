const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 📌 GET user orders
router.get("/my-orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders (you can filter by userId or tableNumber later)
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// 📌 PLACE a new order
router.post("/place-order", async (req, res) => {
  const { foodName, basePrice, addOns, specialInstructions, totalPrice, tableNumber } = req.body;

  // Validate input
  if (!foodName || !basePrice || !totalPrice || !tableNumber) {
    return res.status(400).json({ message: "All fields (foodName, basePrice, totalPrice, tableNumber) are required" });
  }

  try {
    // Create new order with tableNumber
    const newOrder = new Order({
      foodName,
      basePrice,
      addOns,
      specialInstructions,
      totalPrice,
      tableNumber, // Include tableNumber in the database
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

// 📌 DELETE an order
router.delete("/cancel-order/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order" });
  }
});

module.exports = router;