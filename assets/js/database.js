const database = {

    // TODO: add ALL the products to the products.json file

    // This is the database of categories and products
    "categories": [],

    loadDatabase: function () {
        // TODO: load the database in to memory and store it in the database object

        // fetch the products.json file as Json for categories and products
        const categories = [];
        // store it in the database memory
        this.storeCategories(categories);
    },

    storeCategories: function (categories) {
        this['categories'] = categories;
    },

    calculatePrice: function (cartId) {
        // TODO: finish this
        // split the id into two/three parts
        // get the product from the DB (call getProduct)
        // add the price to the option price (if applicable)
        // return the price
        return 14;
    },

    getProduct: function (category, id, optionId) {
        // TODO: finish this
        // get all the products from getProducts
        // find the one you need
        // return the product details
    },

    getProducts: function (category) {
        // TODO: finish this
        // look in the DB memory for the product category
        // return the array of products for that category
    }
}
