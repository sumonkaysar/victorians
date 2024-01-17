const { getAllPurchases, getAllPurchasesByYear, getPurchasesByEmail, getPremiumUsers, getPremiumUsersByEmail, getPremiumUserProducts, updatePremiumUserProduct } = require("../controllers/purchasesController")

const purchasesRouter = require("express").Router()

purchasesRouter.get("/", getAllPurchases)

purchasesRouter.get("/year", getAllPurchasesByYear)

purchasesRouter.get("/search", getPurchasesByEmail)

purchasesRouter.get("/users", getPremiumUsers)

purchasesRouter.get("/users/search", getPremiumUsersByEmail)

purchasesRouter.get("/users/:userId/products", getPremiumUserProducts)

purchasesRouter.patch("/users/:userId/:productId", updatePremiumUserProduct)

module.exports = purchasesRouter