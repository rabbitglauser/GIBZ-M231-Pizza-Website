document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu");

    // Fetch the product data from the JSON file
    fetch('./data/pizza-data/pizza.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load product data");
            }
            return response.json();
        })
        .then((products) => {
            // Generate HTML for each product
            products.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("pizza");

                productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price">${product.price}$</div>
          <button><i class="fas fa-shopping-cart"></i></button>
        `;

                menuContainer.appendChild(productDiv);
            });
        })
        .catch((error) => {
            console.error("Error loading products:", error);
            menuContainer.innerHTML = "<p>Failed to load menu items. Please try again later.</p>";
        });
});
