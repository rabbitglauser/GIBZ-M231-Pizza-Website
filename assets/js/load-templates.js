// Function to load an HTML template into a placeholder
function loadTemplate(placeholderId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;

            // Add click event listener to buttons after the template is loaded
            // document.querySelectorAll("button[data-id]").forEach(button => {
            //     button.addEventListener("click", (event) => {
            //         const id = button.getAttribute("data-id");
            //         const name = button.getAttribute("data-name");
            //         const price = parseFloat(button.getAttribute("data-price"));
            //
            //         addToCart({id, name, price, quantity: 1});
            //     });
            // });
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Load templates when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("header-placeholder", "./assets/header.htm");
    loadTemplate("footer-placeholder", "./assets/footer.htm");
});
