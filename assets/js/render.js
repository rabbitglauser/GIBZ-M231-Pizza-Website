
const renderHome = (items, itemContainer) => {
    //TODO: dynamically render the home menu items
}

const renderItems = (items, itemsContainer) => {
    items.forEach(item => {
        itemsContainer.appendChild(renderItem(item, itemsContainer));
    });
};

const renderItem = (item) => {
    const container = document.createElement("div");
    container.classList.add("item");
    container.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
    container.append(renderName(item))
    container.append(renderDescription(item));
    container.append(renderOrder(item));
    return container;
}

const renderDescription = (item) => {
    if ('description' in item) {
        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("description");
        descriptionElement.innerText = item.description;
        return descriptionElement;
    }
    return '';
}

const renderName = (item) => {
    const nameElement = document.createElement("h3");
    nameElement.innerText = item.name;
    return nameElement;
}

function renderOrder(item) {
    const orderElement = document.createElement("div");
    orderElement.classList.add("order");

    if ('options' in item) {
        const select = `<select>
            ${item.options.map(value => `<option>${value}</option>`).join("")}
        </select>`;
        orderElement.appendChild(new DOMParser().parseFromString(select, "text/html").body.firstChild);
    }
    orderElement.appendChild(document.createElement("span")).innerHTML = `$${item.price}`;

    const button =
        `<button class="add-to-cart" onclick="addToCart('${item.id}')" >
            <i class="fas fa-shopping-cart"></i>
         </button>`;
    orderElement.appendChild(new DOMParser().parseFromString(button, "text/html").body.firstChild);

    return orderElement;
}
