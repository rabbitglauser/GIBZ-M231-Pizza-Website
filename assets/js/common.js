function loadData(id, url, renderFunction) {
    const menuContainer = document.getElementById(id);
    fetch(url)
        .then(response => response.json())
        .then(json => {

            //TODO: some code here
            renderFunction(json, menuContainer);

            // TODO: some code here
        })
        .catch(error => {
            console.error("Error loading data:", error);
            menuContainer.innerHTML = `<p>Failed to load the data from ${url} Please try again later.</p>`;
        });
}

function loadHtml(id, url, renderFunction) {
    const menuContainer = document.getElementById(id);
    fetch(url)
        .then(response => response.text())
        .then(text => renderFunction(text, menuContainer))
        .catch(error => {
            console.error("Error loading html text:", error);
            menuContainer.innerHTML = `<p>Failed to load the html text from ${url}</p>`;
        });
}
