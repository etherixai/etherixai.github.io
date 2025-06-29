// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA44SNXedI52T1GIftDgBGRw4RQscj2hgY",
  authDomain: "etherixai.firebaseapp.com",
  projectId: "etherixai",
  storageBucket: "etherixai.appspot.com",
  messagingSenderId: "1080577712222",
  appId: "1:1080577712222:web:c7a9ab151b379afe73d4cf",
  measurementId: "G-PZ0CZ7B7FE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const fileURL = "https://drive.google.com/uc?export=download&id=1C7a6RtvAAENc9Z-Qio6bNQTgfKGGDgGF"; // Replace with your Google Drive direct link
const razorpayKey = "rzp_live_D6UqLXKN5dK5YW";

// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert("Login failed");
  }
});

// Cart Logic
document.getElementById("cartBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return alert("Login required");

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists() && snap.data().purchased) {
    window.open(fileURL, "_blank");
  } else {
    alert("No items purchased. Please buy first.");
  }
});

// Download → Payment → Track
document.getElementById("downloadBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return alert("Please login first");

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists() && snap.data().purchased) {
    window.open(fileURL, "_blank");
    return;
  }

  const options = {
    key: razorpayKey,
    amount: 9900, // ₹99 in paisa
    currency: "INR",
    name: "Etherix AI",
    description: "Jarvis AI",
    handler: async (response) => {
      await setDoc(ref, { purchased: true });
      alert("Payment successful! Starting download...");
      window.open(fileURL, "_blank");
    },
    prefill: {
      name: user.displayName,
      email: user.email,
    },
    theme: { color: "#0f62fe" }
  };
  const rzp = new Razorpay(options);
  rzp.open();
});
