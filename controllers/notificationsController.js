const { ObjectId } = require("mongodb")
const { notificationsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")

const getAllNotifications = async (req, res) => {
    const notifications = await readDoc(notificationsCollection)
    res.send(notifications)
}

const saveNotification = async (req, res) => {
    const result = await createDoc(req, notificationsCollection)
    res.send(result)
}

const updateNotification = async (req, res) => {
    const result = await updateDoc(req, notificationsCollection)
    res.send(result)
}

const deleteNotification = async (req, res) => {
    const result = await deleteDoc(req, notificationsCollection)
    res.send(result)
}

const getOneNotification = async (req, res) => {
    const result = await readOneDoc(req, notificationsCollection)
    res.send(result || {})
}

const getUserNotifications = async (req, res) => {
    const { userId } = req.params
    const notifications = await notificationsCollection().find({ userId }).sort({time: -1}).toArray()
    res.send(notifications)
}

const makeNotificationSeen = async (req, res) => {
    const notificationIds = req.body.map(id => new ObjectId(id))
    const result = await notificationsCollection().updateMany({
        _id: { $in: notificationIds }
    }, {
        $set: { seen: true }
    })
    res.send({ status: 200, result })
}


module.exports = {
    getAllNotifications,
    saveNotification,
    updateNotification,
    deleteNotification,
    getOneNotification,
    getUserNotifications,
    makeNotificationSeen,
}