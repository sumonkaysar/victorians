const { signup, login, forgotPassword, changePassword } = require("../controllers/authController")
const { upload } = require("../utils/uploadFile")

const authRouter = require("express").Router()

authRouter.post("/signup", upload.single('avatar'), signup)

authRouter.post("/login", login)

authRouter.post("/password/change", changePassword)

authRouter.post("/password/forgot", forgotPassword)

module.exports = authRouter