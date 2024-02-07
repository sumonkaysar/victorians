const { client } = require("./mongoClient")

const DB = 'victorians';

const productsCollection           = () => client().db(DB).collection("products")
const cartCollection               = () => client().db(DB).collection("cart")
const reviewsCollection            = () => client().db(DB).collection("reviews")
const advertisedProductsCollection = () => client().db(DB).collection("advertisedProducts")
const membershipsCollection        = () => client().db(DB).collection("memberships")
const usersCollection              = () => client().db(DB).collection("users")
const passwordsCollection          = () => client().db(DB).collection("passwords")
const userMessage                  = ()=>  client().db(DB).collection("message")
const purchasesCollection          = () => client().db(DB).collection("purchases")
const notificationsCollection      = () => client().db(DB).collection("notifications")
const couponsCollection            = () => client().db(DB).collection("coupons")
const pendingPaymentsCollection    = () => client().db(DB).collection("pendingPayments")
const premiumCollection            = () => client().db(DB).collection("premium")
const packagesCollection           = () => client().db(DB).collection("packages")
const reviewRepliesCollection      = () => client().db(DB).collection("reviewReplies")

module.exports = {
    productsCollection,
    cartCollection,
    reviewsCollection,
    advertisedProductsCollection,
    membershipsCollection,
    usersCollection,
    passwordsCollection,
    userMessage,
    purchasesCollection,
    notificationsCollection,
    couponsCollection,
    pendingPaymentsCollection,
    premiumCollection,
    packagesCollection,
    reviewRepliesCollection,
}