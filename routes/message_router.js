const { saveMessage, getMessage, getLatestUsers, readUnreadMessage, sortingUserWithMessage } = require("../controllers/message_controller");
const { upload } = require("../utils/uploadFile");

const messageRouter = require("express").Router();

messageRouter.get("/users", getLatestUsers);
messageRouter.post("/", upload.single('messageFiles'), saveMessage);
messageRouter.get("/:id", getMessage);
messageRouter.patch("/:userId", readUnreadMessage)
messageRouter.get("/usersSort/users", sortingUserWithMessage)


module.exports = messageRouter;