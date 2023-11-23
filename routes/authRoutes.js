const { signup, login, forgotPassword, changePassword, isLoggedIn } = require("../controllers/authController")
const { verifyJWT } = require("../middlewares/verifyJWT")
const { upload } = require("../utils/uploadFile")

const authRouter = require("express").Router()

authRouter.post("/signup", upload.single('avatar'), signup)

authRouter.post("/login", login)

authRouter.post("/password/change", verifyJWT, changePassword)

authRouter.post("/password/forgot", verifyJWT, forgotPassword)

authRouter.post("/isLoggedIn", verifyJWT, isLoggedIn)

module.exports = authRouter