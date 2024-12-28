
function createCustomElement(elementName, classes, innerHtml) {
    const element = document.createElement(elementName);
    if (classes) {
        element.classList.add(classes);
    }
    if (innerHtml) {
        element.innerHTML = innerHtml;
    }
    return element;
}