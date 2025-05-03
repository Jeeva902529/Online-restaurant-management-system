const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/orderController");

// Create Order
router.post("/addorder", createOrder);

// Get All Orders
router.get("/orders", getOrders);

// Update Order Status
router.put("/updateorder/:id", updateOrderStatus);

// Delete Order
router.delete("/deleteorder/:id", deleteOrder);

module.exports = router;
