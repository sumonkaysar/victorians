const { getCartPackage } = require("../controllers/cartController")
const { getAllProducts, saveProduct, updateProduct, deleteProduct, getOneProduct, getPopularProducts, makeProductPopular, getPackageProducts, searchProducts, getCategoryProducts, getMyPaidProducts, getAllProductsNamesByProductIds, getProductsByProductIdAndPackageId, productStock } = require("../controllers/productsController")
const { verifyAdmin } = require("../middlewares/verifyJWT")

const { upload } = require("../utils/uploadFile")

const productsRouter = require("express").Router()

productsRouter.get("/popular", getPopularProducts)

productsRouter.patch("/popular/:id", verifyAdmin, makeProductPopular)

productsRouter.get("/package", getPackageProducts)

productsRouter.get("/package/:packageId", getCartPackage)

productsRouter.get("/category", getCategoryProducts)

productsRouter.get("/search", searchProducts)

productsRouter.get("/myProducts", getMyPaidProducts)

productsRouter.post("/productsByIds", getAllProductsNamesByProductIds)

productsRouter.get("/", getAllProducts)

productsRouter.post("/", upload.single('img'), saveProduct)

productsRouter.patch("/:id", upload.single('img'), updateProduct)

productsRouter.patch("/stock/:id", productStock)

productsRouter.delete("/:id", deleteProduct)

productsRouter.get("/:id", getOneProduct)

productsRouter.post("/packageIds", getProductsByProductIdAndPackageId)

module.exports = productsRouter