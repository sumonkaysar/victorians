const { ObjectId } = require("mongodb")
const { notificationsCollection, premiumCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await readDoc(notificationsCollection)
        res.send(notifications)
    } catch (err) {
        console.log(err)
    }
}

const saveNotification = async (req, res) => {
    try {
        const result = await createDoc(req, notificationsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const updateNotification = async (req, res) => {
    try {
        const result = await updateDoc(req, notificationsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteNotification = async (req, res) => {
    try {
        const result = await deleteDoc(req, notificationsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getOneNotification = async (req, res) => {
    try {
        const result = await readOneDoc(req, notificationsCollection)
        res.send(result || {})
    } catch (err) {
        console.log(err)
    }
}

const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params
        const notifications = await notificationsCollection().find({ userId }).sort({ time: -1 }).toArray()
        res.send(notifications)
    } catch (err) {
        console.log(err)
    }
}

const makeNotificationSeen = async (req, res) => {
    try {
        const notificationIds = req.body.map(id => new ObjectId(id))
        const result = await notificationsCollection().updateMany({
            _id: { $in: notificationIds }
        }, {
            $set: { seen: true }
        })
        res.send({ status: 200, result })
    } catch (err) {
        console.log(err)
    }
}

const makeAdminNotificationSeen = async (req, res) => {
    try {
        const { userId } = req.query
        const result = await premiumCollection().updateOne({ userId }, {
            $set: { "products.$[].adminSeen": true }
        })
        res.send({ status: 200, result })
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getAllNotifications,
    saveNotification,
    updateNotification,
    deleteNotification,
    getOneNotification,
    getUserNotifications,
    makeNotificationSeen,
    makeAdminNotificationSeen,
}