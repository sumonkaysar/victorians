const { saveMessage, getMessage, getLatestUsers } = require("../controllers/message_controller");
const { upload } = require("../utils/uploadFile");

const messageRouter = require("express").Router();

messageRouter.get("/users", getLatestUsers);
messageRouter.post("/", upload.single('messageFiles'), saveMessage);
messageRouter.get("/:id", getMessage);

module.exports = messageRouter;