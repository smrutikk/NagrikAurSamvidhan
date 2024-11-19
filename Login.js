import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import firebaseConfig from './Auth/Config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const toggleLoginPassword = document.getElementById("toggleLoginPassword");
  const loginPasswordInput = document.getElementById("loginPassword");

  const loginError = document.getElementById("loginError");
  const signupError = document.getElementById("signupError");

  let isPasswordVisible = false;

  // Toggle Login Password Visibility
  toggleLoginPassword.addEventListener("click", () => {
    isPasswordVisible = !isPasswordVisible;
    loginPasswordInput.type = isPasswordVisible ? "text" : "password";
    toggleLoginPassword.textContent = isPasswordVisible ? "🙈" : "👁️";
  });

  // Switch to Signup Form
  const showSignupLink = document.getElementById("showSignup");
  showSignupLink.addEventListener("click", () => {
    loginForm.classList.add("d-none");
    signupForm.classList.remove("d-none");
  });

  // Switch to Login Form
  const showLoginLink = document.getElementById("showLogin");
  showLoginLink.addEventListener("click", () => {
    signupForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  });

  // Handle Login Form Submission
  document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    loginError.textContent = "";

    if (!email || !password) {
      loginError.textContent = "Please fill all fields.";
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "HomePage.html";
    } catch (error) {
      loginError.textContent = error.message || "Invalid email or password.";
    }
  });

  // Handle Signup Form Submission
  document.getElementById("signup").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Retrieve input values
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    
    // Clear previous error messages
    signupError.textContent = "";
  
    // Validate input fields
    if (!name || !email || !password) {
      signupError.textContent = "Please fill in all fields.";
      return;
    }
  
    try {
      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user's data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        achievements: [],
        progress: 0,
      });

      // Optional: Log the user object (for debugging or additional logic)
      console.log("User created:", user);
  
      // Show success alert and reset the form
      alert("Signup successful! Redirecting to login...");
      document.getElementById("signup").reset();
  
      // Automatically switch to the login form
      showLoginLink.click();
    } catch (error) {
      // Display appropriate error message
      signupError.textContent = error.message || "Signup failed. Please try again.";
      console.error("Error during signup:", error); // Log error details for debugging
    }
  });
});
