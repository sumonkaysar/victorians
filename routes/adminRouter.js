const { makeAdmin, removeAdmin } = require("../controllers/adminController")
const { verifyOwner } = require("../middlewares/verifyJWT")

const adminRouter = require("express").Router()

adminRouter.patch("/make/:id", verifyOwner, makeAdmin)

adminRouter.patch("/remove/:id", verifyOwner, removeAdmin)

module.exports = adminRouter