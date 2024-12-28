/**
 * Handles the event when a product option is selected and updates the UI to reflect the new price.
 *
 * @param {HTMLElement} detailsElement - The parent element containing product details.
 * @param {HTMLSelectElement} selectElement - The select element from which the option was chosen.
 * @param {number} price - The original price of the product.
 */
const handleSelectedProductOption = (detailsElement, selectElement, price) => {

    // TODO: handle this change event to update the price of the product in the UI

    console.log("The id of the parent element => " + detailsElement.getAttribute("id"));
    console.log(`The value selected was [${selectElement.value}] for product [${selectElement.id}] original price [${price}]`);
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
