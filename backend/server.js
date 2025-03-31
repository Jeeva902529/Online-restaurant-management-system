require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const loginRoutes = require("./routes/loginRoutes");
const menuRoutes = require("./routes/menuRoutes");
const supportRoutes = require("./routes/support");

const foodRoutes = [
  "momos", "biryani", "fried-rice", "halwa", "dosa", "pasta", "burger",
  "idli", "naan", "roll", "pizza", "sandwich", "cake", "icecream", "cookies",
  "pie", "brownies", "doughnuts", "frieddesserts", "pudding", "pastries",
  "gulabjamun", "jalebi", "noodles"
];

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Change this to your frontend URL
  credentials: true,
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Use routes
app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/support", supportRoutes);

// Register food routes dynamically
foodRoutes.forEach((route) => {
  app.use(`/api/${route}`, require(`./routes/${route}`));
});

// 📩 Support Page - Email Sending Route
app.post("/api/support", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Support Request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
