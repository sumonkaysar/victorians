const { purchasesCollection, notificationsCollection } = require("../mongoDBConfig/collections")
const { readDoc } = require("../utils/mongoQueries")

const getAllPurchases = async (req, res) => {
    const purchases = await readDoc(purchasesCollection)
    const monthlyPurchases = {};
    purchases.forEach(item => {
        const purchaseDate = new Date(item.purchasingTime);
        const yearMonth = `${purchaseDate.getFullYear()}-${purchaseDate.getMonth() + 1}-${purchaseDate.getDate()}`;
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