const { getAllProducts, saveProduct, updateProduct, deleteProduct, getOneProduct, getPopularProducts, makeProductPopular, getPackageProducts, searchProducts, getCategoryProducts } = require("../controllers/productsController")
const { upload } = require("../utils/uploadFile")

const productsRouter = require("express").Router()

productsRouter.get("/popular", getPopularProducts)

productsRouter.patch("/popular/:id", makeProductPopular)

productsRouter.get("/package", getPackageProducts)

productsRouter.get("/category", getCategoryProducts)

productsRouter.get("/search", searchProducts)

productsRouter.get("/", getAllProducts)

productsRouter.post("/", upload.single('img'), saveProduct)

productsRouter.patch("/:id", upload.single('img'), updateProduct)

productsRouter.delete("/:id", deleteProduct)

productsRouter.get("/:id", getOneProduct)

module.exports = productsRouter