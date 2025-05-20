const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  username: String,
  role: String,
  present: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
