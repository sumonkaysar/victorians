const { saveWebMessage, getWebMessage, getOneWebMessage, UpdateWebMessage, deleteWebMessage, setUserSee } = require("../controllers/textGoingMessageController")


const webMessageRouter = require("express").Router()

webMessageRouter.post("/", saveWebMessage);
webMessageRouter.get("/", getWebMessage);
webMessageRouter.get("/:id", getOneWebMessage);
webMessageRouter.patch("/:id", UpdateWebMessage);
webMessageRouter.delete("/:id", deleteWebMessage);
webMessageRouter.patch("/userSee/:id", setUserSee);

module.exports = webMessageRouter