const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected successfully");
      break; // exit loop on success
    } catch (error) {
      console.error(`❌ MongoDB connection failed: ${error.message}`);
      retries -= 1;
      if (!retries) {
        console.error("🚨 All retries exhausted. Exiting...");
        process.exit(1);
      }
      console.log(`🔄 Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;
