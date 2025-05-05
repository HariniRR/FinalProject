const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserRoutes = require("./Router/RegUserR");
const bookingRoutes = require("./Router/BookingR");
const postRoutes  = require("./Router/PostR");
const feedbackRoutes = require("./Router/FeedbackR");
const contactRoutes = require("./Router/ContactR");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use("/api/users",UserRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/contacts",contactRoutes);

// Role-Based Middleware
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

app.get("/admin", requireRole("Admin"), (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Server Listening
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});