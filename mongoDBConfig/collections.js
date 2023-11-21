const { client } = require("./mongoClient")

const DB = 'victorians';

const productsCollection = () => client().db(DB).collection("products")
const cartCollection = () => client().db(DB).collection("cart")
const reviewsCollection = () => client().db(DB).collection("reviews")
const advertisedProductsCollection = () => client().db(DB).collection("advertisedProducts")
const membershipsCollection = () => client().db(DB).collection("memberships")
const usersCollection = () => client().db(DB).collection("users")
const passwordsCollection = () => client().db(DB).collection("passwords")

module.exports = {
    productsCollection,
    cartCollection,
    reviewsCollection,
    advertisedProductsCollection,
    membershipsCollection,
    usersCollection,
    passwordsCollection,
}