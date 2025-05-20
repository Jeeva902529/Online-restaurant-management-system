const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// POST: Mark attendance
router.post("/mark", async (req, res) => {
  const { username, role, present } = req.body;

  try {
    const attendance = new Attendance({
      username,
      role,
      present,
      date: new Date()
    });
    await attendance.save();
    res.status(200).json({ message: "Attendance marked!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving attendance", error: err });
  }
});

// GET: Today's attendance
router.get("/today", async (req, res) => {
  const today = new Date();
  const start = new Date(today.setHours(0, 0, 0, 0));
  const end = new Date(today.setHours(23, 59, 59, 999));

  try {
    const data = await Attendance.find({
      date: { $gte: start, $lte: end }
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance", error: err });
  }
});

module.exports = router;
