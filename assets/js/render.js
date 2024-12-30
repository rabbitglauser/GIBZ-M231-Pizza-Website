const render404Page = function (contentContainer) {
    document.title = `${companyName} - 404 - resource not found`;
    return loadHtmlFragment("./assets/404.htm", contentContainer);
}

const renderFeedbackForm = (contentContainer) => {
    document.title = `${companyName} - Feedback`;
    return loadHtmlFragment("./assets/feedback.htm", contentContainer)
}

const renderFeedbackConfirmation = contentContainer => {
    document.title = `${companyName} - Confirmation`;
    const spanElement = createCustomElement("span", "category-description", "Thank you for your feedback!");
    contentContainer.appendChild(spanElement);
}

const renderHome = (contentContainer) => {
    // render the header
    document.title = `${companyName} - home`;
    contentContainer.appendChild(createCustomElement("h1", null, `Welcome to ${companyName}`));

    // render the splash screen image
    const imgElement = createCustomElement("img", "splash-image");
    imgElement.setAttribute("src", "assets/images/splash.jpg");
    imgElement.setAttribute("alt", "Pizza Factory Interior");
    contentContainer.appendChild(imgElement);
    const imageDivElement = createCustomElement("div", "image-section");
    imageDivElement.appendChild(imgElement);
    contentContainer.appendChild(imageDivElement);

    // Render the category links
    const menuDivElement = createCustomElement("div", "menu-section");
    database.getCategories().forEach(
        category => menuDivElement.appendChild(renderProductLink(category))
    );
    contentContainer.appendChild(menuDivElement);
}

const renderProductLink = (category) => {
    const imgElement = createCustomElement("img", "category-image");
    imgElement.setAttribute("src", `assets/images/${category.id}.jpg`);
    imgElement.setAttribute("alt", category.description);
    const spanElement = createCustomElement("span", "category-description", category.description);

    const anchorElement = createCustomElement("a", category.id);
    // anchorElement.onclick = () => loadProducts(category.id);
    anchorElement.appendChild(imgElement);
    anchorElement.appendChild(spanElement);

    const divElement = createCustomElement("div");
    divElement.appendChild(anchorElement)
    return divElement;
}

const renderProducts = (category, contentContainer) => {
    document.title = `${companyName} - ${category.description}`;
    contentContainer.appendChild(createCustomElement("h1", null, category.description));
    const divElement = createCustomElement("div", "products-container");
    if ('products' in category) {
        category.products.forEach(product => {
            divElement.appendChild(renderProduct(product));
        });
    }
    contentContainer.appendChild(divElement);
};

const renderProduct = product => {
    const container = createCustomElement("div", "product", `<img src="${product.image}" alt="${product.description}">`)
    container.append(renderDescription(product))
    container.append(renderIngredients(product));
    container.append(renderDetails(product));
    return container;
}

const renderDescription = product => {
    return createCustomElement("h3", "description", product.description);
}

const renderIngredients = product => {
    return ('ingredients' in product) ? createCustomElement("div", "ingredients", product.ingredients) : '';
}

const renderDetails = product => {
    const detailsElement = createCustomElement("div", "details");
    detailsElement.setAttribute("id", `${product.id}-details`);
    detailsElement.append(renderOptions(product, detailsElement));
    detailsElement.append(renderPrice(product));
    detailsElement.append(renderAddToCartButton(product));
    return detailsElement;
}

const renderOptions = (product, detailsElement) => {
    if ('options' in product) {
        const selectElement = createCustomElement("select");
        selectElement.setAttribute("id", product.id);
        selectElement.onchange = () => handleSelectedProductOption(detailsElement, selectElement);
        product.options.forEach(option => {
            let description = `${option.description}`;
            if ('amount' in option && option.amount > 0) {
                description += ` (+${option.amount})`;
            }
            const optionElement = createCustomElement("option", null, description);
            optionElement.setAttribute("value", option.id);
            selectElement.appendChild(optionElement);
        });
        return selectElement;
    }
    return ''
}

const renderPrice = product => {
    const priceDiv = createCustomElement("div");
    priceDiv.appendChild(createCustomElement("span", `${product.id}-currency`, '$'));
    priceDiv.appendChild(createCustomElementWithId("span", `${product.id}-amount`, product.amount));
    return priceDiv;
}

const renderAddToCartButton = product => {
    const button = createCustomElement('button', 'add-to-cart');
    button.onclick = () => handleAddToCart(product.id);
    button.appendChild(createCustomElement('i', 'fas fa-shopping-cart'));
    return button;
};

