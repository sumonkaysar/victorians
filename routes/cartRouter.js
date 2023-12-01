const { getCartProducts, saveCartProduct, deleteCartProduct, inCartAlready, getMyCartProducts, getCartPackage } = require("../controllers/cartController")

const cartRouter = require("express").Router()

cartRouter.get("/in-cart-already", inCartAlready)

cartRouter.get("/myCart", getMyCartProducts)

cartRouter.get("/package/:packageId", getCartPackage)

cartRouter.get("/", getCartProducts)

cartRouter.post("/", saveCartProduct)

cartRouter.delete("/:userId/:productId", deleteCartProduct)

module.exports = cartRouter