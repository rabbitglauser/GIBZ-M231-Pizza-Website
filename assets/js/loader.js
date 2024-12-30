
document.addEventListener("DOMContentLoaded", () => initializeApplication());

const initializeApplication = () => {
    const databasePromise = database.loadDatabase();
    Promise.all([databasePromise]).then(() => {
        updateCartUI();
        routeTo('home');
        addClickHandlersForRoutes();
    });
}

function addClickHandlersForRoutes() {
    document.getElementById("place-order").onclick = () => placeOrder();
    ["home","feedback","salads","pizzas","drinks"].forEach(route =>
        Array.from(document.getElementsByClassName(route)).forEach(
            element => {
                element.onclick = () => routeTo(route);
            }
        )
    )
}

function routeTo(routePath) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = ''; // remove existing content
    if (routePath) {
        if (routePath === 'feedback') {
            renderFeedback();
        } else if (routePath === 'home') {
            renderHome(contentContainer)
        } else {
            const category = database.getCategory(routePath);
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

