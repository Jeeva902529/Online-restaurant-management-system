const Complaint = require("../models/Complaint"); // ✅ FIXED model

const addComplaint = async (req, res) => {
  try {
    const { from, message } = req.body;
    if (!from || !message) {
      return res.status(400).json({ error: "From and message are required" });
    }

    const validUsers = ["cashier", "food incharge", "user"];
    if (!validUsers.includes(from.toLowerCase())) {
      return res.status(403).json({ error: "Unauthorized complaint sender" });
    }

    const newComplaint = new Complaint({ from, message });
    const savedComplaint = await newComplaint.save();

    const io = req.app.get("io");
    io.emit("newComplaint", savedComplaint);

    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { response },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    const io = req.app.get("io");
    io.emit("complaintUpdated", updatedComplaint);

    res.status(200).json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addComplaint, getComplaints, updateComplaint };
