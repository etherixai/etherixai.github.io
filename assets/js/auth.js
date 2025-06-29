// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA44SNXedI52T1GIftDgBGRw4RQscj2hgY",
  authDomain: "etherixai.firebaseapp.com",
  projectId: "etherixai",
  storageBucket: "etherixai.appspot.com",
  messagingSenderId: "1080577712222",
  appId: "1:1080577712222:web:c7a9ab151b379afe73d4cf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Auth Logic
document.getElementById("loginBtn").onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(res => {
    alert("Welcome " + res.user.displayName);
  });
};

// Check Auth State
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("loginBtn").innerText = "Logout";
    document.getElementById("loginBtn").onclick = () => auth.signOut();
  }
});
