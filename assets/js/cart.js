/**
 * Adds a product to the shopping cart. If the product already exists in the cart,
 * increments its quantity. If it does not exist, adds the product with a quantity of 1.
 *
 * @param {string|number} searchProductId - The unique identifier of the product to add to the cart.
 * @return {void} Does not return a value.
 */
function addToCart(searchProductId) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === searchProductId);

    let quantity = existingItem ? existingItem.quantity + 1 : 1;
    if (existingItem) {
        existingItem.quantity = quantity;
    } else {
        cart.push({"id": searchProductId, "quantity": quantity});
    }
    saveCart(cart);
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

    const cart = getCart();
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
        const lineItemAmount = calculateAmountIncludingOption(cartItem.id);
        cartItems.appendChild(createLineItem(cartItem, lineItemAmount));
        total += lineItemAmount * cartItem.quantity;
        numItems += cartItem.quantity
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = numItems; // cart.length;
}

function createLineItem(cartItem, lineItemAmount) {
    const lineItemDescription = calculateLineItemDescription(cartItem);
    const lineItemPrice = `$${lineItemAmount} x ${cartItem.quantity} = $${lineItemAmount * cartItem.quantity}`;

    const divElement = createCustomElement("div", "line-item");
    const lineItemDescriptionElement = createCustomElement("div", "line-item-description", lineItemDescription);
    const lineItemTotalElement = createCustomElement("div", "line-item-total", lineItemPrice);
    divElement.appendChild(lineItemDescriptionElement);
    divElement.appendChild(lineItemTotalElement);

    const lineItemElement = createCustomElement("li", "line-item");
    lineItemElement.appendChild(divElement);
    return lineItemElement;
}

function calculateLineItemDescription(cartItem) {
    const [categoryId, productId, optionId] = splitCartId(cartItem.id);
    const category = database.getCategory(categoryId);
    const product = database.getProduct(productId);
    let fullDescription = `${category.description} : ${product.description}`;
    if ('options' in product) {
        const option = product.options.find(option => option.id === optionId);
        if (option && 'description' in option) {
            fullDescription += ` : ${option.description}`;
        }
    }
    return `${fullDescription}`
}

function calculateAmountIncludingOption(cartId) {
    const [, productId, optionId] = splitCartId(cartId);
    return calculateTotalAmount(productId, optionId);
}

function splitCartId(cartId) {
    const [category, id, optionId] = cartId.split('-');
    const productId = `${category}-${id}`;
    return [category, productId, optionId];
}

function placeOrder() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Cart is empty. Please add items before placing an order");
        return;
    }
    const orderTotal = cart.reduce((total, cartItem) => total + calculateAmountIncludingOption(cartItem.id) * cartItem.quantity, 0);
    alert(`Total amount for order: $${orderTotal.toFixed(2)}. Thank you for your order.`);
    resetCart();
    document.body.click();
    updateCartUI()
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function resetCart() {
    localStorage.removeItem("cart");
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
