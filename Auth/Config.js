// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBdrbx4BPPzVtBqn51EOzeN6yNzSP-byUw",
  authDomain: "nagrikaursamvidhan.firebaseapp.com",
  projectId: "nagrikaursamvidhan",
  storageBucket: "nagrikaursamvidhan.firebasestorage.app",
  messagingSenderId: "510311633584",
  appId: "1:510311633584:web:9c0310c7fb6eae368ea175",
  measurementId: "G-CB5H43S3ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
