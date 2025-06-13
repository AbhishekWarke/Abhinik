const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.post("/create", async (req, res) => {
  try {
    const { uid, name, email, address, mobile } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ message: "UID and email are required." });
    }

    // Check if user already exists
    const existing = await Customer.findOne({ uid });
    if (existing) {
      return res.status(200).json({ message: "Customer already exists." });
    }

    const newCustomer = new Customer({
      uid,
      name,
      email,
      address,
      mobile,
    });

    await newCustomer.save();
    res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
