const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Correct path to your Firebase service account JSON file

// Initialize Firebase Admin SDK using service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to generate custom token
const createCustomToken = async (userId) => {
  try {
    const customToken = await admin.auth().createCustomToken(userId);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
};

module.exports = { createCustomToken };
