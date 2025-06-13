const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Complaint = require("../models/Complaint");
const Contract = require("../models/Contract");

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/complaints/";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Generate complaint ID
function generateComplaintId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CMP-ABNK${randomNum}`;
}

// ✅ POST a new complaint
router.post("/", upload.array("files", 5), async (req, res) => {
  try {
    const { email, problemDescription } = req.body;
    const filePaths = req.files?.map((file) => file.path) || [];

    // ✅ Get customerName from Contract collection using customerEmail
    const contract = await Contract.findOne({ customerEmail: email });
    if (!contract) {
      return res.status(404).json({ message: "No contract found for this email." });
    }

    const customerName = contract.customerName;

    const newComplaint = new Complaint({
      complaintId: generateComplaintId(),
      customerName,
      email,
      problemDescription,
      files: filePaths,
      seenByAdmin: false,
    });

    await newComplaint.save();
    res.status(201).json({
      message: "Complaint submitted successfully!",
      complaint: newComplaint,
    });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ error: "Server error while submitting complaint" });
  }
});

// ✅ GET complaints (filtered by email if provided)
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    let complaints;
    if (email) {
      complaints = await Complaint.find({ email }).sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find().sort({ createdAt: -1 }); // Show all
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Server error while fetching complaints." });
  }
});


// ✅ PUT: update complaint status
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { seenByAdmin } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { seenByAdmin },
      { new: true }
    );

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
