// Firebase Config — Replace with your project's config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('user', JSON.stringify({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    }));
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Sign in error:', error);
    alert('Sign in failed. Please try again.');
  }
}

// Sign Out
async function logOut() {
  await signOut(auth);
  localStorage.removeItem('user');
  window.location.href = '../index.html';
}

// Check Auth State
function checkAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      const local = localStorage.getItem('user');
      if (local) callback(JSON.parse(local));
      else window.location.href = 'register.html';
    }
  });
}

// Get current user
function getCurrentUser() {
  const local = localStorage.getItem('user');
  return local ? JSON.parse(local) : null;
}

export { signInWithGoogle, logOut, checkAuth, getCurrentUser };
