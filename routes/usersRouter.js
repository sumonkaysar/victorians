const { getUsers, getUserRole, updateUser } = require("../controllers/usersController")
// const { upload } = require("../utils/uploadFile")

const usersRouter = require("express").Router()

usersRouter.get("/role", getUserRole)

usersRouter.get("/", getUsers)

// usersRouter.post("/", upload.single('avatar'), createUser)

usersRouter.patch("/:id", updateUser)

// usersRouter.delete("/:id", deleteUser)

// usersRouter.post("/:id", getOneUser)

module.exports = usersRouter