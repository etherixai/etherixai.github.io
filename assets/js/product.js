// Wait for the entire HTML document to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyA44SNXedI52T1GIftDgBGRw4RQscj2hgY",
      authDomain: "etherixai.firebaseapp.com",
      projectId: "etherixai",
      storageBucket: "etherixai.appspot.com",
      messagingSenderId: "1080577712222",
      appId: "1:1080577712222:web:c7a9ab151b379afe73d4cf",
      measurementId: "G-PZ0CZ7B7FE"
    };

    // Check if Firebase is already initialized to avoid errors
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    const auth = firebase.auth();
    const db = firebase.firestore();

    // 2. Get references to HTML elements
    const purchaseBtn = document.getElementById('purchaseBtn');
    const statusMessage = document.getElementById('statusMessage');
    const productId = 'jarvis-ai'; // Unique ID for this product

    if (!purchaseBtn) {
        console.error("Purchase button not found!");
        return; // Stop if the button doesn't exist
    }

    // 3. Main logic to check user's auth and purchase state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is logged in
            checkPurchaseStatus(user);
        } else {
            // User is not logged in
            purchaseBtn.innerText = 'Login to Purchase';
            purchaseBtn.onclick = () => {
                window.location.href = 'login.html';
            };
        }
    });

    // 4. Function to check if the user has purchased the item
    function checkPurchaseStatus(user) {
        const purchaseRef = db.collection('users').doc(user.uid).collection('purchases').doc(productId);

        purchaseRef.get().then(doc => {
            if (doc.exists) {
                // User has already purchased
                setupDownloadButton();
            } else {
                // User has not purchased
                setupPurchaseButton(user);
            }
        }).catch(error => {
            console.error("Error checking purchase status:", error);
            statusMessage.innerText = "Error checking purchase status.";
        });
    }

    // 5. Function to set up the 'Buy Now' button
    function setupPurchaseButton(user) {
        purchaseBtn.innerText = 'Buy Now for ₹499';
        purchaseBtn.onclick = () => {
            initiatePayment(user);
        };
    }

    // 6. Function to set up the 'Download Now' button
    function setupDownloadButton() {
        purchaseBtn.innerText = 'Download Now';
        purchaseBtn.classList.add('alt'); // Use the theme's alternate style
        purchaseBtn.style.backgroundColor = '#28a745'; // Green color for success
        purchaseBtn.onclick = () => {
            const fileId = '1C7a6RtvAAENc9Z-Qio6bNQTgfKGGDgGF';
            const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            statusMessage.innerText = "Your download will start shortly...";
            window.open(downloadUrl, '_blank');
        };
    }

    // 7. Function to initiate Razorpay payment
    function initiatePayment(user) {
    const options = {
        key: "rzp_live_K1AYL22YAR9WCg", // <-- YAHAN PAR AAPKI NAYI LIVE KEY DAAL DI HAI
        amount: 49900, // Amount in paise (499 * 100)
        currency: "INR",
        name: "Etherix AI",
        description: "Jarvis AI Purchase",
        handler: function (response) {
            // This function runs after payment is successful
            statusMessage.innerText = "Payment Successful! Saving details...";
            statusMessage.style.color = 'lightgreen';
            savePurchase(user, response.razorpay_payment_id);
        },
        prefill: {
            name: user.displayName || "Valued Customer",
            email: user.email,
        },
        theme: {
            color: "#3399cc"
        },
        modal: {
            ondismiss: function(){
                // This function runs if the user closes the payment window
                console.log('Payment window was closed by the user.');
                statusMessage.innerText = "Payment was cancelled.";
                statusMessage.style.color = "orange";
            }
        }
    };
    
    const rzp = new Razorpay(options);

    rzp.on('payment.failed', function (response){
        console.error("Payment Failed:", response.error);
        statusMessage.innerText = "Payment Failed. Please try again or contact support. Reason: " + response.error.description;
        statusMessage.style.color = 'pink';
    });

    rzp.open();
}

    // 8. Function to save purchase details to Firestore
    function savePurchase(user, paymentId) {
        const purchaseRef = db.collection('users').doc(user.uid).collection('purchases').doc(productId);
        
        purchaseRef.set({
            paymentId: paymentId,
            purchaseDate: new Date()
        })
        .then(() => {
            statusMessage.innerText = "Payment Successful! Your download is ready.";
            statusMessage.style.color = 'lightgreen';
            setupDownloadButton();
        })
        .catch(error => {
            console.error("Error saving purchase:", error);
            statusMessage.innerText = "Payment successful, but failed to save purchase. Please contact support.";
            statusMessage.style.color = 'pink';
        });
    }

}); // End of DOMContentLoaded