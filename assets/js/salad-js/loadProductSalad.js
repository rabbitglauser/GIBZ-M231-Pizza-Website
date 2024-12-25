document.addEventListener("DOMContentLoaded", () => {
    const saladMenuContainer = document.getElementById("salad-menu");

    // Fetch salad data from the JSON file
    fetch("./data/salad-data/salad.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load JSON file: ${response.statusText}`);
            }
            return response.json();
        })
        .then(salads => {
            // Generate and append salads to the salad menu container
            salads.forEach(salad => {
                const saladDiv = document.createElement("div");
                saladDiv.classList.add("salad-item");

                saladDiv.innerHTML = `
          <img src="${salad.image}" alt="${salad.name}">
          <h3>${salad.name}</h3>
          <p>${salad.description}</p>
          <div class="order">
            <select>
              ${salad.dressing.map(d => `<option>${d}</option>`).join("")}
            </select>
            <span>$${salad.price}</span>
            <i class="fas fa-shopping-cart"></i>
          </div>
        `;

                saladMenuContainer.appendChild(saladDiv);
            });
        })
        .catch(error => {
            console.error("Error loading salads:", error);
            saladMenuContainer.innerHTML = `<p>Failed to load the menu. Please try again later.</p>`;
        });
});
