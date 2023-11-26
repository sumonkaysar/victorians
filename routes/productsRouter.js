const { getAllProducts, saveProduct, updateProduct, deleteProduct, getOneProduct, getPopularProducts } = require("../controllers/productsController")
const { upload } = require("../utils/uploadFile")

const productsRouter = require("express").Router()

productsRouter.get("/popular", getPopularProducts)

productsRouter.get("/", getAllProducts)

productsRouter.post("/", upload.single('img'), saveProduct)

productsRouter.patch("/:id", updateProduct)

productsRouter.delete("/:id", deleteProduct)

productsRouter.get("/:id", getOneProduct)

module.exports = productsRouter