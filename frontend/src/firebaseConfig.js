// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Make sure to use this modular import

const firebaseConfig = {
  apiKey: "AIzaSyDJWe6WXyoztO1sUILy-XN5UmhgmFLhSB8",
  authDomain: "abhinik-75b89.firebaseapp.com",
  projectId: "abhinik-75b89",
  storageBucket: "abhinik-75b89.appspot.com",

  messagingSenderId: "5331331034",
  appId: "1:5331331034:web:bf5b4e3e30c3d52bd342e3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
