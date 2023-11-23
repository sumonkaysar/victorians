const { client } = require("./mongoClient")

const DB = 'victorians';

const productsCollection = () => client().db(DB).collection("products")
const cartCollection = () => client().db(DB).collection("cart")
const reviewsCollection = () => client().db(DB).collection("reviews")
const advertisedProductsCollection = () => client().db(DB).collection("advertisedProducts")
const membershipsCollection = () => client().db(DB).collection("memberships")
const usersCollection = () => client().db(DB).collection("users")
const passwordsCollection = () => client().db(DB).collection("passwords")
const purchasesCollection = () => client().db(DB).collection("purchases")
const notificationsCollection = () => client().db(DB).collection("notifications")
const couponsCollection = () => client().db(DB).collection("coupons")

module.exports = {
    productsCollection,
    cartCollection,
    reviewsCollection,
    advertisedProductsCollection,
    membershipsCollection,
    usersCollection,
    passwordsCollection,
    purchasesCollection,
    notificationsCollection,
    couponsCollection,
}