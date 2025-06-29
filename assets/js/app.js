const DRIVE_FILE_URL = "https://drive.google.com/uc?export=download&id=1C7a6RtvAAENc9Z-Qio6bNQTgfKGGDgGF";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function handleDownload() {
  const user = firebase.auth().currentUser;
  if (!user) return alert("Please login to continue.");

  const docRef = db.collection("users").doc(user.uid);
  const doc = await docRef.get();

  if (doc.exists && doc.data().purchased) {
    window.open(DRIVE_FILE_URL, "_blank");
  } else {
    const options = {
      key: "rzp_live_D6UqLXKN5dK5YW",
      amount: 29900,
      currency: "INR",
      name: "Etherix AI",
      description: "Jarvis AI Purchase",
      image: "images/logo.png",
      handler: async function (response) {
        await docRef.set({ purchased: true }, { merge: true });
        alert("Payment successful!");
        window.open(DRIVE_FILE_URL, "_blank");
      },
      prefill: {
        name: user.displayName || "",
        email: user.email || ""
      },
      theme: { color: "#0d1117" }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}

// Cart Button
document.getElementById("cartButton").onclick = async () => {
  const user = firebase.auth().currentUser;
  if (!user) return alert("Please login to view your cart.");

  const doc = await db.collection("users").doc(user.uid).get();
  if (doc.exists && doc.data().purchased) {
    window.open(DRIVE_FILE_URL, "_blank");
  } else {
    alert("You haven't purchased yet. Click Download to proceed.");
  }
};
