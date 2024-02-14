const { saveMessage, getMessage, getLatestUsers, readUnreadMessage, sortingUserWithMessage, messageSeenUnseenUser, messageSeenUnseenAdmin, typingEventUpdate, typingEventUpdateAdmin } = require("../controllers/message_controller");
const { upload } = require("../utils/uploadFile");

const messageRouter = require("express").Router();

messageRouter.get("/users", getLatestUsers);
messageRouter.post("/", upload.single('messageFiles'), saveMessage);
messageRouter.get("/:id", getMessage);
messageRouter.get("/users/readUnreadMessage", readUnreadMessage);
messageRouter.get("/usersSort/users", sortingUserWithMessage);
messageRouter.get("/messageSeenUnseen/:userId", messageSeenUnseenUser);
messageRouter.get("/messageSeenUnseen_admin/:userId", messageSeenUnseenAdmin);
messageRouter.patch("/messageTyping/:userId", typingEventUpdate);
messageRouter.patch("/typingEventUpdateAdmin/:userId", typingEventUpdateAdmin);




module.exports = messageRouter;