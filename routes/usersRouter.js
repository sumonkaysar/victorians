const { getUsers, getOneUser, getUserRole } = require("../controllers/usersController")
// const { upload } = require("../utils/uploadFile")

const usersRouter = require("express").Router()

usersRouter.get("/", getUsers)

usersRouter.get("/role", getUserRole)

usersRouter.get("/:id", getOneUser)

// usersRouter.post("/", upload.single('avatar'), createUser)

// usersRouter.patch("/:id", updateUser)

// usersRouter.delete("/:id", deleteUser)

// usersRouter.post("/:id", getOneUser)

module.exports = usersRouter