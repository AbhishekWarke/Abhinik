const mongoose = require('mongoose');
require('dotenv').config(); // So that we can use .env variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the app if cannot connect
  }
};

module.exports = connectDB;
