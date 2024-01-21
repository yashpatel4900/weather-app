import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  // your config
  apiKey: "AIzaSyCa1hZxZhxpDnvqioohl99OwJKWWx4tYd0",
  authDomain: "weather-app-5ecd0.firebaseapp.com",
  projectId: "weather-app-5ecd0",
  storageBucket: "weather-app-5ecd0.appspot.com",
  messagingSenderId: "1084413449390",
  appId: "1:1084413449390:web:a5974f5407835108c7093f",
  measurementId: "G-Q41HSMT5KH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth functions
export { auth, firestore };
