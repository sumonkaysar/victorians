const { getAllPurchases } = require("../controllers/purchasesController")

const purchasesRouter = require("express").Router()

purchasesRouter.get("/", getAllPurchases)

module.exports = purchasesRouter