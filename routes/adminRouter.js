const { makeAdmin, removeAdmin } = require("../controllers/adminController")
const { verifyOwner } = require("../middlewares/verifyJWT")

const adminRouter = require("express").Router()

adminRouter.post("/make", verifyOwner, makeAdmin)

adminRouter.post("/remove", verifyOwner, removeAdmin)

module.exports = adminRouter