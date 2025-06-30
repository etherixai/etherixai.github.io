// This is the correct JavaScript code for auth.js

// 1. Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyA44SNXedI52T1GIftDgBGRw4RQscj2hgY",
  authDomain: "etherixai.firebaseapp.com",
  projectId: "etherixai",
  storageBucket: "etherixai.appspot.com",
  messagingSenderId: "1080577712222",
  appId: "1:1080577712222:web:c7a9ab151b379afe73d4cf",
  measurementId: "G-PZ0CZ7B7FE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// 2. Get references to the HTML elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const messageEl = document.getElementById('message');

// 3. Register function
registerBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        messageEl.textContent = "Please enter both email and password.";
        messageEl.style.color = "orange";
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            messageEl.textContent = "Registration successful! You can now log in.";
            messageEl.style.color = "lightgreen";
            console.log("User registered:", user);
        })
        .catch((error) => {
            messageEl.textContent = error.message;
            messageEl.style.color = "pink";
            console.error("Registration error:", error);
        });
});

// 4. Login function
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        messageEl.textContent = "Please enter both email and password.";
        messageEl.style.color = "orange";
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            messageEl.textContent = "Login successful! Redirecting...";
            messageEl.style.color = "lightgreen";
            // Redirect to the product page after successful login
            window.location.href = 'jarvis-ai.html'; 
        })
        .catch((error) => {
            messageEl.textContent = error.message;
            messageEl.style.color = "pink";
            console.error("Login error:", error);
        });
});

// 5. Google Sign-In function
googleSignInBtn.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            messageEl.textContent = "Google Sign-In successful! Redirecting...";
            messageEl.style.color = "lightgreen";
            // Redirect to the product page
            window.location.href = 'jarvis-ai.html';
        }).catch((error) => {
            messageEl.textContent = error.message;
            messageEl.style.color = "pink";
            console.error("Google Sign-In error:", error);
        });
});

// 6. Check user's login state
auth.onAuthStateChanged((user) => {
    if (user) {
        // If user is already logged in and visits the login page,
        // you might want to redirect them away.
        console.log("User is already logged in:", user.email);
        // Uncomment the line below if you want to auto-redirect logged-in users
        // if (window.location.pathname.endsWith('login.html')) {
        //    window.location.href = 'jarvis-ai.html';
        // }
    } else {
        console.log("No user is logged in.");
    }
});