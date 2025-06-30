const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    message: { type: String, required: true },
    response: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
