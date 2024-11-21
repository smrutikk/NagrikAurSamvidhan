import firebaseConfig from "./Auth/Config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid; // Get the authenticated user's UID
      await populateDashboard(userId);  // Call the function to populate dashboard with the user data
    } else {
      console.log("No user is authenticated");
    }
  });

// Replace this with the actual user ID (you might retrieve this from Firebase Auth)


// Fetch and Populate Dashboard Data
async function populateDashboard() {
    try {
      // Check if the user is authenticated and the userId is valid
      const userId = "exampleUserId"; // Ensure this matches the logged-in user's ID if dynamic
      console.log("Fetching data for user ID:", userId);
  
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data retrieved:", userData);
  
        // Populate username
        document.getElementById("userName").textContent = userData.name || "User";
  
        // Populate progress tracker
        const progress = userData.progress || 0;
        const progressBar = document.getElementById("progressBar");
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute("aria-valuenow", progress);
        progressBar.textContent = `${progress}%`;
  
        // Populate achievements
        const achievementsContainer = document.getElementById("achievements");
        (userData.achievements || []).forEach(achievement => {
          const badge = document.createElement("span");
          badge.className = "badge";
          badge.textContent = achievement;
          achievementsContainer.appendChild(badge);
        });
  
        // Populate quiz results
        const quizResultsContainer = document.getElementById("quizResults");
        (userData.quizResults || []).forEach(result => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.textContent = `Quiz: ${result.quizName}, Score: ${result.score}`;
          quizResultsContainer.appendChild(listItem);
        });
  
        // Populate recommendations
        const recommendationsContainer = document.getElementById("recommendations");
        (userData.recommendations || []).forEach(recommendation => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.textContent = recommendation;
          recommendationsContainer.appendChild(listItem);
        });
      } else {
        console.error("No user data found for the given ID.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  
  // Call the function to populate the dashboard
  populateDashboard();
