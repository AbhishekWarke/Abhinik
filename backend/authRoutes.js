const express = require('express');
const { createCustomToken } = require('./firebaseAdmin');
const Contract = require('./models/Contract'); // Make sure this path is correct

const router = express.Router();

// Route to generate custom token
router.post('/generate-custom-token', async (req, res) => {
  const { userId } = req.body;  // Get user ID from request body
  
  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  try {
    const token = await createCustomToken(userId);  // Call function to generate token
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send('Error generating custom token');
  }
});

// Route to delete a contract by ID
// Route to delete a contract by ID
router.delete('/api/contracts/:id', async (req, res) => {
  const contractId = req.params.id;
  console.log("Delete request received for contract ID:", contractId); // Debug log

  try {
    const deletedContract = await Contract.findByIdAndDelete(contractId);

    if (!deletedContract) {
      console.log("Contract not found for ID:", contractId); // Debug log
      return res.status(404).json({ message: 'Contract not found' });
    }

    console.log("Contract deleted:", deletedContract); // Debug log
    res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error('Error deleting contract:', error); // This will show full error in terminal
    res.status(500).json({ message: 'Server error during deletion' });
  }
});

module.exports = router;
