const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { role, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Username Already Exists" });
        }

        const newUser = new User({ role, username, password });
        await newUser.save();

        res.status(201).json({ message: `${role} Registered Successfully` });
    } catch (error) {
        res.status(500).json({ message: "Registration Failed", error: error.message });
    }
};

module.exports = { registerUser };
