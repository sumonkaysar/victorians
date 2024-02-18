const { getCartProducts, saveCartProduct, deleteCartProduct, getMyCartProducts, inCartAlready, getCartByText } = require("../controllers/cartController")

const cartRouter = require("express").Router()

cartRouter.get("/", getCartProducts)

cartRouter.post("/", saveCartProduct)

cartRouter.delete("/:userId/:productId", deleteCartProduct)

cartRouter.get("/myCart", getMyCartProducts)

cartRouter.get("/in-cart-already", inCartAlready)

cartRouter.get("/search", getCartByText)

module.exports = cartRouter