require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

// ✅ Attach io to app (for use in controllers)
app.set("io", io);

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cart");
const loginRoutes = require("./routes/loginRoutes");
const menuRoutes = require("./routes/menuRoutes");
const supportRoutes = require("./routes/support"); // for email support
const bookingRoutes = require("./routes/bookingRoutes");
const appAuthRoutes = require("./routes/appAuth");
const foodRoutes = require("./routes/foodRouter");
const registerRoute = require("./routes/registerRoute");
const reviewRoutes = require("./routes/reviewRoutes"); // ✅ COMPLAINTS HANDLER
const attendanceRoute = require("./routes/attendance");
const orderRoutes = require("./routes/orders")(io); // Orders require io

// ✅ Use Routes
app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/support", supportRoutes); // Email support endpoint
app.use("/api/support", reviewRoutes);  // ✅ COMPLAINT API mounted correctly
app.use("/api/booking", bookingRoutes);
app.use("/api", appAuthRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api", registerRoute);
app.use("/attendance", attendanceRoute);

// 📩 Optional Support Email Endpoint
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

// ✅ Socket.io Events
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
