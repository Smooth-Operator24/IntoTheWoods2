const popular = [
  { name: "Fiddle Leaf Fig", price: "د.إ 129", img: "images/1.jpg" },
  { name: "Snake Plant", price: "د.إ 89", img: "images/2.jpeg" },
  { name: "Peace Lily", price: "د.إ 69", img: "images/3.jpg" },
  { name: "Areca Palm", price: "د.إ 119", img: "images/4.jpg" },
];

const beginners = [
  { name: "Lucky Bamboo", price: "د.إ 49", img: "images/5.jpeg" },
  { name: "Money Plant", price: "د.إ 59", img: "images/6.jpeg" },
  { name: "Spider Plant", price: "د.إ 65", img: "images/7.jpg" },
  { name: "Succulent Set", price: "د.إ 79", img: "images/8.jpeg" },
];

const size = [
  { name: "Mini Desk Plant", price: "د.إ 39", img: "images/1.jpg" },
  { name: "Medium Indoor Palm", price: "د.إ 149", img: "images/2.jpeg" },
  { name: "Large Fern", price: "د.إ 199", img: "images/3.jpg" },
  { name: "Giant Ficus Tree", price: "د.إ 299", img: "images/4.jpg" },
];

function loadProducts(sectionId, items) {
  const container = document.getElementById(sectionId);
  items.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">${p.price}</p>
      <button class="btn">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

loadProducts("popular", popular);
loadProducts("beginners", beginners);
loadProducts("size", size);

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
  const query = this.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = productName.includes(query) ? "block" : "none";
  });
});
// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {

    // Find the signup form and the email input
    const signupForm = document.getElementById("signup-form");
    const emailInput = document.getElementById("email-input");
    const subscribeButton = signupForm.querySelector("button");

    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            // Prevent the form from actually submitting (and reloading the page)
            event.preventDefault(); 
            
            // Optional: You could add email validation here
            
            // Change button text to show success
            if (subscribeButton.textContent === "Subscribe") {
                subscribeButton.textContent = "Subscribed!";
                subscribeButton.style.backgroundColor = "#d4af37"; // Gold accent
                subscribeButton.style.color = "#022c22"; // Dark Emerald text
                
                // Clear the input
                emailInput.value = "";
    
                // Optional: Reset the button after a few seconds
                setTimeout(function() {
                    subscribeButton.textContent = "Subscribe";
                    subscribeButton.style.backgroundColor = "#064e3b"; // Back to Emerald
                    subscribeButton.style.color = "#f3f4f6"; // Back to Light Text
                }, 3000); // Resets after 3 seconds
            }
        });
    }
});