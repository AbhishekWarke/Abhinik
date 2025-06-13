const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  contractNumber: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  contractType: { type: String, required: true },
  numberOfServices: { type: Number, required: true },
  contractPrice: { type: Number, required: true },  // <-- Add this line
  contractPDF: { type: String }, // Path to uploaded file
}, { timestamps: true });

module.exports = mongoose.model("Contract", contractSchema);
