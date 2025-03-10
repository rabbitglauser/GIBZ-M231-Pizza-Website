document.addEventListener("DOMContentLoaded", () => initializeApplication());

const initializeApplication = () => {
    const databasePromise = database.loadDatabase();
    Promise.all([databasePromise]).then(() => {
        updateCartUI();
        routeTo('home');
    });
}

function addClickHandlersForRoutes() {
    Object.keys(routingTable).forEach(route =>
        Array.from(document.getElementsByClassName(route)).forEach(
            element => element.onclick = () => routeTo(route)
        )
    )
}

function routeTo(routePath) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = ''; // remove existing content
    if (routePath) {
        const routingFunction = routingTable[routePath];
        if (routingFunction) {
            const promise = routingFunction(routePath, contentContainer);
            if (promise) {
                promise.then(() => addClickHandlersForRoutes());
            }
        } else {
            render404Page(contentContainer).then(_ => null);
        }
    }
    return false;
}

const routingTable = {
    'place-order': (routePath, contentContainer) => placeOrder(contentContainer),
    'home': (routePath, contentContainer) => { return renderHome(contentContainer)},
    'feedback-form': (routePath, contentContainer) => { return renderFeedbackForm(contentContainer)},
    'feedback-confirmation': (routePath, contentContainer) => renderFeedbackConfirmation(contentContainer),
    'salads': (categoryId, contentContainer) => renderProducts(database.getCategory(categoryId), contentContainer),
    'pizzas': (categoryId, contentContainer) => renderProducts(database.getCategory(categoryId), contentContainer),
    'drinks': (categoryId, contentContainer) => renderProducts(database.getCategory(categoryId), contentContainer),
}

// Function to load an HTML template into a placeholder
function loadHtmlFragment(url, contentContainer) {
    return fetch(url)
        .then(response => response.text())
        .then(text => contentContainer.innerHTML = text)
        .catch(error => console.error(`Error loading ${url} :`, error));
}

