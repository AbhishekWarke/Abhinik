const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintId: { type: String, required: true, unique: true }, // NEW
    customerName: String,
    email: String,
    problemDescription: String,
    files: [String],
    seenByAdmin: { type: Boolean, default: false }, // NEW
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);