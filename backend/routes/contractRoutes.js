const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Contract = require('../models/Contract');
const router = express.Router();

// Multer config to upload PDFs to uploads/contracts folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/contracts');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/contracts - create/upload a new contract
router.post('/', upload.single('contractPDF'), async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      contractNumber,
      startDate,
      endDate,
      contractType,
      numberOfServices,
      contractPrice,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Contract PDF is required.' });
    }

    const newContract = new Contract({
      customerName,
      customerEmail,
      contractNumber,
      startDate,
      endDate,
      contractType,
      numberOfServices,
      contractPrice,
      contractPDF: req.file.filename,
    });

    await newContract.save();

    res.status(201).json({ message: 'Contract created successfully', contract: newContract });
  } catch (error) {
    console.error('Error saving contract:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/contracts - get all contracts
router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ NEW ROUTE: GET /api/contracts/user?email=... - get contract by customerEmail
router.get('/user', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required' });
    }

    const contract = await Contract.findOne({ customerEmail: email });
    if (!contract) {
      return res.status(404).json({ message: 'No contract found for this email' });
    }

    res.status(200).json(contract);
  } catch (error) {
    console.error('Error fetching contract by email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/contracts/:id - delete a contract by ID
router.delete('/:id', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Delete the contract PDF from the uploads folder
    const filePath = path.join(__dirname, '../uploads/contracts/', contract.contractPDF);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await contract.deleteOne();

    res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error('Error deleting contract:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
