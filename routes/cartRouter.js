const { getCartProducts, saveCartProduct, deleteCartProduct, getMyCartProducts, inCartAlready } = require("../controllers/cartController")

const cartRouter = require("express").Router()

cartRouter.get("/", getCartProducts)

cartRouter.post("/", saveCartProduct)

cartRouter.delete("/:userId/:productId", deleteCartProduct)

cartRouter.get("/myCart", getMyCartProducts)

cartRouter.get("/in-cart-already", inCartAlready)

module.exports = cartRouter