const express = require('express');
const router = express.Router();
const Servicing = require('../models/Servicing');
const uploadServiceFiles = require('../middleware/uploadServiceFiles');
const path = require('path');

// POST /api/servicing - Create new servicing record
router.post('/', uploadServiceFiles, async (req, res) => {
  try {
    const {
      contractNumber,
      servicingNumber,
      servicingDate,
      remark
    } = req.body;

    const receiptFile = req.files['receipt']?.[0];
    const receiptPath = receiptFile ? path.join('uploads/servicings', receiptFile.filename) : null;

    const photoFiles = req.files['photos'] || [];
    const photoPaths = photoFiles.map(file => path.join('uploads/servicings', file.filename));

    const newRecord = new Servicing({
      contractNumber,
      servicingNumber,
      servicingDate,
      remark,
      receipt: receiptPath,
      photos: photoPaths
    });

    const saved = await newRecord.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving servicing record:', err.message);
    res.status(500).json({ error: 'Failed to save servicing record.' });
  }
});

// GET /api/servicing/:contractNumber - Get servicing records for a contract
router.get('/:contractNumber', async (req, res) => {
  try {
    const { contractNumber } = req.params;
    const records = await Servicing.find({ contractNumber }).sort({ servicingDate: -1 });
    res.json(records);
  } catch (err) {
    console.error('Error fetching servicing records:', err.message);
    res.status(500).json({ error: 'Failed to fetch servicing records.' });
  }
});


module.exports = router;
