const { getAllProducts, saveProduct, updateProduct, deleteProduct, makeAdPayment, paymentSuccess } = require("../controllers/advertisedProductsController")
const { verifyAdmin } = require("../middlewares/verifyJWT")
const { upload } = require("../utils/uploadFile")

const advertisedProductsRouter = require("express").Router()

advertisedProductsRouter.get("/", getAllProducts)

advertisedProductsRouter.post("/", verifyAdmin, upload.single('adImg'), saveProduct)

advertisedProductsRouter.patch("/:id", verifyAdmin, upload.single('adImg'), updateProduct)

advertisedProductsRouter.delete("/:id", verifyAdmin, deleteProduct)

advertisedProductsRouter.post("/payment", makeAdPayment)

advertisedProductsRouter.post("/payment/success", paymentSuccess)

module.exports = advertisedProductsRouter