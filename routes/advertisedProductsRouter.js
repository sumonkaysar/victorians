const { getAllProducts, saveProduct, updateProduct, deleteProduct, getOneProduct } = require("../controllers/advertisedProductsController")

const advertisedProductsRouter = require("express").Router()

advertisedProductsRouter.get("/", getAllProducts)

advertisedProductsRouter.post("/", saveProduct)

advertisedProductsRouter.patch("/:id", updateProduct)

advertisedProductsRouter.delete("/:id", deleteProduct)

advertisedProductsRouter.get("/:id", getOneProduct)

module.exports = advertisedProductsRouter