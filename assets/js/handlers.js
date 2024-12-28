
const handleSelectedProductOption = (detailsElement, selectElement, price) => {

    // TODO: handle this change event to update the price of the product in the UI

    console.log("The id of the parent element => " + detailsElement.getAttribute("id"));
    console.log(`The value selected was [${selectElement.value}] for product [${selectElement.id}] original price [${price}]`);
}


// Add item to cart
function handleAddToCart(productId) {

    const selectElement = document.getElementById(productId);
    let searchProductId = `${productId}`;
    if(selectElement) {
        searchProductId += `-${selectElement.value}`;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === searchProductId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({"id": searchProductId, "quantity": 1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // updateCartUI();
}

