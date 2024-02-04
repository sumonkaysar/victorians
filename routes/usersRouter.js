const { getUsers, getOneUser, getUserRole, getPremiumUsers, updateUser, updateOwner } = require("../controllers/usersController")
const { verifyOwner } = require("../middlewares/verifyJWT")
// const { upload } = require("../utils/uploadFile")

const usersRouter = require("express").Router()

usersRouter.get("/", getUsers)

usersRouter.get("/role", getUserRole)

usersRouter.get("/premium", getPremiumUsers)

usersRouter.get("/:id", getOneUser)

// usersRouter.post("/", upload.single('avatar'), createUser)

usersRouter.patch("/owner/:id", verifyOwner, updateOwner)

usersRouter.patch("/:id", updateUser)

// usersRouter.delete("/:id", deleteUser)

// usersRouter.post("/:id", getOneUser)

module.exports = usersRouter