const { getAllCoupons, createCoupon, updateCoupon, deleteCoupon, matchCoupon } = require("../controllers/couponsController")

const couponsRouter = require("express").Router()

couponsRouter.get("/", getAllCoupons)

couponsRouter.post("/", createCoupon)

couponsRouter.patch("/:id", updateCoupon)

couponsRouter.delete("/:id", deleteCoupon)

couponsRouter.post("/match", matchCoupon)

module.exports = couponsRouter