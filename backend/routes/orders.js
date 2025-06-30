// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

module.exports = (io) => {
  // ✅ Place new order
  router.post("/", async (req, res) => {
    const {
      foodItems,
      specialInstructions,
      totalPrice,
      tableNumber,
    } = req.body;

    try {
      const latestOrder = await Order.findOne().sort({ createdAt: -1 });

      let nextOrderNumber = 1;
      if (latestOrder && latestOrder.orderId) {
        const lastNumber = parseInt(latestOrder.orderId.replace("#", ""));
        nextOrderNumber = lastNumber + 1;
      }

      const formattedOrderId = `#${String(nextOrderNumber).padStart(3, "0")}`;

      const newOrder = new Order({
        orderId: formattedOrderId,
        foodItems,
        specialInstructions,
        totalPrice,
        tableNumber,
      });

      await newOrder.save();

      const allOrders = await Order.find().sort({ createdAt: -1 });
      const customerData = allOrders.map(order => ({
        id: order.orderId,
        tableNo: order.tableNumber,
        name: `Customer ${order.orderId}`,
        foodItems: order.foodItems.map(item => item.foodName).join(", "),
        price: order.totalPrice,
        payment: "Paid", // or derive dynamically
        mode: "Cash",     // or derive dynamically
      }));

      io.emit("orderUpdate", { orders: allOrders });
      io.emit("customerUpdate", customerData); // ✅ Realtime customer emit

      res.status(201).json(newOrder);
    } catch (error) {
      console.error("❌ Error creating order:", error);
      res.status(500).json({ message: "Error creating order", error });
    }
  });

  // ✅ Get all orders
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  });

  // ✅ Get customers
  router.get("/get-customers", async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      const customerData = orders.map(order => ({
        id: order.orderId,
        tableNo: order.tableNumber,
        name: `Customer ${order.orderId}`,
        foodItems: order.foodItems.map(item => item.foodName).join(", "),
        price: order.totalPrice,
        payment: "Paid", // mock value or use order.payment if added
        mode: "Cash",    // mock value or use order.mode if added
      }));

      res.status(200).json(customerData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching customers", error });
    }
  });

  return router;
};
