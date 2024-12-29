const renderHome = (products, container) => {
    //TODO: dynamically render the home menu items

    // render the splash screen image
    // render the links to the product category pages
    database.getCategories().forEach(
        category => container.appendChild(renderProductLink(category))
    );
}

const renderProductLink = (category) => {

    // category.id
    // category.description

return  `   <div>
        <a class="category" href="./${category.id}.html">
            <img src="assets/images/${category.id}.jpg" alt="pizzas">
                <span>${category.description}</span>
        </a>
    </div>`;
}

const renderProducts = (products, productsContainer) => {
    products.forEach(product => {
        productsContainer.appendChild(renderProduct(product, productsContainer));
    });
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
    priceDiv.appendChild(createCustomElement("span",  `${product.id}-currency`, '$'));
    priceDiv.appendChild(createCustomElementWithId("span", `${product.id}-amount`, product.price));
    return priceDiv;
}

const renderAddToCartButton = product => {
    const button = createCustomElement('button', 'add-to-cart');
    button.onclick = () => handleAddToCart(product.id);
    button.appendChild(createCustomElement('i', 'fas fa-shopping-cart'));
    return button;
};

