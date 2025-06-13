// models/Contract.js
const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  contractNumber: {
    type: String,
    required: true,
    unique: true,
  },
  contractType: {
  type: String,
  enum: ['AMC', 'Half-Yearly'], // <-- add dash to match frontend input
  required: true
},

  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  numberOfServices: {
    type: Number,
    required: true,
  },

  contractPrice: {
    type: Number,
    required: false,
  },

  contractPDF: { // ✅ changed from pdfUrl
    type: String,
    required: true,
  },
  
}, {
  timestamps: true,
});

const Contract = mongoose.models.Contract || mongoose.model('Contract', contractSchema);


module.exports = Contract;
