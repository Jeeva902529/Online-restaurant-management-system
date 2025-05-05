const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 📌 PLACE a new order (with auto-generated orderId)
router.post("/place-order", async (req, res) => {
  const { foodName, basePrice, addOns, specialInstructions, totalPrice, tableNumber } = req.body;

  if (!foodName || !basePrice || !totalPrice || !tableNumber) {
    return res.status(400).json({ message: "All fields (foodName, basePrice, totalPrice, tableNumber) are required" });
  }

  try {
    // Auto-generate orderId like #001, #002
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    let nextOrderNumber = 1;
    if (lastOrder && lastOrder.orderId) {
      nextOrderNumber = parseInt(lastOrder.orderId.replace("#", "")) + 1;
    }
    const formattedOrderId = `#${String(nextOrderNumber).padStart(3, "0")}`;

    const newOrder = new Order({
      foodName,
      basePrice,
      addOns,
      specialInstructions,
      totalPrice,
      tableNumber,
      orderId: formattedOrderId,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

module.exports = router;
