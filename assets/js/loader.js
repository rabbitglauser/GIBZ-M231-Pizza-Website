const loadCategoryPage = categoryName => {
    const headerPromise = loadHtmlFragment("./assets/header.htm", "header-placeholder")
    const footerPromise = loadHtmlFragment("./assets/footer.htm", "footer-placeholder");
    const databasePromise = database.loadDatabase();
    Promise.all([databasePromise, headerPromise, footerPromise]).then(() => {
        updateCartUI();
        loadProducts(categoryName);
    });
}

// const loadCategory = categoryName => {
//     return categoryName ? loadData(`./data/${categoryName}.json`, renderProducts) : Promise.resolve();
// }

// function loadData(url, render) {
//     const productsContainer = document.getElementById('products-container');
//     return fetch(url)
//         .then(response => response.json())
//         .then(products => render(products, productsContainer))
//         .catch(error => {
//             productsContainer.innerHTML = `<p>Failed to load the data from ${url}</p> <p>${error}</p>`;
//         });
// }

function loadProducts(categoryId) {
    const productsContainer = document.getElementById('products-container');
    if(categoryId) {
        const category = database.getCategory(categoryId);
        if('products' in category) {
            renderProducts(category.products, productsContainer);
        }
    }
}

// Function to load an HTML template into a placeholder
function loadHtmlFragment(url, placeholderId) {
    return fetch(url)
        .then(response => response.text())
        .then(text => document.getElementById(placeholderId).innerHTML = text)
        .catch(error => console.error(`Error loading ${url}:`, error));
}

