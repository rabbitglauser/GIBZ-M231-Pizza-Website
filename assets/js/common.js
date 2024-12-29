
function createCustomElement(elementName, classes, innerHtml) {
    const element = document.createElement(elementName);
    if (classes) {
        element.classList.add(...classes.split(' ').map(cls => cls.trim()));
    }
    if (innerHtml) {
        element.innerHTML = innerHtml;
    }
    return element;
}

function createCustomElementWithId(elementName, id, innerHtml) {
    const element = document.createElement(elementName);
    if (id) {
        element.id = id;
    }
    if (innerHtml) {
        element.innerHTML = innerHtml;
    }
    return element;
}
