const { getUsers, getUserRole, updateUser, getOneUser } = require("../controllers/usersController")
// const { upload } = require("../utils/uploadFile")

const usersRouter = require("express").Router()

usersRouter.get("/role", getUserRole)

usersRouter.get("/", getUsers)
usersRouter.get("/:id", getOneUser)

// usersRouter.post("/", upload.single('avatar'), createUser)

usersRouter.patch("/:id", updateUser)

// usersRouter.delete("/:id", deleteUser)

// usersRouter.post("/:id", getOneUser)

module.exports = usersRouter