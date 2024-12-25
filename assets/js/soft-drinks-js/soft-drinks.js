document.addEventListener("DOMContentLoaded", () => {
    const drinksMenuContainer = document.getElementById("drinks-menu");

    // Fetch drinks data from the JSON file
    fetch("./data/soft-drinks-data/soft-drinks.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load JSON file: ${response.statusText}`);
            }
            return response.json();
        })
        .then(drinks => {
            // Generate and append drinks to the drinks menu container
            drinks.forEach(drink => {
                const drinkDiv = document.createElement("div");
                drinkDiv.classList.add("drink-item");

                drinkDiv.innerHTML = `
          <img src="${drink.image}" alt="${drink.name}">
          <h3>${drink.name}</h3>
          <p>${drink.size.join(", ")}</p>
          <div class="order">
            <select>
              ${drink.size.map(size => `<option>${size}</option>`).join("")}
            </select>
            <span>$${drink.price}</span>
            <i class="fas fa-shopping-cart"></i>
          </div>
        `;

                drinksMenuContainer.appendChild(drinkDiv);
            });
        })
        .catch(error => {
            console.error("Error loading drinks:", error);
            drinksMenuContainer.innerHTML = `<p>Failed to load the menu. Please try again later.</p>`;
        });
});
