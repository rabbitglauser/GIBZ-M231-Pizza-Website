
const loadSite = categoryName => {
    loadHtmlFragment("./assets/header.htm", "header-placeholder");
    loadHtmlFragment("./assets/footer.htm", "footer-placeholder");
    if(categoryName) {
        loadCategory(categoryName)
    }
}

const loadCategory = categoryName => {
    loadData(`./data/${categoryName}.json`, renderProducts);
}

function loadData(url, render) {
    const productsContainer = document.getElementById('products-container');
    fetch(url)
        .then(response => response.json())
        .then(items => render(items, productsContainer))
        .catch(error => {
            productsContainer.innerHTML = `<p>Failed to load the data from ${url} Please try again later.</p>`;
        });
}


// Function to load an HTML template into a placeholder
function loadHtmlFragment(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(text => document.getElementById(placeholderId).innerHTML = text)
        .catch(error => console.error(`Error loading ${url}:`, error));
}

