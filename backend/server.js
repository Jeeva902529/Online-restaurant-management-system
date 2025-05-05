require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const loginRoutes = require("./routes/loginRoutes");
const menuRoutes = require("./routes/menuRoutes");
const supportRoutes = require("./routes/support");
const bookingRoutes = require("./routes/bookingRoutes");
const appAuthRoutes = require("./routes/appAuth");
const foodRoutes = require("./routes/foodRouter");
const registerRoute = require("./routes/registerRoute");
const reviewRoutes = require("./routes/reviewRoutes");

const Order = require("./models/Order");

const app = express();

// Set up server and socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for now
    methods: ["GET", "POST"],
  },
});

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api", appAuthRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api", registerRoute);
app.use("/api/reviews", reviewRoutes);

// 📩 Support email route
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

// ✅ Corrected order route with auto-increment orderId
app.post("/api/orders", async (req, res) => {
  const { foodName, basePrice, addOns, specialInstructions, totalPrice, tableNumber } = req.body;

  try {
    // Find latest order to get next number
    const latestOrder = await Order.findOne().sort({ createdAt: -1 });

    let nextOrderNumber = 1;
    if (latestOrder && latestOrder.orderId) {
      const lastNumber = parseInt(latestOrder.orderId.replace('#', ''));
      nextOrderNumber = lastNumber + 1;
    }

    const formattedOrderId = `#${String(nextOrderNumber).padStart(3, '0')}`;

    const newOrder = new Order({
      orderId: formattedOrderId,
      foodName,
      basePrice,
      addOns,
      specialInstructions,
      totalPrice,
      tableNumber,
    });

    await newOrder.save();

    // Emit order update to clients
    io.emit("orderUpdate", { orders: [newOrder] });

    res.status(201).json(newOrder);
  } catch (error) {
    console.log("Error in creating order:", error);
    res.status(500).json({ message: "Error creating order", error });
  }
});

// Listening for incoming socket connections
io.on("connection", (socket) => {
  console.log("A new client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// ✅ Server listener
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
