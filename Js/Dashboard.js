import firebaseConfig from "../Auth/Config.js";
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
// Fetch and Populate Dashboard Data
async function populateDashboard(userId) {
  try {
    console.log("Fetching data for user ID:", userId);

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User data retrieved:", userData);

      // Populate username
      document.getElementById("userName").textContent = userData.name || "User";

      // Calculate total score and progress
      const game1Score = userData.game_1 || 0;
      const game2Score = userData.game_2 || 0;
      const totalScore = game1Score + game2Score;

      // Define maximum score for progress calculation
      const maxScore = 100; // Adjust this based on your scoring system
      const progress = Math.min((totalScore / maxScore) * 100, 100);

      // Update progress tracker
      const progressBar = document.getElementById("progressBar");
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute("aria-valuenow", progress.toFixed(0));
      progressBar.textContent = `${progress.toFixed(0)}%`;

      // Populate achievements
      const achievementsContainer = document.getElementById("achievements");
      achievementsContainer.innerHTML = ""; // Clear previous data
      (userData.achievements || []).forEach(achievement => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = achievement;
        achievementsContainer.appendChild(badge);
      });

      // Display game scores (optional)
      const gameScoresContainer = document.getElementById("gameScores");
      gameScoresContainer.innerHTML = `
        <li>Game 1: ${game1Score}</li>
        <li>Game 2: ${game2Score}</li>
      `;

    } else {
      console.error("No user data found for the given ID.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

  
  // Call the function to populate the dashboard
  populateDashboard();
