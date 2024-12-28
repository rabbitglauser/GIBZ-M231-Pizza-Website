const renderHome = (products, productContainer) => {
    //TODO: dynamically render the home menu items
}

const renderProducts = (products, productsContainer) => {
    products.forEach(product => {
        productsContainer.appendChild(renderProduct(product, productsContainer));
    });
};

const renderProduct = product => {
    const container = createCustomElement("div", "item", `<img src="${product.image}" alt="${product.name}">`)
    container.append(renderName(product))
    container.append(renderDescription(product));
    container.append(renderDetails(product));
    return container;
}

const renderName = product => {
    return createCustomElement("h3", null, product.name);
}

const renderDescription = product => {
    return ('description' in product) ? createCustomElement("div", "description", product.description) : '';
}

const renderDetails = product => {
    const orderElement = createCustomElement("div", "details");
    orderElement.append(renderOptions(product));
    orderElement.append(renderPrice(product));
    orderElement.append(renderAddToCartButton(product));
    return orderElement;
}

const renderOptions = product => {
    if ('options' in product) {
        const selectElement = createCustomElement("select");
        selectElement.setAttribute("id", product.id);
        selectElement.onchange = () => handleProductOptionSelect(selectElement, product.id, product.price);
        product.options.forEach(option => {
            let description = `${option.description}`;
            if ('amount' in option && option.amount > 0) {
                description += ` (+ ${option.amount})`;
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
    const priceDiv = document.createElement("div");
    priceDiv.appendChild(createCustomElement("span", "amount", product.price));
    priceDiv.appendChild(createCustomElement("span", null, ' CHF'));
    return priceDiv;
}

const renderAddToCartButton = product => {

    // TODO: change from using DOMParser to constructing it using dom nodes

    const button =
        `<button class="add-to-cart" onclick="addToCart('${product.id}')" >
            <i class="fas fa-shopping-cart"></i>
         </button>`;
    const element = new DOMParser().parseFromString(button, "text/html").body.firstChild;
    return element;
}

const handleProductOptionSelect = (sourceSelect, productId, price) => {

    // TODO: handle this change event to update the price of the product in the UI

    console.log(`The value selected was [${sourceSelect.value}] for product [${productId}] original price [${price}]`);
}