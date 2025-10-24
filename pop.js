window.addEventListener("load", () => {
  const popup = document.getElementById("discount-popup");
  const close = document.getElementById("popupClose");
  const form = document.getElementById("discountForm");

  // Show popup after 2 seconds
  setTimeout(() => popup.style.display = "flex", 2000);

  // Close on click
  close.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close when submitted
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("🎉 Discount claimed successfully!");
    popup.style.display = "none";
  });
});
