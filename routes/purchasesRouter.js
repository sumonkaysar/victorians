const { getAllPurchases, getAllPurchasesByYear, getPurchasesByName, getPremiumUsers } = require("../controllers/purchasesController")

const purchasesRouter = require("express").Router()

purchasesRouter.get("/", getAllPurchases)

purchasesRouter.get("/year", getAllPurchasesByYear)

purchasesRouter.get("/search", getPurchasesByName)

purchasesRouter.get("/users", getPremiumUsers)

module.exports = purchasesRouter