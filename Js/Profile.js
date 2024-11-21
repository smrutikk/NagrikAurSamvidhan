import firebaseConfig from "./Auth/Config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Fetch and Populate Profile Data
async function populateProfile(userId) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      console.log("User Data from Firestore:", userData); // Debugging: check the data fetched

      // Populate name and email
      if (userData.name) {
        document.getElementById("userName").value = userData.name;
      } else {
        console.error("Name field is missing in Firestore data.");
      }

      if (userData.email) {
        document.getElementById("userEmail").value = userData.email;
      } else {
        console.error("Email field is missing in Firestore data.");
      }

      // Populate achievements
      const achievementsContainer = document.getElementById("achievements");
      achievementsContainer.innerHTML = '';  // Clear any previous achievements
      if (userData.achievements && userData.achievements.length > 0) {
        userData.achievements.forEach(achievement => {
          const badge = document.createElement("span");
          badge.className = "badge bg-success me-2 mb-2";
          badge.textContent = achievement;
          achievementsContainer.appendChild(badge);
        });
      } else {
        console.error("Achievements field is missing or empty in Firestore data.");
      }

      // Populate progress
      const progress = userData.progress || 0;
      const progressBar = document.getElementById("progressBar");
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute("aria-valuenow", progress);
      progressBar.textContent = `${progress}%`;

      // Set profile image
      const profileImage = document.getElementById("profileImage");
      if (userData.profileImage) {
        profileImage.src = userData.profileImage;
      }

    } else {
      console.error("User data not found in Firestore for user ID:", userId);
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}

// Update Profile Data
async function updateProfile(userId) {
  try {
    const updatedName = document.getElementById("userName").value;
    const userDocRef = doc(db, "users", userId);

    // Save updated data to Firestore
    await setDoc(userDocRef, {
      name: updatedName
    }, { merge: true });

    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}

// Handle Image Upload
async function uploadProfileImage(file, userId) {
  try {
    const storageRef = ref(storage, `profile_images/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.error("Error uploading image: ", error);
      }, 
      () => {
        // Get the download URL after upload completes
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update the profile image on the page
          document.getElementById("profileImage").src = downloadURL;

          // Update the Firestore document with the image URL
          const userDocRef = doc(db, "users", userId);
          setDoc(userDocRef, { profileImage: downloadURL }, { merge: true });
        });
      }
    );
  } catch (error) {
    console.error("Error uploading profile image: ", error);
  }
}

// Check Authentication Status and Fetch User Data
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    console.log("Authenticated User ID:", userId); // Debugging: Verify the userId
    populateProfile(userId);

    // Handle form submission for profile updates
    document.getElementById("profileForm").addEventListener("submit", (e) => {
      e.preventDefault();
      updateProfile(userId);
    });

    // Handle image upload
    const imageUploadInput = document.getElementById("imageUpload");
    imageUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        uploadProfileImage(file, userId);
      }
    });
  } else {
    // If no user is logged in, redirect to login page
    window.location.href = "login.html";
  }
});
