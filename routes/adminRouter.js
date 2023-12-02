const { makeAdmin, removeAdmin } = require("../controllers/adminController")

const adminRouter = require("express").Router()

adminRouter.patch("/make/:id", makeAdmin)

adminRouter.patch("/remove/:id", removeAdmin)

module.exports = adminRouter