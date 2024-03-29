const { getAllCoupons, createCoupon, updateCoupon, deleteCoupon, matchCoupon, findCoupon, checkCoupon } = require("../controllers/couponsController")
const { verifyAdmin } = require("../middlewares/verifyJWT")

const couponsRouter = require("express").Router()

couponsRouter.get("/", verifyAdmin, getAllCoupons)

couponsRouter.post("/", verifyAdmin, createCoupon)

couponsRouter.patch("/productId/:productId/type/:type", verifyAdmin, updateCoupon)

couponsRouter.delete("/:id", verifyAdmin, deleteCoupon)

couponsRouter.post("/match", verifyAdmin, matchCoupon)

couponsRouter.post("/check-validity", findCoupon)

couponsRouter.get("/products/:productId", checkCoupon)

module.exports = couponsRouter