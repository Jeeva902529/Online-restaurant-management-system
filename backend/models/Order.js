const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    foodItems: { type: [foodItemSchema], required: true },
    specialInstructions: { type: String, default: "" },
    totalPrice: { type: Number, required: true },
    tableNumber: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
