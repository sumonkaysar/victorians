const { getAllProducts, saveProduct, updateProduct, deleteProduct, getOneProduct } = require("../controllers/advertisedProductsController")
const { verifyAdmin } = require("../middlewares/verifyJWT")
const { upload } = require("../utils/uploadFile")

const advertisedProductsRouter = require("express").Router()

advertisedProductsRouter.get("/", getAllProducts)

advertisedProductsRouter.post("/", verifyAdmin, upload.single('adImg'), saveProduct)

advertisedProductsRouter.patch("/:id", verifyAdmin, updateProduct)

advertisedProductsRouter.delete("/:id", verifyAdmin, deleteProduct)

// advertisedProductsRouter.get("/:id", getOneProduct)

module.exports = advertisedProductsRouter