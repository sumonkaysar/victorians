const { getAllPurchases, getAllPurchasesByYear, getPurchasesByEmail, getPremiumUsers, getPremiumUsersByEmail } = require("../controllers/purchasesController")

const purchasesRouter = require("express").Router()

purchasesRouter.get("/", getAllPurchases)

purchasesRouter.get("/year", getAllPurchasesByYear)

purchasesRouter.get("/search", getPurchasesByEmail)

purchasesRouter.get("/users", getPremiumUsers)

purchasesRouter.get("/users/search", getPremiumUsersByEmail)

module.exports = purchasesRouter