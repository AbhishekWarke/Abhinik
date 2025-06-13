// controllers/contractController.js
const Contract = require('../models/Contract'); // Mongoose model
const path = require('path');

// Create contract
const createContract = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      contractNumber,
      contractType,
      startDate,
      endDate,
      numberOfServices,
      contractPrice
    } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    // Construct the file URL (relative or full path depending on setup)
    const pdfUrl = `/uploads/${req.file.filename}`;

    const newContract = new Contract({
      customerName,
      customerEmail,
      contractNumber,
      contractType,
      startDate,
      endDate,
      numberOfServices,
      contractPrice,
      pdfUrl
    });

    await newContract.save();

    res.status(201).json({ message: 'Contract created successfully', contract: newContract });
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({ message: 'Server error while creating contract' });
  }
};

// Get all contracts
const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ message: 'Server error while fetching contracts' });
  }
};

// Get contract by user email
const getContractByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const contract = await Contract.findOne({ customerEmail: email });

    if (!contract) {
      return res.status(404).json({ message: "No contract found for this email" });
    }

    res.status(200).json(contract);
  } catch (error) {
    console.error("Error fetching contract by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createContract,
  getAllContracts,
  getContractByEmail // 👈 Add this here
};

