require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const contractRoutes = require("./routes/contractRoutes");
const servicingRoutes = require("./routes/servicingRoutes");
const customerRoutes = require("./routes/customerRoutes");
const complaintRoutes = require("./routes/complaintRoutes"); // ✅ newly added

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/contracts", contractRoutes);
app.use("/api/servicing", servicingRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/complaints", complaintRoutes); // ✅ mounted complaint route

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
