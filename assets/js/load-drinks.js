const url = './data/drinks.json';

let renderFunction = (items, menuContainer) => {
    items.forEach(item => {
        const element = document.createElement("div");
        menuContainer.appendChild(element);
        element.classList.add("item");
        element.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <div class="order">
            <select>
              ${item.size.map(size => `<option>${size}</option>`).join("")}
            </select>
            <span>$${item.price}</span>
            <i class="fas fa-shopping-cart"></i>
          </div>
        `;
    });
};

document.addEventListener("DOMContentLoaded",
    () => loadData('menu', url, renderFunction));
