const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json({ message: "Order Created Successfully", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Order Creation Failed", error });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to Get Orders", error });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: "Order Status Updated", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to Update Status", error });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete Order", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};
