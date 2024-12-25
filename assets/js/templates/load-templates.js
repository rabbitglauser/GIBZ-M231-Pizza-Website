// Function to load an HTML template into a placeholder
function loadTemplate(placeholderId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Load templates when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("header-placeholder", "./assets/templates/header.html");
    loadTemplate("footer-placeholder", "./assets/templates/footer.html");
});
