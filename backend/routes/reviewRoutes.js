const express = require("express");
const router = express.Router();
const {
  addComplaint,
  getComplaints,
  updateComplaint,
} = require("../controllers/reviewController");

router.post("/add-complaint", addComplaint);
router.get("/get-complaints", getComplaints);
router.put("/update-complaint/:id", updateComplaint);

module.exports = router;
