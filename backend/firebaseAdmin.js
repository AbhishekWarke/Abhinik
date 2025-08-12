const admin = require('firebase-admin');

let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  // On Render or other hosting
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // Local development
  serviceAccount = require('./serviceAccountKey.json');
}

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
