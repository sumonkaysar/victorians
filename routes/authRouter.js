const { signup, login, forgotPassword, changePassword, isLoggedIn, verifyEmail, newOTP } = require("../controllers/authController")
const {  verifyUser } = require("../middlewares/verifyJWT")
const { upload } = require("../utils/uploadFile")

const authRouter = require("express").Router();

authRouter.post("/signup", upload.single('avatar'), signup)

authRouter.post("/login", login)

authRouter.post("/password/change", verifyUser, changePassword)

authRouter.post("/password/forgot", verifyUser, forgotPassword)

authRouter.patch("/email/verify", verifyEmail)

authRouter.patch("/otp/resend", newOTP)

authRouter.get("/isLoggedIn", verifyUser, isLoggedIn)

module.exports = authRouter