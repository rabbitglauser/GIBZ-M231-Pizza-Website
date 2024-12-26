const url = './data/pizzas.json';

let renderFunction = (items, menuContainer) => {
    items.forEach(item => {
        const element = document.createElement("div");
        menuContainer.appendChild(element);
        element.classList.add("pizza");
        element.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="price">${item.price}$</div>
          <button><i class="fas fa-shopping-cart"></i></button>
        `;
    });
};

document.addEventListener("DOMContentLoaded",
    () => loadData('menu', url, renderFunction));
