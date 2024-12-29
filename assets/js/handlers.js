/**
 * Handles the event when a product option is selected and updates the UI to reflect the new price.
 *
 * @param {HTMLElement} detailsElement - The parent element containing product details.
 * @param {HTMLSelectElement} selectElement - The select element from which the option was chosen.
 */
const handleSelectedProductOption = (detailsElement, selectElement) => {
    // Values are like : selectElement.id === "drinks-redbull", selectedOptionId === "50cl"
    const totalAmount = calculateTotalAmount(selectElement.id, selectElement.value);
    const amountElement = document.getElementById(`${selectElement.id}-amount`);
    amountElement.innerHTML = `${totalAmount}`;
}

const calculateTotalAmount = (productId, optionId) => {
    const product = database.getProduct(productId);
    let totalAmount = product.amount;
    if ('options' in product) {
         const option = product.options.find(option => option.id === optionId);
        totalAmount += option.amount;
    }
    return totalAmount;
}

/**
 * Handles the process of adding a product to the cart.
 *
 * @param {string} productId - The unique identifier of the product to be added to the cart.
 * @return {void} This function does not return a value.
 */
function handleAddToCart(productId) {
    const cartId = calculateCartId(productId);
    addToCart(cartId);
    updateCartUI();
}
