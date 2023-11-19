const { client } = require("./mongoClient")

const DB = 'victorians';

const productsCollection = () => client().db(DB).collection("products")
const cartCollection = () => client().db(DB).collection("cart")
const reviewsCollection = () => client().db(DB).collection("reviews")
const advertisedProductsCollection = () => client().db(DB).collection("advertisedProducts")

module.exports = {
    productsCollection,
    cartCollection,
    reviewsCollection,
    advertisedProductsCollection,
}