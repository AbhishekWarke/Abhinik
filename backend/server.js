require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Database connection
const connectDB = require("./db");

// Routes
const contractRoutes = require("./routes/contractRoutes");
const servicingRoutes = require("./routes/servicingRoutes");
const customerRoutes = require("./routes/customerRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/contracts", contractRoutes);
app.use("/api/servicing", servicingRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/complaints", complaintRoutes);

// Connect to MongoDB, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });
