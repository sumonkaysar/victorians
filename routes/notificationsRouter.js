const { getAllNotifications, saveNotification, getUserNotifications, makeNotificationSeen } = require("../controllers/notificationsController")

const notificationRouter = require("express").Router()

notificationRouter.get("/", getAllNotifications)

notificationRouter.get("/user/:userId", getUserNotifications)

notificationRouter.post("/seen/make", makeNotificationSeen)

// notificationRouter.patch("/:id", updateNotification)

// notificationRouter.delete("/:id", deleteNotification)

// notificationRouter.get("/:id", getOneNotification)

module.exports = notificationRouter