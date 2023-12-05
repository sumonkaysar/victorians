const { makeAdmin, removeAdmin } = require("../controllers/adminController")

const adminRouter = require("express").Router()

adminRouter.post("/make", makeAdmin)

adminRouter.post("/remove", removeAdmin)

module.exports = adminRouter