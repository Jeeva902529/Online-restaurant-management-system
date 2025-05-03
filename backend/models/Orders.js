const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending", // default status pending
  },
});

const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

module.exports = Orders;
