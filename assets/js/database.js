const database = {

    // This is the database of categories and products
    "loaded": false,
    "categories": [],

    loadDatabase: function () {
        if (!database.loaded) {
             return fetch('./data/products.json')
                .then(response => response.json())
                .then(json => database.categories = json.categories)
                .then(() => database.loaded = true)
                .catch(error => {
                    throw new Error('Failed to fetch the database: ' + error);
                });
        }
        return Promise.resolve();
    },

    getCategory: function(categoryId) {
        return database.getCategories().find(category => {



      return      category.id === categoryId;
        });
    },

    getCategories: function() {
        return database.categories;
    },

    getProducts: function (categoryId) {
        const category = database.getCategory(categoryId);
        return (category && 'products' in category) ? category.products : [];
    },

    getProduct: function (productId) {
        const categoryId = productId.split('-')[0];
        const products = database.getProducts(categoryId);
        return products.find(product => product.id === productId);
    }
}
