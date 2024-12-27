// Update Cart UI in the dropdown
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = ""; // Clear current items
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

// Toggle cart dropdown visibility
document.addEventListener("click", (event) => {
    const cartIcon = document.getElementById("cart-icon");
    const cartDropdown = document.getElementById("cart-dropdown");

    if (cartIcon && cartDropdown) {
        if (cartIcon.contains(event.target)) {
            event.preventDefault();
            cartDropdown.classList.toggle("hidden");
        } else if (!cartDropdown.contains(event.target)) {
            cartDropdown.classList.add("hidden");
        }
    }
});

// Ensure cart UI is updated on page load
document.addEventListener("DOMContentLoaded", updateCartUI);
