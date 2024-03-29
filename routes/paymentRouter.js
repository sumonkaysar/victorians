const { paymentSuccess, paymentFailure, paymentCancel, paymentIpn, makeProductsPayment, makePackagePayment } = require("../controllers/paymentController")

const paymentRouter = require("express").Router()

// make products payment
paymentRouter.post("/", makeProductsPayment)

// make packages payment
paymentRouter.post("/packages", makePackagePayment)

// payment success
paymentRouter.post("/success", paymentSuccess)

// payment failure
paymentRouter.post("/failure", paymentFailure)

// payment cancel
paymentRouter.get("/cancel", paymentCancel)


module.exports = paymentRouter