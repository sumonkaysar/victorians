const { getAllProducts, saveProduct, updateProduct, deleteProduct, getOneProduct } = require("../controllers/productsController")

const productsRouter = require("express").Router()

productsRouter.get("/", getAllProducts)

productsRouter.post("/", saveProduct)

productsRouter.patch("/:id", updateProduct)

productsRouter.delete("/:id", deleteProduct)

productsRouter.get("/:id", getOneProduct)

module.exports = productsRouter