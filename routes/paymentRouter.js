const { makePayment, paymentSuccess, paymentFailure, paymentCancel, paymentIpn } = require("../controllers/paymentController")

const paymentRouter = require("express").Router()

// make payment
paymentRouter.post("/", makePayment)

// payment success
paymentRouter.post("/success", paymentSuccess)

// payment failure
paymentRouter.post("/failure", paymentFailure)

// payment cancel
paymentRouter.post("/cancel", paymentCancel)

// payment ipn
paymentRouter.post("/ipn", paymentIpn)

module.exports = paymentRouter