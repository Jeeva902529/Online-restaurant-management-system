const express = require('express');
const router = express.Router();
const RegisterModel = require('../models/registerModel');

router.post('/register', async (req, res) => {
   try {
      const { role, username, password } = req.body;

      if (!role || !username || !password) {
         return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = new RegisterModel({ role, username, password });
      await newUser.save();

      res.status(200).json({ message: "Registered Successfully" });
   } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Registration Failed" });
   }
});

module.exports = router;
