const { purchasesCollection, notificationsCollection } = require("../mongoDBConfig/collections")
const { readDoc } = require("../utils/mongoQueries")

const getAllPurchases = async (req, res) => {
    const purchases = await purchasesCollection().find({}).sort({purchasingTime: -1}).toArray()
    const monthlyPurchases = {};
    purchases.forEach(item => {
        const purchaseDate = new Date(item.purchasingTime);
        const yearMonth = `${purchaseDate.getFullYear()}-${purchaseDate.getMonth() + 1}`;
        if (!monthlyPurchases[yearMonth]) {
            monthlyPurchases[yearMonth] = [];
        }
        monthlyPurchases[yearMonth].push(item);
    });
    res.send(monthlyPurchases)
}

const saveNotification = async (req, res) => {
    const purchases = await readDoc(notificationsCollection)
    res.send(purchases)
}

module.exports = {
    getAllPurchases,
}