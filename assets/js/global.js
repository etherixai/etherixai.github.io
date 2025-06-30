document.addEventListener('DOMContentLoaded', () => {

    const firebaseConfig = {
      apiKey: "AIzaSyA44SNXedI52T1GIftDgBGRw4RQscj2hgY",
      authDomain: "etherixai.firebaseapp.com",
      projectId: "etherixai",
      storageBucket: "etherixai.appspot.com",
      messagingSenderId: "1080577712222",
      appId: "1:1080577712222:web:c7a9ab151b379afe73d4cf",
      measurementId: "G-PZ0CZ7B7FE"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();

    // This is the core logic. It runs on every page load.
    auth.onAuthStateChanged(user => {
        if (user) {
            // --- USER IS LOGGED IN ---
            document.body.classList.add('user-is-logged-in');

            // Find the menu elements to update
            const userDisplay = document.getElementById('user-email-display');
            const logoutBtn = document.getElementById('logout-btn');

            if (userDisplay) {
                userDisplay.textContent = user.email; // Show user's email
            }

            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    auth.signOut().then(() => {
                        // Redirect to home page after logout
                        window.location.href = 'index.html';
                    });
                });
            }

        } else {
            // --- USER IS LOGGED OUT ---
            document.body.classList.remove('user-is-logged-in');
        }
    });
});