function loadData(url, render) {
    const itemsContainer = document.getElementById('items-container');
    fetch(url)
        .then(response => response.json())
        .then(items => {
            render(items, itemsContainer);
        })
        .catch(error => {
            console.error("Error loading data:", error);
            itemsContainer.innerHTML = `<p>Failed to load the data from ${url} Please try again later.</p>`;
        });
}

// Add item to cart
function addToCart(itemId) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({"id": itemId, "quantity": 1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // updateCartUI();
}


function createCustomElement(elementName, classes, innerHtml) {
    const element = document.createElement(elementName);
    if(classes) {
        element.classList.add(classes);
    }
    if(innerHtml) {
        element.innerHTML = innerHtml;
    }
    return element;
}