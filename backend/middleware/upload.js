const multer = require('multer');
const path = require('path');

// Storage configuration for contracts
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/contracts'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (only PDFs)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const uploadContract = multer({ storage, fileFilter }).single('contractPDF');

module.exports = uploadContract;
