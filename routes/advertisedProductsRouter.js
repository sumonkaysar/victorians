const { getAllProducts, saveProduct, updateProduct, deleteProduct, getOneProduct } = require("../controllers/advertisedProductsController")
const { upload } = require("../utils/uploadFile")

const advertisedProductsRouter = require("express").Router()

advertisedProductsRouter.get("/", getAllProducts)

advertisedProductsRouter.post("/", upload.single('adImg'), saveProduct)

advertisedProductsRouter.patch("/:id", updateProduct)

advertisedProductsRouter.delete("/:id", deleteProduct)

advertisedProductsRouter.get("/:id", getOneProduct)

module.exports = advertisedProductsRouter