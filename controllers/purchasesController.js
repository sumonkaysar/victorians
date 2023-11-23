const { purchasesCollection, notificationsCollection } = require("../mongoDBConfig/collections")
const { readDoc } = require("../utils/mongoQueries")

const getAllPurchases = async (req, res) => {
    const purchases = await readDoc(purchasesCollection)
    res.send(purchases)
}

const saveNotification = async (req, res) => {
    const purchases = await readDoc(notificationsCollection)
    res.send(purchases)
}

module.exports = {
    getAllPurchases,
}