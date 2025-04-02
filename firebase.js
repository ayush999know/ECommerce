import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD8aAA7yyP1CD23IpAf3OlgPDkQznp3NlQ",
    authDomain: "ecommerce-ayush.firebaseapp.com",
    projectId: "ecommerce-ayush",
    storageBucket: "ecommerce-ayush.firebasestorage.app",
    messagingSenderId: "671222303816",
    appId: "1:671222303816:web:a3bcfa456840f72aa21c7d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Login
document.getElementById('loginBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        document.getElementById('email').value = result.user.email;
        alert(`Logged in as ${result.user.displayName || result.user.email}`);
    } catch (error) {
        alert("Google login failed: " + error.message);
    }
});
