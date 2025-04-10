// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Optional for Firestore
const firebaseConfig = {
    apiKey: "AIzaSyCWaymoOPExrEtgFnrMIgBHjNn71z7QhhE",
    authDomain: "edusync-637bc.firebaseapp.com",
    projectId: "edusync-637bc",
    storageBucket: "edusync-637bc.firebasestorage.app",
    messagingSenderId: "946474876907",
    appId: "1:946474876907:web:6a56434e32808ea09b23ae",
    measurementId: "G-ZFZC52KP1W"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app); // Optional if using Firestore

// Explicit exports
export { auth, db }; 
export default app;