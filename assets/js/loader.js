const loadPage = categoryName => {
    const databasePromise = database.loadDatabase();
    Promise.all([databasePromise]).then(() => {
        updateCartUI();
        loadProducts(categoryName);
        document.getElementById("place-order").onclick = () => placeOrder();
    });
}

function loadProducts(categoryId) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = ''; // remove existing content
    if(categoryId) {
        if (categoryId === 'feedback') {
            renderFeedback();
        } else if (categoryId === 'home') {
            renderHome(contentContainer)
        } else {
            const category = database.getCategory(categoryId);
            if ('products' in category) {
                renderProducts(category, category.products, contentContainer);
            }
        }
    }
    return false;
}

// Function to load an HTML template into a placeholder
function loadHtmlFragment(url, placeholderId) {
    return fetch(url)
        .then(response => response.text())
        .then(text => document.getElementById(placeholderId).innerHTML = text)
        .catch(error => console.error(`Error loading ${url} ${placeholderId}:`, error));
}

