const { getAllPurchases, getAllPurchasesByYear, getPurchasesByName } = require("../controllers/purchasesController")

const purchasesRouter = require("express").Router()

purchasesRouter.get("/", getAllPurchases)

purchasesRouter.get("/year", getAllPurchasesByYear)

purchasesRouter.get("/search", getPurchasesByName)

purchasesRouter.get("/users", getPurchasesByName)

module.exports = purchasesRouter