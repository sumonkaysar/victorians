const { signup, login, forgotPassword, changePassword, isLoggedIn } = require("../controllers/authController")
const {  verifyUser } = require("../middlewares/verifyJWT")
const { upload } = require("../utils/uploadFile")

const authRouter = require("express").Router();

authRouter.post("/signup", upload.single('avatar'), signup)

authRouter.post("/login", login)

authRouter.post("/password/change", verifyUser, changePassword)

authRouter.post("/password/forgot", verifyUser, forgotPassword)

authRouter.get("/isLoggedIn", verifyUser, isLoggedIn)

module.exports = authRouter