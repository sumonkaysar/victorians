const { purchasesCollection, usersCollection } = require("../mongoDBConfig/collections")

const getPurchases = async (res, purchases) => {
    try {
        const yearlyPurchases = {};
        purchases.forEach(item => {
            const purchaseDate = new Date(item.purchasingTime);
            const year = purchaseDate.getFullYear();
            if (!yearlyPurchases[year]) {
                yearlyPurchases[year] = {};
            }
            const month = purchaseDate.getMonth() + 1;
            if (!yearlyPurchases[year][month]) {
                yearlyPurchases[year][month] = [];
            }
            yearlyPurchases[year][month].push(item);
        });
        for (const year in yearlyPurchases) {
            for (let month = 1; month <= 12; month++) {
                if (!yearlyPurchases[year][month]) {
                    yearlyPurchases[year][month] = [];
                }
            }
        }
        res.send(yearlyPurchases)
    } catch (err) {
        console.log(err)
    }
}

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await purchasesCollection().aggregate([
            {
                $project: {
                    purchasingTime: 1,
                    products: 1,
                    userId: 1,
                    paymentData: {
                        amount: 1,
                        pay_time: 1,
                        card_type: 1,
                    },
                    purchasingTime: 1,
                    bundleId: 1,
                }
            }
        ]).toArray()

        getPurchases(res, purchases)
    } catch (err) {
        console.log(err)
    }
}

const getAllPurchasesByYear = async (req, res) => {
    try {
        const purchases = await purchasesCollection().aggregate([
            { $project: { amount: "$paymentData.amount", purchasingTime: 1 } }
        ]).toArray()

        getPurchases(res, purchases);
    } catch (err) {
        console.log(err)
    }
}

const getPurchasesByEmail = async (req, res) => {
    try {
        const { email } = req.query
        if (email) {
            const user = await usersCollection().findOne({ email: { '$regex': email, '$options': 'i' } })
            // {
            //     $or: [
            //         { firstName: { '$regex': name, '$options': 'i' } },
            //         { lastName: { '$regex': name, '$options': 'i' } },
            //         { email: { '$regex': name, '$options': 'i' } },
            //     ]
            // }
            if (!user?._id) {
                return res.send([])
            }
            const purchases = await purchasesCollection().aggregate([
                { $match: { userId: user._id + "" } },
                {
                    $project: {
                        purchasingTime: 1,
                        products: 1,
                        userId: 1,
                        paymentData: {
                            amount: 1,
                            pay_time: 1,
                            card_type: 1,
                        },
                        purchasingTime: 1,
                        bundleId: 1,
                    }
                },
                { $sort: { purchasingTime: -1 } }
            ]).toArray()
            res.send(purchases)
        }
    } catch (err) {
        console.log(err)
    }
}

const getPremiumUsers = async (req, res) => {
    try {
        const purchases = await purchasesCollection().aggregate([
            { "$addFields": { "id": { "$toObjectId": "$userId" } } },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "id",
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            {
                $project: {
                    user: {
                        firstName: 1,
                        lastName: 1,
                        location: 1,
                        email: 1,
                        avatar: 1,

                    },
                    purchasingTime: 1,
                    products: 1,
                    userId: 1,
                    paymentData: {
                        amount: 1,
                        card_type: 1,
                    },
                    purchasingTime: 1,
                    bundleId: 1,
                }
            },
            {
                $sort: { "purchasingTime": -1 }
            },
            {
                $unwind: "$user"
            }
        ]).toArray()
        const dailyPurchases = {};
        purchases.forEach(item => {
            const purchaseDate = new Date(item.purchasingTime);
            const time = `${purchaseDate.getFullYear()}-${purchaseDate.getMonth() + 1}-${purchaseDate.getDate()}`;
            if (!dailyPurchases[time]) {
                dailyPurchases[time] = [];
            }
            dailyPurchases[time].push(item);
        });
        res.send(dailyPurchases)
    } catch (err) {
        console.log(err)
    }
}

const getPremiumUsersByEmail = async (req, res) => {
    try {
        const { email } = req.query
        if (email) {
            const user = await usersCollection().findOne({ email: { '$regex': email, '$options': 'i' } })
            if (!user?._id) {
                return res.send([])
            }
            const purchases = await purchasesCollection().aggregate([
                { $match: { userId: user._id + "" } },
                {
                    $project: {
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            location: user.location,
                            email: user.email,
                            avatar: user.avatar,
                        },
                        purchasingTime: 1,
                        products: 1,
                        userId: 1,
                        paymentData: {
                            amount: 1,
                            card_type: 1,
                        },
                        purchasingTime: 1,
                        bundleId: 1,
                    }
                },
                { $sort: { purchasingTime: -1 } }
            ]).toArray()
            res.send(purchases)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllPurchases,
    getAllPurchasesByYear,
    getPurchasesByEmail,
    getPremiumUsers,
    getPremiumUsersByEmail,
}