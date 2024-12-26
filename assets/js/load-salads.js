const url = './data/salads.json';

let renderFunction = (items, menuContainer) => {
    items.forEach(item => {
        const element = document.createElement("div");
        menuContainer.appendChild(element);
        element.classList.add("salad-item");
        element.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="order">
            <select>
              ${item.dressing.map(d => `<option>${d}</option>`).join("")}
            </select>
            <span>$${item.price}</span>
            <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        `;
    });
};

document.addEventListener("DOMContentLoaded",
    () => loadData('menu', url, renderFunction));
