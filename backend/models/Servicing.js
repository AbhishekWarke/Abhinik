const mongoose = require('mongoose');

const servicingSchema = new mongoose.Schema({
  contractNumber: {
    type: String,
    required: true
  },
  servicingNumber: {
    type: Number,
    required: true
  },
  servicingDate: {
    type: Date,
    required: true
  },
  remark: {
    type: String,
    required: true
  },
  receipt: {
    type: String, // PDF path
    required: true
  },
  photos: {
    type: [String], // Array of image file paths
    default: []
  }
}, { timestamps: true });

const Servicing = mongoose.model('Servicing', servicingSchema);
module.exports = Servicing;
