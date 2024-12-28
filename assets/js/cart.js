/**
 * Adds a product to the shopping cart. If the product already exists in the cart,
 * increments its quantity. If it does not exist, adds the product with a quantity of 1.
 *
 * @param {string|number} searchProductId - The unique identifier of the product to add to the cart.
 * @return {void} Does not return a value.
 */
function addToCart(searchProductId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === searchProductId);

    let quantity = existingItem ? existingItem.quantity + 1 : 1;
    if (existingItem) {
        existingItem.quantity = quantity;
    } else {
        cart.push({"id": searchProductId, "quantity": quantity});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Calculates the CartId used internally within the cart
 *
 * @param productId The product ID from the Database
 * @returns {string} The cartId calculated including the options
 */
function calculateCartId(productId) {
    const selectElement = document.getElementById(productId);
    let cartId = `${productId}`;
    if (selectElement) {
        cartId += `-${selectElement.value}`;
    }
    return cartId
}

/**
 * Updates the UI to reflect the current state of the shopping cart.
 * It retrieves the cart data from localStorage, calculates the total price and item count, and displays it in designated DOM elements.
 * If any required DOM elements are missing, the function will log an error message and terminate.
 *
 * @return {void} Does not return a value. Updates the UI elements directly based on the shopping cart data.
 */
function updateCartUI() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems || !cartTotal || !cartCount) {
        console.error("There are missing DOM elements for the cart");
        return;
    }
    cartItems.innerHTML = ""; // Clear current items
    let total = 0;
    let numItems = 0;
    cart.forEach(cartItem => {
        const price = database.calculatePrice(cartItem.id);
        const li = createCustomElement("li");

        // TODO : get the actual description of the product from database. Not just the cartId
        li.textContent = `${cartItem.id} - $${price} x ${cartItem.quantity}`;
        cartItems.appendChild(li);

        total += price * cartItem.quantity;
        numItems += cartItem.quantity
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = numItems; // cart.length;
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
