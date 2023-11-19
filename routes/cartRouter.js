const { getCartProducts, saveCartProduct, deleteCartProduct } = require("../controllers/cartController")

const cartRouter = require("express").Router()

cartRouter.get("/", getCartProducts)

cartRouter.post("/", saveCartProduct)

cartRouter.delete("/:id", deleteCartProduct)

module.exports = cartRouter